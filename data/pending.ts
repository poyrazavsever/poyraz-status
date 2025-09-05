export interface PendingProject {
  id: string;
  title: string;
  description: string;
  status: "pending";
  lastUpdated: string;
  clientName: string;
  projectType: string;
  stack: string[];
  progress: number;
}

export const pendingProjects: PendingProject[] = [
  {
    id: "1",
    title: "Kalfaoğulları Construction",
    description:
      "A comprehensive website showcasing Kalfaoğulları Construction's projects, services, and company information.",
    status: "pending",
    clientName: "Kalfaoğulları",
    projectType: "Company Website",
    stack: ["React", "Next.js", "Tailwind CSS", "TypeScript", "Framer Motion"],
    lastUpdated: "1 day ago",
    progress: 95,
  },
  {
    id: "2",
    title: "KEPMER City Planning Center",
    description:
      "A modern website for KEPMER - City Planning Center, highlighting their urban planning services and projects.",
    status: "pending",
    clientName: "KEPMER",
    projectType: "Company Website",
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT", "Cloudinary"],
    lastUpdated: "3 hours ago",
    progress: 50,
  },
  {
    id: "3",
    title: "Ürün Uncu - E-commerce Platform",
    description:
      "E-commerce platform enabling online sales, product management, and customer engagement.",
    status: "pending",
    clientName: "Ürün Uncu",
    projectType: "Full Stack Web App",
    stack: [
      "Next.js",
      "TypeScript",
      "Express.js",
      "Mongodb",
      "Iyzco",
      "Tailwind CSS",
      "Framer Motion",
    ],
    lastUpdated: "2 days ago",
    progress: 40,
  },
];
