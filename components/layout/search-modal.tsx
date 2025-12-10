"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { useTheme } from "@/app/components/theme-provider";
import type { AnyProject } from "@/types/project";

type SocialLink = {
  id: string;
  label: string;
  href: string;
  icon: string;
};

type ResultType = "action" | "project" | "social";

type SearchEntity = {
  id: string;
  title: string;
  description?: string;
  keywords: string;
  type: ResultType;
  href?: string;
  external?: boolean;
  meta?: string;
  onSelect?: () => Promise<void> | void;
};

const SECTION_ICONS: Record<ResultType, string> = {
  action: "solar:bolt-bold-duotone",
  project: "solar:case-minimalistic-bold-duotone",
  social: "solar:hashtag-square-bold-duotone",
};

const SECTION_ORDER: ResultType[] = ["action", "project", "social"];

type SearchModalProps = {
  open: boolean;
  onClose: () => void;
  searchData: {
    projects: AnyProject[];
    socialLinks: SocialLink[];
  };
};

const SearchModal = ({ open, onClose, searchData }: SearchModalProps) => {
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const normalizedQuery = query.trim().toLowerCase();

  const { projects, socialLinks } = searchData;

  useEffect(() => {
    if (!open) {
      setQuery("");
      return;
    }
    inputRef.current?.focus();
  }, [open]);

  const quickActions = useMemo<SearchEntity[]>(() => {
    if (!mounted || !theme) {
      return [];
    }

    return [
      {
        id: "action-theme",
        title: "Cycle Theme",
        description: "Switch to next theme",
        keywords: "theme color dark mode",
        type: "action",
        meta: "Action",
        onSelect: () => theme.cycleTheme(),
      },
      {
        id: "action-email",
        title: "Copy Email",
        description: "poyrazavsever@gmail.com",
        keywords: "email contact copy",
        type: "action",
        meta: "Action",
        onSelect: async () => {
          await navigator.clipboard.writeText("poyrazavsever@gmail.com");
        },
      },
    ];
  }, [mounted, theme]);

  const projectItems = useMemo<SearchEntity[]>(
    () =>
      projects.map((project) => ({
        id: `project-${project.id}`,
        title: project.title,
        description: project.description,
        keywords: [
          project.title,
          project.description,
          project.status,
          (project.stack ?? []).join(" "),
        ].join(" "),
        type: "project",
        href: `/#${project.id}`,
        meta: project.status.toUpperCase(),
      })),
    [projects],
  );

  const socialItems = useMemo<SearchEntity[]>(
    () =>
      socialLinks.map((social) => ({
        id: `social-${social.id}`,
        title: social.label,
        description: "Open in new tab",
        keywords: social.label,
        type: "social",
        href: social.href,
        external: true,
      })),
    [socialLinks]
  );

  const searchableItems = useMemo(
    () => [...quickActions, ...projectItems, ...socialItems],
    [projectItems, quickActions, socialItems]
  );

  const fuse = useMemo(
    () =>
      new Fuse(searchableItems, {
        includeScore: true,
        threshold: 0.35,
        keys: [
          { name: "title", weight: 0.6 },
          { name: "description", weight: 0.25 },
          { name: "keywords", weight: 0.15 },
        ],
      }),
    [searchableItems]
  );

  const searchResults = useMemo(
    () =>
      normalizedQuery
        ? fuse.search(normalizedQuery).map((result) => result.item)
        : [],
    [fuse, normalizedQuery]
  );

  const groupedResults = useMemo<
    Partial<Record<ResultType, SearchEntity[]>>
  >(() => {
    if (!normalizedQuery) {
      return {};
    }

    return searchResults.reduce<Record<ResultType, SearchEntity[]>>(
      (acc, item) => {
        if (!acc[item.type]) {
          acc[item.type] = [];
        }
        acc[item.type].push(item);
        return acc;
      },
      {} as Record<ResultType, SearchEntity[]>
    );
  }, [normalizedQuery, searchResults]);

  const defaultSections = useMemo(() => {
    const sections: Partial<Record<ResultType, SearchEntity[]>> = {
      action: quickActions,
      project: projectItems.slice(0, 6),
      social: socialItems.slice(0, 3),
    };
    return sections;
  }, [projectItems, quickActions, socialItems]);

  const handleNavigate = (href: string, options?: { external?: boolean }) => {
    if (options?.external) {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }
    router.push(href);
  };

  const handleResultSelect = async (item: SearchEntity) => {
    if (item.type === "action" && item.onSelect) {
      await item.onSelect();
      onClose();
      return;
    }

    if (item.href) {
      handleNavigate(item.href, { external: item.external });
      onClose();
    }
  };

  const primaryResult = normalizedQuery
    ? searchResults[0]
    : defaultSections.action?.[0] ?? defaultSections.project?.[0];

  const renderResult = (item: SearchEntity) => (
    <button
      key={item.id}
      type="button"
      onClick={() => handleResultSelect(item)}
      className="w-full rounded-2xl border border-(--color-border) bg-(--color-background)/80 px-5 py-4 text-left transition hover:border-(--color-accent) hover:bg-(--color-surface)"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="text-base font-semibold text-(--color-text)">
            {item.title}
          </p>
          {item.description && (
            <p className="text-sm text-(--color-muted)">{item.description}</p>
          )}
          {item.meta && (
            <p className="text-[11px] uppercase tracking-[0.3em] text-(--color-muted)">
              {item.meta}
            </p>
          )}
        </div>
        <Icon
          icon={SECTION_ICONS[item.type]}
          className="text-xl text-(--color-muted)"
        />
      </div>
    </button>
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="search-overlay"
          className="fixed inset-0 z-40 flex items-start justify-center bg-black/70 px-3 py-8 backdrop-blur sm:items-center sm:px-4 sm:py-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="flex w-full max-w-3xl flex-col items-center gap-6 rounded-[34px] border border-(--color-border) bg-(--color-background) px-4 py-6 text-center shadow-[0_50px_120px_rgba(0,0,0,0.55)] max-h-[90vh] overflow-y-auto sm:max-w-4xl sm:gap-8 sm:px-10 sm:py-12 sm:max-h-[85vh]"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            onClick={(event) => event.stopPropagation()}
          >
            <p className="max-w-2xl text-xs text-(--color-muted) sm:text-sm">
              Search across projects and social links. Press <kbd>⌘K</kbd>/
              <kbd>Ctrl+K</kbd> anywhere to open this palette.
            </p>

            <div className="flex w-full flex-col items-stretch gap-3 rounded-3xl border border-(--color-border) bg-(--color-surface) px-4 py-4 sm:flex-row sm:items-center sm:gap-3 sm:px-6 sm:py-5">
              <Icon
                icon="solar:magnifer-line-duotone"
                className="text-2xl text-(--color-muted) sm:text-2xl"
              />
              <input
                ref={inputRef}
                type="search"
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent text-base text-(--color-text) placeholder:text-(--color-muted) focus:outline-none sm:text-lg"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    if (primaryResult) {
                      void handleResultSelect(primaryResult);
                    }
                  }
                }}
              />
              <span className="hidden rounded-full border border-(--color-border) px-3 py-1 text-xs text-(--color-muted) sm:flex">
                Enter
              </span>
            </div>

            {normalizedQuery ? (
              searchResults.length > 0 ? (
                <div className="w-full space-y-6 text-left">
                  {SECTION_ORDER.map((section) => {
                    const entries = groupedResults[section];
                    if (!entries || entries.length === 0) {
                      return null;
                    }
                    return (
                      <div key={section}>
                        <div className="space-y-2">
                          {entries.map((entry) => renderResult(entry))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="w-full rounded-2xl border border-dashed border-(--color-border) px-5 py-6 text-center text-sm text-(--color-muted)">
                  No results for "{query}". Try another keyword.
                </p>
              )
            ) : (
              <div className="w-full space-y-6 text-left">
                {SECTION_ORDER.map((section) => {
                  const entries = defaultSections[section];
                  if (!entries || entries.length === 0) {
                    return null;
                  }
                  return (
                    <div key={section}>
                      <div className="space-y-2">
                        {entries.map((entry) => renderResult(entry))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
