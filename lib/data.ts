import type { AppState, Project, Task, TeamMember } from "./types";

const seedProjects: Project[] = [
  {
    id: "project-civic-center",
    name: "Civic Center Renovation",
    description: "Adaptive reuse of the downtown civic center with a public plaza.",
    progress: 0,
    status: "in-progress",
    createdAt: "2024-04-02T10:00:00.000Z",
  },
  {
    id: "project-harbor-museum",
    name: "Harborview Museum Expansion",
    description: "New gallery wing with climate-controlled archives and river walk.",
    progress: 0,
    status: "in-progress",
    createdAt: "2024-02-18T09:15:00.000Z",
  },
  {
    id: "project-sierra-residence",
    name: "Sierra Residences Masterplan",
    description: "Net-zero mountain housing development across four phases.",
    progress: 0,
    status: "in-progress",
    createdAt: "2023-11-10T08:30:00.000Z",
  },
];

const seedTasks: Task[] = [
  {
    id: "task-site-survey",
    projectId: "project-civic-center",
    name: "Complete structural site survey",
    isDone: true,
    assigneeId: "member-taha",
    createdAt: "2024-04-04T14:00:00.000Z",
  },
  {
    id: "task-community-workshop",
    projectId: "project-civic-center",
    name: "Host community co-design workshop",
    isDone: false,
    assigneeId: "member-maya",
    createdAt: "2024-04-08T09:30:00.000Z",
  },
  {
    id: "task-façade-study",
    projectId: "project-civic-center",
    name: "Finalize façade retrofit study",
    isDone: false,
    assigneeId: "member-samir",
    createdAt: "2024-04-12T12:45:00.000Z",
  },
  {
    id: "task-budget-review",
    projectId: "project-civic-center",
    name: "Align budget with sustainability targets",
    isDone: false,
    assigneeId: "member-amelia",
    createdAt: "2024-04-15T11:20:00.000Z",
  },
  {
    id: "task-exhibit-narrative",
    projectId: "project-harbor-museum",
    name: "Draft exhibit narrative with curatorial team",
    isDone: true,
    assigneeId: "member-maya",
    createdAt: "2024-02-22T15:10:00.000Z",
  },
  {
    id: "task-hvac-model",
    projectId: "project-harbor-museum",
    name: "Model HVAC loads for collection wing",
    isDone: false,
    assigneeId: "member-samir",
    createdAt: "2024-02-25T16:40:00.000Z",
  },
  {
    id: "task-marine-consult",
    projectId: "project-harbor-museum",
    name: "Coordinate marine consultant package",
    isDone: false,
    assigneeId: "member-taha",
    createdAt: "2024-02-28T13:00:00.000Z",
  },
  {
    id: "task-accessibility-audit",
    projectId: "project-harbor-museum",
    name: "Run accessibility audit for visitor flow",
    isDone: true,
    assigneeId: "member-amelia",
    createdAt: "2024-03-02T08:25:00.000Z",
  },
  {
    id: "task-phase-one-massing",
    projectId: "project-sierra-residence",
    name: "Complete massing study for phase one",
    isDone: true,
    assigneeId: "member-samir",
    createdAt: "2023-11-15T10:10:00.000Z",
  },
  {
    id: "task-solar-analysis",
    projectId: "project-sierra-residence",
    name: "Iterate solar performance analysis",
    isDone: false,
    assigneeId: "member-maya",
    createdAt: "2023-11-18T12:05:00.000Z",
  },
  {
    id: "task-stakeholder-update",
    projectId: "project-sierra-residence",
    name: "Prepare stakeholder update deck",
    isDone: false,
    assigneeId: "member-amelia",
    createdAt: "2023-11-20T14:50:00.000Z",
  },
  {
    id: "task-permitting-roadmap",
    projectId: "project-sierra-residence",
    name: "Map municipal permitting roadmap",
    isDone: false,
    assigneeId: "member-taha",
    createdAt: "2023-11-23T09:05:00.000Z",
  },
];

const seedTeam: TeamMember[] = [
  {
    id: "member-taha",
    name: "Taha Khan",
    role: "Principal Architect",
    capacity: 6,
  },
  {
    id: "member-maya",
    name: "Maya Chen",
    role: "Project Architect",
    capacity: 7,
  },
  {
    id: "member-samir",
    name: "Samir Patel",
    role: "Sustainability Lead",
    capacity: 5,
  },
  {
    id: "member-amelia",
    name: "Amelia García",
    role: "Design Manager",
    capacity: 6,
  },
];

export const seedState: AppState = {
  projects: seedProjects,
  tasks: seedTasks,
  team: seedTeam,
};


