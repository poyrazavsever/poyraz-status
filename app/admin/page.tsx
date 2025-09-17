"use client";

import React from "react";
import { AnyProject, Category } from "@/types/project";
import {
  getProjectsAction,
  addProjectAction,
  updateProjectAction,
} from "./actions";

/* ---------- Yardımcılar ---------- */
const todayTR = () => {
  const d = new Date();
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
};

const normalizeByCategory = (cat: Category, draft: any) => {
  const next = { ...draft, status: cat };
  if (cat !== "active") delete next.liveUrl;
  if (cat !== "pending") next.progress = 0;
  return next;
};

/* ---------- UI Sınıfları (dark okunuşu güçlendirildi) ---------- */
const inputBase =
  "w-full rounded-xl border px-3 py-2 text-sm shadow-sm outline-none transition " +
  "focus:ring-4 focus:border-neutral-400 focus:ring-neutral-200/60 " +
  "dark:focus:ring-neutral-800/30";

const inputClass =
  inputBase +
  " border-neutral-200 bg-white/70 text-neutral-900 placeholder:text-neutral-400 " +
  "dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-neutral-100 dark:placeholder:text-neutral-500";

const selectClass = inputClass + " pr-8";
const textareaClass = inputClass + " min-h-28";

const btnPrimary =
  "inline-flex items-center justify-center rounded-xl bg-neutral-600 px-4 py-2 " +
  "text-sm font-medium text-white shadow-sm transition hover:bg-neutral-500 " +
  "focus:outline-none focus:ring-4 focus:ring-neutral-300/50 " +
  "disabled:opacity-60 disabled:cursor-not-allowed";

const btnGhost =
  "inline-flex items-center justify-center rounded-xl border bg-white/50 px-3 py-2 " +
  "text-sm font-medium text-neutral-700 shadow-sm transition hover:bg-white " +
  "border-neutral-200 dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-neutral-100 " +
  "hover:dark:bg-neutral-900";

const cardClass =
  "rounded-2xl border p-5 shadow-sm backdrop-blur-sm " +
  "border-neutral-200 bg-white/60 dark:border-neutral-800 dark:bg-neutral-900/50";

/* ---------- Kategoriler ---------- */
const categories: { key: Category; label: string }[] = [
  { key: "active", label: "Aktif Projeler" },
  { key: "inactive", label: "Pasif Projeler" },
  { key: "pending", label: "Bekleyen Projeler" },
];

/* ---------- Proje Tipleri (kategorize) ---------- */
const PROJECT_TYPE_GROUPS: Record<
  string,
  { label: string; options: string[] }
> = {
  website: {
    label: "Website",
    options: [
      "Personal Website",
      "Blog Website",
      "Company Website",
      "Landing Page",
    ],
  },
  webapp: {
    label: "Web App",
    options: ["Web Application", "Full Stack Web App", "Dashboard"],
  },
  library: {
    label: "Library / Tool",
    options: ["UI Library", "Design System", "CLI Tool"],
  },
  enterprise: {
    label: "Enterprise / Platform",
    options: ["Enterprise Application", "SaaS Platform"],
  },
  ecommerce: {
    label: "E-commerce",
    options: ["E-commerce", "Marketplace"],
  },
};

/* ---------- Boş form ---------- */
const emptyProject: AnyProject = {
  id: "",
  title: "",
  description: "",
  status: "active",
  lastUpdated: todayTR(),
  clientName: "",
  projectType: "Personal Website",
  stack: [],
  // kategoriye göre opsiyoneller:
  ...({ liveUrl: "" } as any),
  ...({ progress: 0 } as any),
};


