"use server";

import { promises as fs } from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import { AnyProject, Category } from "@/types/project";

const DATA_PATH = path.join(process.cwd(), "data", "projects.json");

async function readAll(): Promise<AnyProject[]> {
  const raw = await fs.readFile(DATA_PATH, "utf-8");
  return JSON.parse(raw);
}

async function writeAll(list: AnyProject[]) {
  await fs.writeFile(DATA_PATH, JSON.stringify(list, null, 2), "utf-8");
}

/** Kategoriye göre liste getir */
export async function getProjectsAction(cat?: Category) {
  const list = await readAll();
  return cat ? list.filter((p) => p.status === cat) : list;
}

/** Ekle */
export async function addProjectAction(payload: AnyProject) {
  const list = await readAll();
  const withId = { ...payload, id: payload.id || Date.now().toString() };
  list.push(withId);
  await writeAll(list);
  revalidatePath("/admin");
  return withId;
}

/** Güncelle */
export async function updateProjectAction(payload: AnyProject) {
  const list = await readAll();
  const idx = list.findIndex((p) => p.id === payload.id);
  if (idx === -1) throw new Error("Proje bulunamadı");
  list[idx] = payload;
  await writeAll(list);
  revalidatePath("/admin");
  return payload;
}

/** (Opsiyonel) Sil */
export async function deleteProjectAction(id: string) {
  const list = await readAll();
  const next = list.filter((p) => p.id !== id);
  await writeAll(next);
  revalidatePath("/admin");
}
