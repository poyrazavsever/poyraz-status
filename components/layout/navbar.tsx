"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import rawProjects from "@/data/projects.json"; // ← tek kaynak
import type { AnyProject } from "@/types/project";

const allNavItems = [
  { href: "/active", icon: "hugeicons:live-streaming-02", label: "Active" },
  {
    href: "/pending",
    icon: "hugeicons:computer-programming-02",
    label: "Pending",
  },
  {
    href: "/inactive",
    icon: "hugeicons:cellular-network-offline",
    label: "Inactive",
  },
];

// Social media links array
const socialLinks = [
  {
    href: "https://www.linkedin.com/in/poyrazavsever/",
    icon: "hugeicons:linkedin-01",
    label: "LinkedIn",
  },
  {
    href: "https://www.github.com/poyrazavsever",
    icon: "hugeicons:github",
    label: "GitHub",
  },
  {
    href: "https://www.instagram.com/poyraz_avsever/",
    icon: "hugeicons:instagram",
    label: "Instagram",
  },
  {
    href: "http://youtube.com/@poyrazavsever",
    icon: "hugeicons:youtube",
    label: "Youtube",
  },
  {
    href: "https://medium.com/@poyrazavsever",
    icon: "hugeicons:medium-square",
    label: "Medium",
  },
  {
    href: "https://www.behance.net/poyrazavsever",
    icon: "hugeicons:behance-02",
    label: "Behance",
  },
  {
    href: "https://www.buymeacoffee.com/poyrazavsever",
    icon: "simple-icons:buymeacoffee",
    label: "Buy Me a Coffee",
  },
];

