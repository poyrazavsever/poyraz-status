"use client";

import StatusCard from "@/components/shared/statusCard";
import { pendingProjects } from "@/data/pending";
import { motion } from "framer-motion";

export default function PendingPage() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  } as const;

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
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

  // Calculate average progress
  const averageProgress = Math.round(
    pendingProjects.reduce((sum, project) => sum + project.progress, 0) /
      pendingProjects.length
  );

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
            <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
          </div>
          <h1 className="text-4xl font-bold text-neutral-800 dark:text-neutral-200">
            Pending Projects
          </h1>
        </div>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl">
          Projects currently in development phase. These are actively being
          worked on and will be deployed once completed.
        </p>
        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              Total Pending Projects:
            </span>
            <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-full text-sm font-medium">
              {pendingProjects.length}
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

      {/* Status Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {pendingProjects.map((project, index) => (
          <motion.div key={project.id} variants={cardVariants} custom={index}>
            <StatusCard
              title={project.title}
              description={project.description}
              status={project.status}
              clientName={project.clientName}
              projectType={project.projectType}
              stack={project.stack}
              lastUpdated={project.lastUpdated}
              progress={project.progress}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
