export interface InactiveProject {
  id: string;
  title: string;
  description: string;
  status: "inactive";
  lastUpdated: string;
  clientName: string;
  projectType: string;
  stack: string[];
}

export const inactiveProjects: InactiveProject[] = [
  {
    id: "1",
    title: "E-Sanayim Web Platform",
    description:
      "B2B e-commerce platform for industrial products with supplier management and bulk ordering features.",
    status: "inactive",
    clientName: "OSTIM Technical University",
    projectType: "Web Application",
    stack: ["React", "Node.js", "Express", "MongoDB", "Socket.io"],
    lastUpdated: "1 week ago",
  },
  {
    id: "2",
    title: "Earthquake Awareness",
    description:
      "Educational platform providing resources, safety tips, and real-time alerts about earthquakes.",
    status: "inactive",
    clientName: "Huawei Student Developer - OSTIM",
    projectType: "Enterprise Application",
    stack: ["Next.js", "Supabase", "Typescript", "Tailwind CSS", "Docker"],
    lastUpdated: "1 month ago",
  },
  {
    id: "3",
    title: "The Meaning of Our Anthems",
    description:
      "Turkey's national anthems explained with historical context, lyrics analysis, and multimedia content. A cultural exploration platform.",
    status: "inactive",
    clientName: "Self",
    projectType: "Web Application",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    lastUpdated: "3 weeks ago",
  },
];
