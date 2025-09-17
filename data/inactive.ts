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
];
