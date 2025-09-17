"use client";

import React from "react";
import StatusCard from "@/components/shared/statusCard";
import { motion } from "framer-motion";
import type { AnyProject } from "@/types/project";
import { getProjectsAction } from "@/app/admin/actions"; // tek json'dan çeker

export default function Home() {
  const [projects, setProjects] = React.useState<AnyProject[]>([]);
  const [loading, startTransition] = React.useTransition();

  // İlk yüklemede TUM projeleri çek (tek JSON kaynağından)
  React.useEffect(() => {
    startTransition(async () => {
      const list = await getProjectsAction(); // kategori vermeyince hepsi gelir
      // İstersen son güncellemeye göre sıralayalım (GG/AA/YYYY veya relative string olabilir)
      const parsed = [...list].sort((a, b) => {
        // basit bir "GG/AA/YYYY" parse denemesi; parse edilemeyenleri sona atar
        const parseTR = (s: string) => {
          const m = s.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
          if (!m) return 0;
          const [_, dd, mm, yyyy] = m;
          return new Date(+yyyy, +mm - 1, +dd).getTime();
        };
        return (parseTR(b.lastUpdated) || 0) - (parseTR(a.lastUpdated) || 0);
      });
      setProjects(parsed);
    });
  }, []);

  // Animasyon variantları
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
        <h1 className="text-4xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
          Project Status Dashboard
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl">
          Real-time monitoring of my development projects and their current
          status. Stay updated with the latest progress on all ongoing work.
        </p>
      </motion.div>

      {/* Loading state */}
      {loading && projects.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-48 rounded-2xl border border-neutral-200 bg-white/60 dark:border-neutral-800 dark:bg-neutral-900/50 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, index) => (
            <motion.div
              key={`${project.id}-${index}`}
              variants={cardVariants}
              custom={index}
            >
              <StatusCard
                title={project.title}
                description={project.description}
                status={project.status}
                clientName={project.clientName}
                projectType={project.projectType}
                stack={project.stack}
                lastUpdated={project.lastUpdated}
                {...(project.status === "active" && {
                  liveUrl: (project as any).liveUrl,
                })}
                {...(project.status === "pending" && {
                  progress: (project as any).progress,
                })}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
