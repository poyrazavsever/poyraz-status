"use client";

import { motion } from "framer-motion";
import StatusCard from "@/components/shared/statusCard";
import rawProjects from "@/data/projects.json";
import type { AnyProject, ActiveProject } from "@/types/project";

// --- Type guards ---
function isActiveProject(p: AnyProject): p is ActiveProject {
  return p.status === "active";
}

export default function ActivePage() {
  // JSON'u tipleyelim
  const projects = rawProjects as AnyProject[];
  const activeProjects = projects.filter(isActiveProject);

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
          <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
            <div className="w-6 h-6 bg-green-500 rounded-full animate-pulse" />
          </div>
          <h1 className="text-4xl font-bold text-neutral-800 dark:text-neutral-200">
            Active Projects
          </h1>
        </div>

        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl">
          Currently live and actively maintained projects. These projects are
          fully operational and serving users in production environments.
        </p>

        <div className="mt-4 flex items-center gap-2">
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            Total Active Projects:
          </span>
          <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
            {activeProjects.length}
          </span>
        </div>
      </motion.div>

      {/* Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {activeProjects.map((project, index) => (
          <motion.div key={project.id} variants={cardVariants} custom={index}>
            <StatusCard
              title={project.title}
              description={project.description}
              status={project.status} // "active"
              clientName={project.clientName}
              projectType={project.projectType}
              stack={project.stack}
              lastUpdated={project.lastUpdated}
              liveUrl={project.liveUrl} // ActiveProject'ta zorunlu
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
