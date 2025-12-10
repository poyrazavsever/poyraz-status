"use client";

import { Icon } from "@iconify/react";

interface StatusCardProps {
  title: string;
  description: string;
  status: "active" | "pending" | "inactive";
  lastUpdated?: string;
  clientName?: string;
  projectType?: string; 
  stack?: string[];
  progress?: number;
  liveUrl?: string;
}

const StatusCard: React.FC<StatusCardProps> = ({
  title,
  description,
  status,
  lastUpdated,
  clientName,
  projectType,
  stack,
  progress,
  liveUrl,
}) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "active":
        return {
          icon: "solar:play-circle-bold-duotone",
          iconColor: "text-(--color-accent)",
          statusText: "Live & Active",
          statusBadge: "bg-(--color-accent-soft) text-(--color-accent)",
          pulseColor: "bg-(--color-accent)",
        };
      case "pending":
        return {
          icon: "solar:code-square-bold-duotone",
          iconColor: "text-yellow-500",
          statusText: "In Development",
          statusBadge: "bg-yellow-500/10 text-yellow-500",
          pulseColor: "bg-yellow-500",
        };
      case "inactive":
        return {
          icon: "solar:power-bold-duotone",
          iconColor: "text-(--color-muted)",
          statusText: "Offline",
          statusBadge: "bg-(--color-overlay) text-(--color-muted)",
          pulseColor: "bg-(--color-muted)",
        };
      default:
        return {
          icon: "solar:question-circle-bold-duotone",
          iconColor: "text-(--color-muted)",
          statusText: "Unknown",
          statusBadge: "bg-(--color-overlay) text-(--color-muted)",
          pulseColor: "bg-(--color-muted)",
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <div className="group relative rounded-[28px] border border-(--color-border) bg-(--color-surface)/80 backdrop-blur-xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition-all duration-300 h-full flex flex-col">
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-(--color-accent)/0 to-(--color-accent)/0 group-hover:from-(--color-accent)/5 group-hover:to-(--color-accent)/0 transition-all duration-500 pointer-events-none" />

      {/* Header */}
      <div className="relative flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div
            className={`p-3 rounded-2xl bg-(--color-background)/50 border border-(--color-border) flex-shrink-0`}
          >
            <Icon
              icon={config.icon}
              className={`w-6 h-6 ${config.iconColor}`}
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-(--color-text) text-lg leading-tight truncate">
              {title}
            </h3>
            {clientName && (
              <p className="text-sm text-(--color-muted) truncate mt-0.5">
                {clientName}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0 ml-3">
          <div
            className={`px-3 py-1.5 rounded-full text-xs font-medium ${config.statusBadge}`}
          >
            {config.statusText}
          </div>

          {status === "active" && liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-(--color-accent-soft) text-(--color-accent) rounded-full text-xs font-medium hover:bg-(--color-accent)/20 hover:scale-105 active:scale-95 transition-all duration-200"
              title="View Live Site"
            >
              <Icon icon="solar:link-bold" className="w-3.5 h-3.5" />
              <span>Live</span>
            </a>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="relative text-sm text-(--color-muted) leading-relaxed mb-4 line-clamp-2 flex-grow">
        {description}
      </p>

      {/* Progress Bar (only for pending status) */}
      {status === "pending" && progress !== undefined && (
        <div className="relative mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-(--color-muted) font-medium">
              Development Progress
            </span>
            <span className="text-xs font-semibold text-(--color-text)">
              {progress}%
            </span>
          </div>
          <div className="relative w-full bg-(--color-overlay) rounded-full h-2 overflow-hidden">
            <div
              style={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full transition-all duration-1000 ease-out"
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="relative mt-auto pt-4 border-t border-(--color-border) space-y-3">
        {/* Project Type */}
        {projectType && (
          <div className="flex items-center gap-2">
            <Icon
              icon="solar:code-square-linear"
              className="w-4 h-4 text-(--color-muted) flex-shrink-0"
            />
            <span className="text-xs text-(--color-muted) font-medium">
              {projectType}
            </span>
          </div>
        )}

        {/* Tech Stack */}
        {stack && stack.length > 0 && (
          <div className="flex items-center gap-2">
            <Icon
              icon="solar:layers-minimalistic-linear"
              className="w-4 h-4 text-(--color-muted) flex-shrink-0"
            />
            <div className="flex items-center gap-2 flex-wrap flex-1 min-w-0">
              {stack.slice(0, 3).map((tech, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 rounded-lg bg-(--color-overlay) text-(--color-text) font-medium"
                >
                  {tech}
                </span>
              ))}
              {stack.length > 3 && (
                <div className="relative group">
                  <span className="text-xs px-2 py-1 rounded-lg bg-(--color-overlay) text-(--color-muted) font-medium cursor-help">
                    +{stack.length - 3}
                  </span>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-(--color-surface) border border-(--color-border) text-(--color-text) text-xs rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 shadow-lg">
                    {stack.slice(3).join(", ")}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Last Updated & Status Indicator */}
        <div className="flex items-center justify-between">
          {lastUpdated && (
            <div className="flex items-center gap-2">
              <Icon
                icon="solar:calendar-linear"
                className="w-4 h-4 text-(--color-muted) flex-shrink-0"
              />
              <span className="text-xs text-(--color-muted)">
                {lastUpdated}
              </span>
            </div>
          )}

          {/* Status Indicator Dot */}
          <div className="flex items-center gap-2 ml-auto">
            <div
              className={`w-2 h-2 rounded-full ${config.pulseColor} ${
                status === "active" ? "animate-pulse" : ""
              }`}
            />
            <span className="text-xs text-(--color-muted)">
              {status === "active"
                ? "Online"
                : status === "pending"
                ? "Building"
                : "Offline"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
