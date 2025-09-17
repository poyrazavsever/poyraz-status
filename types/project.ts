export type Category = "active" | "inactive" | "pending";

export interface BaseProject {
  id: string;
  title: string;
  description: string;
  status: Category;
  lastUpdated: string;
  clientName: string;
  projectType: string;
  stack: string[];
}

export interface ActiveProject extends BaseProject {
  status: "active";
  liveUrl: string;
}

export interface InactiveProject extends BaseProject {
  status: "inactive";
}

export interface PendingProject extends BaseProject {
  status: "pending";
  progress: number;
}

export type AnyProject = ActiveProject | InactiveProject | PendingProject;
