"use client";

import { motion } from "framer-motion";
import StatusCard from "@/components/shared/statusCard";
import rawProjects from "@/data/projects.json";
import type { AnyProject, InactiveProject } from "@/types/project";

// --- Type guard ---
function isInactiveProject(p: AnyProject): p is InactiveProject {
  return p.status === "inactive";
}

// --- lastUpdated normalizer ---
// Desteklenen formatlar: "DD/MM/YYYY", "X day(s)/week(s)/month(s)/hour(s) ago"
function getLastUpdatedDate(text: string): Date {
  const now = new Date();

  // 1) Relative: "3 hours ago", "2 days ago", "1 week ago", "5 months ago"
  const rel = text.trim().toLowerCase().match(/^(\d+)\s+(hour|day|week|month)s?\s+ago$/);
  if (rel) {
    const amount = parseInt(rel[1], 10);
    const unit = rel[2];
    const d = new Date(now);
    switch (unit) {
      case "hour":
        d.setHours(d.getHours() - amount);
        return d;
      case "day":
        d.setDate(d.getDate() - amount);
        return d;
      case "week":
        d.setDate(d.getDate() - amount * 7);
        return d;
      case "month":
        d.setMonth(d.getMonth() - amount);
        return d;
      default:
        return new Date(0);
    }
  }

  // 2) Absolute: "DD/MM/YYYY"
  const abs = text.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (abs) {
    const [_, d, m, y] = abs;
    const day = parseInt(d, 10);
    const monthIdx = parseInt(m, 10) - 1; // 0-based
    const year = parseInt(y, 10);
    return new Date(year, monthIdx, day);
  }

  // 3) Son çare: Date parsable string ya da çok eski
  const fallback = new Date(text);
  if (!isNaN(fallback.getTime())) return fallback;

  return new Date(0); // bilinmiyorsa en eski
}

export default function InactivePage() {
  const projects = rawProjects as AnyProject[];
  const inactiveProjects = projects.filter(isInactiveProject);

  const sortedProjects = [...inactiveProjects].sort(
    (a, b) => getLastUpdatedDate(b.lastUpdated).getTime() - getLastUpdatedDate(a.lastUpdated).getTime()
  );

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  } as const;

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, type: "spring", stiffness: 100, damping: 15 },
    },
  } as const;

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, type: "spring", stiffness: 100, damping: 15 },
    },
  } as const;

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Header */}
      <motion.div
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className="text-start mb-12"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-2xl bg-(--color-surface) border border-(--color-border)">
            <div className="w-6 h-6 bg-(--color-muted) rounded-full" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-(--color-text)">
            Inactive Projects
          </h1>
        </div>
        <p className="text-(--color-muted) text-lg max-w-2xl leading-relaxed">
          Completed, archived, or temporarily suspended projects. These projects are no longer in active
          development but may be maintained or revived in the future.
        </p>
        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-(--color-muted)">Total Inactive Projects:</span>
            <span className="px-3 py-1 bg-(--color-surface) text-(--color-text) rounded-full text-sm font-medium border border-(--color-border)">
              {inactiveProjects.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-(--color-muted)">Status:</span>
            <span className="px-3 py-1 bg-(--color-surface) text-(--color-text) rounded-full text-sm font-medium border border-(--color-border)">
              Archived
            </span>
          </div>
        </div>
      </motion.div>

      {/* Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {sortedProjects.map((project, index) => (
          <motion.div key={project.id} variants={cardVariants} custom={index}>
            <StatusCard
              title={project.title}
              description={project.description}
              status={project.status}         
              clientName={project.clientName}
              projectType={project.projectType}
              stack={project.stack}
              lastUpdated={project.lastUpdated}
              /* liveUrl yok: InactiveProject tipinde bulunmuyor */
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