/* ---------- Sayfa ---------- */
export default function Admin() {
  const [category, setCategory] = React.useState<Category>("active");
  const [projects, setProjects] = React.useState<AnyProject[]>([]);
  const [selectedId, setSelectedId] = React.useState("");
  const [form, setForm] = React.useState<AnyProject>(emptyProject);
  const [isNew, setIsNew] = React.useState(false);
  const [loading, startTransition] = React.useTransition();

  /* Kategori değişince listeyi getir ve formu tazele (lastUpdated otomatik) */
  React.useEffect(() => {
    startTransition(async () => {
      const list = await getProjectsAction(category);
      setProjects(list);
      setSelectedId("");
      setForm(
        normalizeByCategory(category, {
          ...emptyProject,
          lastUpdated: todayTR(),
        }) as AnyProject
      );
      setIsNew(false);
    });
  }, [category]);

  /* Seçim değişince formu doldur */
  React.useEffect(() => {
    if (!selectedId) return;
    const proj = projects.find((p) => p.id === selectedId);
    if (proj) {
      setForm({ ...normalizeByCategory(category, proj) });
      setIsNew(false);
    }
  }, [selectedId, projects, category]);

  /* Form alanları */
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target as any;
    let v: any = value;
    if (type === "number") v = Number(value);
    setForm((prev: any) => ({ ...prev, [name]: v }));
  };

  const handleStackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev: any) => ({
      ...prev,
      stack: e.target.value
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    }));
  };

  /* Kaydet */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // her kayıtta lastUpdated = bugün
    const payload = normalizeByCategory(category, {
      ...form,
      lastUpdated: todayTR(),
    }) as AnyProject;

    startTransition(async () => {
      if (isNew) {
        const created = await addProjectAction({
          ...payload,
          id: payload.id || "",
        } as AnyProject);
        setProjects((prev) => [...prev, created]);
        setForm(
          normalizeByCategory(category, {
            ...emptyProject,
            lastUpdated: todayTR(),
          }) as AnyProject
        );
        setSelectedId("");
        setIsNew(false);
      } else {
        const updated = await updateProjectAction(payload);
        setProjects((prev) =>
          prev.map((p) => (p.id === updated.id ? updated : p))
        );
      }
    });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Üst bar */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Admin Paneli</h1>
        <div className="flex items-center gap-3">
          {loading && (
            <span className="rounded-full bg-neutral-600/10 px-2 py-1 text-xs text-neutral-700 dark:text-neutral-300">
              Yükleniyor…
            </span>
          )}
        </div>
      </div>

      {/* Üst kontrol kartı */}
      <div className={"mb-6 " + cardClass}>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Kategori</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className={selectClass}
            >
              {categories.map((cat) => (
                <option key={cat.key} value={cat.key}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-sm font-medium">Proje Seç</label>
            <div className="flex gap-2">
              <select
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                className={selectClass + " flex-1"}
              >
                <option value="">Yeni Ekle</option>
                {projects.map((proj) => (
                  <option key={proj.id} value={proj.id}>
                    {proj.title}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className={btnGhost}
                onClick={() => {
                  setForm(
                    normalizeByCategory(category, {
                      ...emptyProject,
                      lastUpdated: todayTR(),
                    }) as AnyProject
                  );
                  setIsNew(true);
                  setSelectedId("");
                }}
              >
                Yeni Proje
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Form & Liste */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Form kartı */}
        <form
          onSubmit={handleSubmit}
          className={cardClass + " flex flex-col gap-4"}
        >
          <h2 className="text-lg font-semibold">Proje Bilgileri</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium">Başlık</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Başlık"
                className={inputClass}
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium">Açıklama</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Açıklama"
                className={textareaClass}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Müşteri Adı
              </label>
              <input
                name="clientName"
                value={form.clientName}
                onChange={handleChange}
                placeholder="Müşteri Adı"
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Proje Tipi
              </label>
              <select
                name="projectType"
                value={form.projectType}
                onChange={handleChange}
                className={selectClass}
              >
                {Object.values(PROJECT_TYPE_GROUPS).map((grp) => (
                  <optgroup key={grp.label} label={grp.label}>
                    {grp.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium">
                Teknolojiler (virgülle)
              </label>
              <input
                name="stack"
                value={form.stack?.join(",") ?? ""}
                onChange={handleStackChange}
                placeholder="Next.js, TypeScript, Tailwind CSS..."
                className={inputClass}
              />
            </div>

            {category === "active" && (
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium">
                  Canlı URL
                </label>
                <input
                  name="liveUrl"
                  value={(form as any).liveUrl ?? ""}
                  onChange={handleChange}
                  placeholder="https://..."
                  className={inputClass}
                />
              </div>
            )}

            {category === "pending" && (
              <div>
                <label className="mb-1 block text-sm font-medium">
                  İlerleme (%)
                </label>
                <input
                  name="progress"
                  type="number"
                  value={(form as any).progress ?? 0}
                  onChange={handleChange}
                  placeholder="0-100"
                  className={inputClass}
                  min={0}
                  max={100}
                />
              </div>
            )}

            <div>
              <label className="mb-1 block text-sm font-medium">
                Son Güncelleme
              </label>
              <input
                name="lastUpdated"
                value={form.lastUpdated}
                onChange={handleChange}
                placeholder="GG/AA/YYYY"
                className={inputClass}
                readOnly
              />
            </div>
          </div>

          <div className="mt-2 flex items-center justify-end gap-3">
            <button type="submit" className={btnPrimary} disabled={loading}>
              {isNew ? "Ekle" : "Güncelle"}
            </button>
          </div>
        </form>

        {/* Liste kartı */}
        <div className={cardClass}>
          <h2 className="mb-4 text-lg font-semibold">Projeler</h2>
          <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {projects.map((proj) => (
              <li key={proj.id} className="py-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">
                      {proj.title}
                    </p>
                    <p className="mt-1 line-clamp-2 text-sm text-neutral-700 dark:text-neutral-300">
                      {proj.description}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                      <span className="rounded-md bg-neutral-100 px-2 py-0.5 dark:bg-neutral-800/60">
                        {proj.projectType}
                      </span>
                      <span className="rounded-md bg-neutral-100 px-2 py-0.5 dark:bg-neutral-800/60">
                        {proj.status}
                      </span>
                      {proj.status === "pending" &&
                        typeof (proj as any).progress === "number" && (
                          <span className="rounded-md bg-neutral-600/10 px-2 py-0.5 text-neutral-700 dark:text-neutral-300">
                            %{(proj as any).progress}
                          </span>
                        )}
                    </div>
                    <div className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                      Son güncelleme: {proj.lastUpdated}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedId(proj.id);
                      setIsNew(false);
                    }}
                    className={btnGhost}
                  >
                    Düzenle
                  </button>
                </div>
              </li>
            ))}
            {projects.length === 0 && (
              <li className="py-6 text-sm text-neutral-500 dark:text-neutral-400">
                Bu kategoride proje yok.
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
