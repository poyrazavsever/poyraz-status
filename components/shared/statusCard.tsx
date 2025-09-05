import React from "react";
import { Icon } from "@iconify/react";

interface StatusCardProps {
  title: string;
  description: string;
  status: "active" | "pending" | "inactive";
  lastUpdated?: string;
  clientName?: string;
  projectType?: string;
  stack?: string[]; // Tech stack array
  progress?: number; // For pending projects (0-100)
  liveUrl?: string; // Live URL for active projects
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
          icon: "hugeicons:live-streaming-02",
          bgColor: "bg-green-50 dark:bg-green-950/20",
          borderColor: "border-green-200 dark:border-green-800",
          iconColor: "text-green-600 dark:text-green-400",
          statusText: "Live & Active",
          statusBg: "bg-green-100 dark:bg-green-900/30",
          statusTextColor: "text-green-700 dark:text-green-300",
        };
      case "pending":
        return {
          icon: "hugeicons:computer-programming-02",
          bgColor: "bg-yellow-50 dark:bg-yellow-950/20",
          borderColor: "border-yellow-200 dark:border-yellow-800",
          iconColor: "text-yellow-600 dark:text-yellow-400",
          statusText: "In Development",
          statusBg: "bg-yellow-100 dark:bg-yellow-900/30",
          statusTextColor: "text-yellow-700 dark:text-yellow-300",
        };
      case "inactive":
        return {
          icon: "hugeicons:cellular-network-offline",
          bgColor: "bg-gray-50 dark:bg-gray-950/20",
          borderColor: "border-gray-200 dark:border-gray-800",
          iconColor: "text-gray-600 dark:text-gray-400",
          statusText: "Offline",
          statusBg: "bg-gray-100 dark:bg-gray-900/30",
          statusTextColor: "text-gray-700 dark:text-gray-300",
        };
      default:
        return {
          icon: "hugeicons:cellular-network-offline",
          bgColor: "bg-gray-50 dark:bg-gray-950/20",
          borderColor: "border-gray-200 dark:border-gray-800",
          iconColor: "text-gray-600 dark:text-gray-400",
          statusText: "Unknown",
          statusBg: "bg-gray-100 dark:bg-gray-900/30",
          statusTextColor: "text-gray-700 dark:text-gray-300",
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <div
      className={`rounded-xl p-6 border ${config.bgColor} ${config.borderColor} backdrop-blur-md shadow-sm hover:shadow-lg transition-all duration-200 h-full flex flex-col`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className={`p-2 rounded-lg ${config.statusBg} flex-shrink-0`}>
            <Icon
              icon={config.icon}
              className={`w-5 h-5 ${config.iconColor}`}
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 text-lg leading-tight truncate">
              {title}
            </h3>
            {clientName && (
              <p className="text-sm text-neutral-500 dark:text-neutral-400 truncate">
                {clientName}
              </p>
            )}
          </div>
        </div>
        <div
          className={`px-3 py-1 rounded-full text-xs font-medium ${config.statusBg} ${config.statusTextColor} flex-shrink-0 ml-2`}
        >
          {config.statusText}
        </div>
        {/* Live URL Button for Active Projects */}
        {status === "active" && liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-xs font-medium hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors duration-200 flex-shrink-0 ml-2"
            title="View Live Site"
          >
            <Icon icon="hugeicons:link-01" className="w-3 h-3" />
            Go Live
          </a>
        )}
      </div>

      {/* Description */}
      <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-4 leading-relaxed flex-1">
        {description}
      </p>

      {/* Progress Bar (only for pending status) */}
      {status === "pending" && progress !== undefined && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              Progress
            </span>
            <span className="text-xs font-medium text-neutral-600 dark:text-neutral-300">
              {progress}%
            </span>
          </div>
          <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
            <div
              className="bg-yellow-500 dark:bg-yellow-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-neutral-200 dark:border-neutral-700 space-y-3">
        {/* Project Type */}
        {projectType && (
          <div className="flex items-center gap-2">
            <Icon
              icon="hugeicons:code"
              className="w-4 h-4 text-neutral-400 flex-shrink-0"
            />
            <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
              {projectType}
            </span>
          </div>
        )}

        {/* Tech Stack */}
        {stack && stack.length > 0 && (
          <div className="flex items-center gap-2">
            <Icon
              icon="hugeicons:layers-01"
              className="w-4 h-4 text-neutral-400 flex-shrink-0"
            />
            <div className="flex items-center gap-1 flex-1 min-w-0">
              <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium truncate">
                {stack.slice(0, 2).join(", ")}
              </span>
              {stack.length > 2 && (
                <div className="relative group">
                  <div className="text-xs text-neutral-400 cursor-help">
                    +{stack.length - 2}
                  </div>
                  {/* Custom Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-neutral-800 dark:bg-neutral-700 text-white text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none z-50">
                    {stack.join(", ")}
                    {/* Arrow */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-neutral-800 dark:border-t-neutral-700"></div>
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
                icon="hugeicons:clock-01"
                className="w-4 h-4 text-neutral-400 flex-shrink-0"
              />
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                {lastUpdated}
              </span>
            </div>
          )}

          {/* Status Indicator Dot */}
          <div className="flex items-center gap-2 ml-auto">
            <div
              className={`w-2 h-2 rounded-full ${
                status === "active"
                  ? "bg-green-500 animate-pulse"
                  : status === "pending"
                  ? "bg-yellow-500"
                  : "bg-gray-400"
              }`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
