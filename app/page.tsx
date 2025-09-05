"use client";

import StatusCard from "@/components/shared/statusCard";
import { activeProjects } from "@/data/active";
import { pendingProjects } from "@/data/pending";
import { inactiveProjects } from "@/data/inactive";
import { motion } from "framer-motion";

export default function Home() {
  // Combine all projects
  const allProjects = [
    ...activeProjects,
    ...pendingProjects,
    ...inactiveProjects,
  ];

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

      {/* Status Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {allProjects.map((project, index) => (
          <motion.div
            key={project.title}
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
              // Type-safe props based on status
              {...(project.status === "active" && { liveUrl: project.liveUrl })}
              {...(project.status === "pending" && {
                progress: project.progress,
              })}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
