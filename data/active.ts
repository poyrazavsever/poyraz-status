export interface ActiveProject {
  id: string;
  title: string;
  description: string;
  status: "active";
  lastUpdated: string;
  clientName: string;
  projectType: string;
  stack: string[];
  liveUrl: string;
}

export const activeProjects: ActiveProject[] = [
  {
    id: "1",
    title: "My Portfolio",
    description:
      "A modern portfolio website showcasing my work, skills, and projects.",
    status: "active",
    clientName: "Self",
    projectType: "Personal Website",
    stack: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "Tailwind CSS",
      "Framer Motion",
      "Iconify",
    ],
    liveUrl: "https://poyrazavsever.com",
    lastUpdated: "2 hours ago",
  },
  {
    id: "2",
    title: "Athena Şifa",
    description:
      "Medical website for Athena Şifa. Seraphim Blueprint integration. Heart Connection and Soul Healing.",
    status: "active",
    clientName: "Ali Korkmaz",
    projectType: "Blog Website",
    stack: ["Next.js", "Framer Motion", "Firebase", "Tailwind CSS"],
    liveUrl: "https://athenasifa.com",
    lastUpdated: "30 minutes ago",
  },
  {
    id: "3",
    title: "ARC Foreign Trade",
    description:
      "Foreign trade company website with product catalog, inquiry forms, and multilingual support.",
    status: "active",
    clientName: "ARC Foreign Trade",
    projectType: "Blog Website",
    stack: ["Next.js", "Framer Motion", "Mongodb", "Tailwind CSS"],
    liveUrl: "https://arcforeigntrade.com",
    lastUpdated: "1 hour ago",
  },
  {
    id: "4",
    title: "Readme Maker",
    description:
      "Readme Maker for developers to easily create professional README files for their projects.",
    status: "active",
    clientName: "Hobby Project",
    projectType: "Full Stack Web App",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    liveUrl: "https://readme-maker-eight.vercel.app/",
    lastUpdated: "4 hours ago",
  },
  {
    id: "5",
    title: "Poyraz - UI Library",
    description:
      "A comprehensive UI library for building modern web applications with ease.",
    status: "active",
    clientName: "Hobby Project",
    projectType: "Full Stack Web App",
    stack: ["Nextjs", "Tailwind CSS", "TypeScript", "Storybook"],
    liveUrl: "https://ui.poyrazavsever.com/",
    lastUpdated: "4 hours ago",
  },
];
