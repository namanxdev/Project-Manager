export type ProjectStatus = "in-progress" | "completed";

export interface Project {
  id: string;
  name: string;
  description?: string;
  progress: number;
  status: ProjectStatus;
  createdAt: string;
}

export interface Task {
  id: string;
  projectId: string;
  name: string;
  isDone: boolean;
  assigneeId?: string | null;
  createdAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role?: string;
  capacity: number;
}

export interface AppState {
  projects: Project[];
  tasks: Task[];
  team: TeamMember[];
}


