"use client";

import { motion } from "framer-motion";
import StatusCard from "@/components/shared/statusCard";
import rawProjects from "@/data/projects.json";
import type { AnyProject, PendingProject } from "@/types/project";

// --- Type guard ---
function isPendingProject(p: AnyProject): p is PendingProject {
  return p.status === "pending";
}

// --- lastUpdated normalizer (opsiyonel, aynı util'i inactive sayfasında da kullandık) ---
function getLastUpdatedDate(text: string): Date {
  const now = new Date();

  // "3 hours ago" / "2 days ago" / "1 week ago" / "5 months ago"
  const rel = text
    .trim()
    .toLowerCase()
    .match(/^(\d+)\s+(hour|day|week|month)s?\s+ago$/);
  if (rel) {
    const amount = parseInt(rel[1], 10);
    const unit = rel[2] as "hour" | "day" | "week" | "month";
    const d = new Date(now);
    if (unit === "hour") d.setHours(d.getHours() - amount);
    if (unit === "day") d.setDate(d.getDate() - amount);
    if (unit === "week") d.setDate(d.getDate() - amount * 7);
    if (unit === "month") d.setMonth(d.getMonth() - amount);
    return d;
  }

  // "DD/MM/YYYY"
  const abs = text.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (abs) {
    const [, d, m, y] = abs;
    return new Date(parseInt(y, 10), parseInt(m, 10) - 1, parseInt(d, 10));
    // yıl, ay(0-index), gün
  }

  // Parsable string veya bilinmiyorsa en eski
  const fallback = new Date(text);
  return isNaN(fallback.getTime()) ? new Date(0) : fallback;
}

export default function PendingPage() {
  const projects = rawProjects as AnyProject[];
  const pendingProjects = projects.filter(isPendingProject);

  // En güncel > en eski (istersen progress'e göre sıralayabilirsin)
  const sortedProjects = [...pendingProjects].sort(
    (a, b) =>
      getLastUpdatedDate(b.lastUpdated).getTime() -
      getLastUpdatedDate(a.lastUpdated).getTime()
  );

  const averageProgress = Math.round(
    sortedProjects.reduce((sum, p) => sum + p.progress, 0) /
      (sortedProjects.length || 1)
  );

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  } as const;

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  } as const;

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  } as const;

  return (
    <div className="container mx-auto px-4 py-8 mt-24 sm:mt-0">
      {/* Header */}
      <motion.div
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className="text-start mb-12"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/30">
            <div className="w-6 h-6 bg-yellow-500 rounded-full" />
          </div>
          <h1 className="text-4xl font-bold text-neutral-800 dark:text-neutral-200">
            Pending Projects
          </h1>
        </div>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl">
          Projects currently in development. These are actively being worked on
          and will be deployed once completed.
        </p>
        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              Total Pending Projects:
            </span>
            <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-full text-sm font-medium">
              {sortedProjects.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              Average Progress:
            </span>
            <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-full text-sm font-medium">
              {averageProgress}%
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
              status={project.status} // "pending"
              clientName={project.clientName}
              projectType={project.projectType}
              stack={project.stack}
              lastUpdated={project.lastUpdated}
              progress={project.progress} // PendingProject'ta zorunlu
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
