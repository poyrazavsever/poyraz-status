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
    lastUpdated: "08/09/2025",
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
    lastUpdated: "10/09/2025",
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
    lastUpdated: "10/09/2025",
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
    lastUpdated: "10/09/2025",
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
    lastUpdated: "10/09/2025",
  },
  {
    id: "6",
    title: "Kalfaoğulları Construction",
    description:
      "A comprehensive website showcasing Kalfaoğulları Construction's projects, services, and company information.",
    status: "active",
    clientName: "Kalfaoğulları",
    projectType: "Company Website",
    stack: ["React", "Next.js", "Tailwind CSS", "TypeScript", "Framer Motion"],
    liveUrl: "https://kalfaogullari.com.tr/",
    lastUpdated: "17/09/2025",
  },
  {
    id: "7",
    title: "The Meaning of Our Anthems",
    description:
      "Turkey's national anthems explained with historical context, lyrics analysis, and multimedia content. A cultural exploration platform.",
    status: "active",
    clientName: "Self",
    projectType: "Web Application",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://mars.poyrazavsever.com",
    lastUpdated: "17/09/2025",
  },
  {
    id: "8",
    title: "Earthquake Awareness",
    description:
      "Educational platform providing resources, safety tips, and real-time alerts about earthquakes.",
    status: "active",
    clientName: "Huawei Student Developer - OSTIM",
    projectType: "Enterprise Application",
    stack: ["Next.js", "Supabase", "Typescript", "Tailwind CSS", "Docker"],
    liveUrl: "https://deprembilinci.poyrazavsever.com",
    lastUpdated: "17/09/2025",
  },
];
