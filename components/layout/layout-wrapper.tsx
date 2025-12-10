"use client";

import ActivityBar from "./activitybar";
import Sidebar from "./sidebar";
import type { AnyProject } from "@/types/project";

type LayoutWrapperProps = {
  projects: AnyProject[];
  children: React.ReactNode;
};

const SIDEBAR_LINKS = [
  { label: "All Projects", href: "/" },
  { label: "Active Projects", href: "/active" },
  { label: "Pending Projects", href: "/pending" },
  { label: "Inactive Projects", href: "/inactive" },
];

export default function LayoutWrapper({
  projects,
  children,
}: LayoutWrapperProps) {
  return (
    <>
      <ActivityBar searchData={{ projects }} />
      <Sidebar links={SIDEBAR_LINKS} />
      <main className="min-h-screen ml-0 sm:ml-[calc(56px+16rem+1rem)] px-4 py-8 sm:px-8">
        {children}
      </main>
    </>
  );
}