const Navbar = () => {
  const [activeTheme, setActiveTheme] = useState("system");
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isSocialOpen, setIsSocialOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [globalSearchValue, setGlobalSearchValue] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  // Combine all projects for global search from single JSON
  const allProjects = useMemo(() => rawProjects as AnyProject[], []);

  // Filter projects based on global search (memoized)
  const filteredProjects = useMemo(() => {
    const q = globalSearchValue.trim().toLowerCase();
    if (!q) return [];
    return allProjects.filter(
      (project) =>
        project.title.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.clientName.toLowerCase().includes(q) ||
        project.projectType.toLowerCase().includes(q) ||
        project.stack.some((tech) => tech.toLowerCase().includes(q))
    );
  }, [allProjects, globalSearchValue]);

  const themes = [
    { id: "light", icon: "mdi:weather-sunny", label: "Light" },
    { id: "dark", icon: "mdi:weather-night", label: "Dark" },
    { id: "system", icon: "mdi:monitor", label: "System" },
  ];

  const handleThemeChange = (themeId: string) => {
    setActiveTheme(themeId);
    localStorage.setItem("theme", themeId);
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (themeId === "dark" || (themeId === "system" && prefersDark)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "system";
    setActiveTheme(savedTheme);
    handleThemeChange(savedTheme);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node))
        setIsMenuOpen(false);
      if (themeRef.current && !themeRef.current.contains(event.target as Node))
        setIsThemeOpen(false);
      if (
        socialRef.current &&
        !socialRef.current.contains(event.target as Node)
      )
        setIsSocialOpen(false);
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      )
        setIsSearchOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Responsive dropdown position
  const dropdownPosition =
    typeof window !== "undefined" && window.innerWidth < 640
      ? "left-1/2 -translate-x-1/2 right-auto"
      : "right-0";

  // Filtered nav items for quick nav search (memoized)
  const filteredNavItems = useMemo(() => {
    const q = searchValue.trim().toLowerCase();
    return allNavItems.filter((item) => item.label.toLowerCase().includes(q));
  }, [searchValue]);

  // Get status color for project
  const getStatusColor = (status: AnyProject["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300";
      case "pending":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300";
      case "inactive":
      default:
        return "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300";
    }
  };

  return (
    <>
      {/* Top Right Navigation & Switchers */}
      <div className="fixed top-4 right-4 flex items-center gap-3 sm:gap-4 z-40">
        {/* Logo Button (Home) */}
        <Link
          href="/"
          className="p-2 rounded-lg bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center"
          title="Ana Sayfa"
        >
          <img src="/logo.png" alt="logo" className="w-6 h-6" />
        </Link>

        {/* Navigation Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              setIsThemeOpen(false);
              setIsSocialOpen(false);
              setIsSearchOpen(false);
            }}
            className="p-2 rounded-lg bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer"
          >
            <Icon
              icon="hugeicons:more"
              className="text-neutral-600 dark:text-neutral-300 w-6 h-6"
            />
          </button>
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className={`absolute mt-2 bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700 p-2 min-w-[240px] max-h-[70vh] overflow-y-auto ${dropdownPosition}`}
              >
                {/* Search Bar */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center w-full bg-neutral-100 dark:bg-neutral-700 rounded-lg px-2 py-3">
                    <Icon
                      icon="hugeicons:search-01"
                      className="w-5 h-5 text-neutral-400 dark:text-neutral-300 mr-2"
                    />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      className="bg-transparent outline-none w-full text-sm text-neutral-700 dark:text-neutral-200 placeholder:text-neutral-400 dark:placeholder:text-neutral-400"
                    />
                  </div>
                </div>

                {/* Items */}
                <div className="flex flex-col gap-1">
                  {filteredNavItems.length === 0 ? (
                    <div className="text-center text-xs text-neutral-400 py-2">
                      No results found.
                    </div>
                  ) : (
                    filteredNavItems.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`w-full p-2 rounded-lg flex items-center gap-3 transition-all ${
                            isActive
                              ? "bg-neutral-50 dark:bg-neutral-900/20 text-neutral-600 dark:text-neutral-400"
                              : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-900"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            {item.icon ? (
                              <Icon icon={item.icon} className="w-5 h-5" />
                            ) : null}
                          </span>
                          <span className="text-sm font-medium truncate">
                            {item.label}
                          </span>
                        </Link>
                      );
                    })
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Global Search */}
        <div className="relative" ref={searchRef}>
          <button
            onClick={() => {
              setIsSearchOpen(!isSearchOpen);
              setIsMenuOpen(false);
              setIsThemeOpen(false);
              setIsSocialOpen(false);
            }}
            className="p-2 rounded-lg bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer"
          >
            <Icon
              icon="hugeicons:search-01"
              className="text-neutral-600 dark:text-neutral-300 w-6 h-6"
            />
          </button>
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className={`absolute mt-2 bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700 p-3 w-64 sm:min-w-[320px] sm:max-w-[400px] max-h-[70vh] overflow-y-auto ${dropdownPosition}`}
              >
                {/* Search Input */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center w-full bg-neutral-100 dark:bg-neutral-700 rounded-lg px-3 py-2">
                    <Icon
                      icon="hugeicons:search-01"
                      className="w-4 h-4 text-neutral-400 dark:text-neutral-300 mr-2 flex-shrink-0"
                    />
                    <input
                      type="text"
                      placeholder="Search projects..."
                      value={globalSearchValue}
                      onChange={(e) => setGlobalSearchValue(e.target.value)}
                      className="bg-transparent outline-none w-full text-sm text-neutral-700 dark:text-neutral-200 placeholder:text-neutral-400 dark:placeholder:text-neutral-400"
                      autoFocus
                    />
                  </div>
                </div>

                {/* Search Results */}
                <div className="space-y-2">
                  {globalSearchValue.trim() === "" ? (
                    <div className="text-center text-xs text-neutral-400 py-4">
                      Type to search across all projects...
                    </div>
                  ) : filteredProjects.length === 0 ? (
                    <div className="text-center text-xs text-neutral-400 py-4">
                      No projects found for "{globalSearchValue}"
                    </div>
                  ) : (
                    <>
                      <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-2 px-1">
                        Found {filteredProjects.length} project
                        {filteredProjects.length !== 1 ? "s" : ""}
                      </div>
                      {filteredProjects.slice(0, 8).map((project) => (
                        <Link
                          key={`${project.id}-${project.title}`}
                          href={`/${project.status}`}
                          onClick={() => {
                            setIsSearchOpen(false);
                            setGlobalSearchValue("");
                          }}
                          className="block p-3 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors border border-transparent hover:border-neutral-200 dark:hover:border-neutral-600"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="text-sm font-medium text-neutral-800 dark:text-neutral-200 truncate">
                                  {project.title}
                                </h4>
                                <span
                                  className={`px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${getStatusColor(
                                    project.status
                                  )}`}
                                >
                                  {project.status}
                                </span>
                              </div>
                              <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1 truncate">
                                {project.clientName}
                              </p>
                              <p className="text-xs text-neutral-400 dark:text-neutral-500 line-clamp-2">
                                {project.description.substring(0, 80)}...
                              </p>
                              <div className="flex items-center gap-1 mt-2 flex-wrap">
                                {project.stack.slice(0, 3).map((tech, idx) => (
                                  <span
                                    key={idx}
                                    className="px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 rounded text-xs"
                                  >
                                    {tech}
                                  </span>
                                ))}
                                {project.stack.length > 3 && (
                                  <span className="text-xs text-neutral-400">
                                    +{project.stack.length - 3}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                      {filteredProjects.length > 8 && (
                        <div className="text-center text-xs text-neutral-400 pt-2 border-t border-neutral-200 dark:border-neutral-700">
                          Showing first 8 results. Refine search for more
                          specific results.
                        </div>
                      )}
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Theme Switcher */}
        <div className="relative" ref={themeRef}>
          <button
            onClick={() => {
              setIsThemeOpen(!isThemeOpen);
              setIsMenuOpen(false);
              setIsSocialOpen(false);
              setIsSearchOpen(false);
            }}
            className="p-2 rounded-lg bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer"
          >
            <Icon
              icon="mdi:weather-night"
              className="text-neutral-600 dark:text-neutral-300 w-5 h-5"
            />
          </button>
          <AnimatePresence>
            {isThemeOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 p-2 min-w-[180px]"
              >
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => {
                      handleThemeChange(theme.id);
                      setIsThemeOpen(false);
                    }}
                    className={`w-full p-2 rounded-lg flex items-center gap-3 ${
                      activeTheme === theme.id
                        ? "bg-neutral-50 dark:bg-neutral-900/20 text-neutral-600 dark:text-neutral-400"
                        : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                    }`}
                  >
                    <Icon icon={theme.icon} className="w-5 h-5" />
                    <span className="text-sm font-medium">{theme.label}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Social Media Links */}
        <div className="relative" ref={socialRef}>
          <button
            onClick={() => {
              setIsSocialOpen(!isSocialOpen);
              setIsThemeOpen(false);
              setIsMenuOpen(false);
              setIsSearchOpen(false);
            }}
            className="p-2 rounded-lg bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer"
          >
            <Icon
              icon="mdi:share-variant"
              className="text-neutral-600 dark:text-neutral-300 w-5 h-5"
            />
          </button>
          <AnimatePresence>
            {isSocialOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 p-2 min-w-[180px]"
              >
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full p-2 rounded-lg flex items-center gap-3 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                    title={link.label}
                  >
                    <Icon icon={link.icon} className="w-5 h-5" />
                    <span className="text-sm font-medium">{link.label}</span>
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default Navbar;
