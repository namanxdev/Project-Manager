'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { toast } from "react-hot-toast"

import type { AppState, Project, ProjectStatus, Task, TeamMember } from "@/lib/types"

type ProjectInput = {
  name: string
  description?: string
  status?: ProjectStatus
}

type TaskInput = {
  projectId: string
  name: string
  assigneeId?: string | null
}

type TeamMemberInput = {
  name: string
  role?: string
  capacity?: number
}

interface AppContextValue extends AppState {
  isReady: boolean
  refresh: () => Promise<void>
  addProject: (input: ProjectInput) => Promise<void>
  updateProject: (id: string, updates: Partial<Omit<Project, "id">>) => Promise<void>
  deleteProject: (id: string) => Promise<void>
  setProjectProgress: (id: string, progress: number) => Promise<void>
  addTask: (input: TaskInput) => Promise<void>
  updateTask: (id: string, updates: Partial<Omit<Task, "id">>) => Promise<void>
  toggleTask: (id: string) => Promise<void>
  deleteTask: (id: string) => Promise<void>
  addTeamMember: (input: TeamMemberInput) => Promise<void>
  updateTeamMember: (id: string, updates: Partial<Omit<TeamMember, "id">>) => Promise<void>
  deleteTeamMember: (id: string) => Promise<void>
}

const AppContext = createContext<AppContextValue | null>(null)

const clamp = (value: number, min = 0, max = 100) => Math.min(max, Math.max(min, value))

const extractResponseMessage = async (response: Response): Promise<string | null> => {
  const cloned = response.clone()
  const contentType = cloned.headers.get("content-type") ?? ""

  if (contentType.includes("application/json")) {
    try {
      const data = await cloned.json()
      if (typeof data === "string") {
        const trimmed = data.trim()
        return trimmed.length > 0 ? trimmed : null
      }
      if (data && typeof data === "object") {
        for (const key of ["message", "error", "detail"]) {
          const value = (data as Record<string, unknown>)[key]
          if (typeof value === "string" && value.trim().length > 0) {
            return value.trim()
          }
        }
      }
    } catch {
      return null
    }
  }

  try {
    const text = await cloned.text()
    const trimmed = text.trim()
    return trimmed.length > 0 ? trimmed : null
  } catch {
    return null
  }
}

const ensureResponseSuccess = async (response: Response, fallback: string) => {
  if (response.ok) {
    return
  }

  const message = (await extractResponseMessage(response)) ?? fallback
  throw new Error(message)
}

const getErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof Error && typeof error.message === "string" && error.message.trim().length > 0) {
    return error.message
  }
  if (typeof error === "string" && error.trim().length > 0) {
    return error.trim()
  }
  return fallback
}

type ToastMessages<T> = {
  loading: string
  success: string | ((result: T) => string)
  error: string | ((error: unknown) => string)
}

const withToast = async <T,>(
  action: () => Promise<T>,
  messages: ToastMessages<T>
): Promise<T> => {
  return toast.promise(
    (async () => {
      try {
        return await action()
      } catch (error) {
        console.error(error)
        throw error
      }
    })(),
    {
      loading: messages.loading,
      success: (result) =>
        typeof messages.success === "function" ? messages.success(result) : messages.success,
      error: (error) =>
        typeof messages.error === "function"
          ? messages.error(error)
          : getErrorMessage(error, messages.error),
    }
  )
}

const normaliseState = (incoming: Partial<AppState> | null | undefined): AppState => {
  const today = new Date().toISOString()

  const projects = (incoming?.projects ?? []).map((project): Project => {
    const progressValue =
      typeof project.progress === "number" ? project.progress : Number(project.progress ?? 0)
    const status: ProjectStatus =
      project.status === "completed" || project.status === "in-progress"
        ? project.status
        : progressValue >= 100
          ? "completed"
          : "in-progress"

    return {
      id: project.id,
      name: project.name,
      description: project.description ?? undefined,
      progress: Number.isFinite(progressValue) ? progressValue : 0,
      status,
      createdAt: project.createdAt ?? today,
    }
  })

  const tasks = (incoming?.tasks ?? []).map((task): Task => ({
    id: task.id,
    projectId: task.projectId,
    name: task.name,
    isDone: Boolean(task.isDone),
    assigneeId: task.assigneeId ?? undefined,
    createdAt: task.createdAt ?? today,
  }))

  const team = (incoming?.team ?? []).map((member): TeamMember => ({
    id: member.id,
    name: member.name,
    role: member.role ?? undefined,
    capacity: (() => {
      const capacityValue = Number(
        typeof member.capacity === "number" ? member.capacity : Number(member.capacity ?? 0)
      )
      return Number.isFinite(capacityValue) ? Math.max(0, Math.round(capacityValue)) : 0
    })(),
  }))

  return {
    projects,
    tasks,
    team,
  }
}

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<AppState>(() => normaliseState({ projects: [], tasks: [], team: [] }))
  const [isReady, setIsReady] = useState(false)

  const loadState = useCallback(async () => {
    console.log("[loadState] Fetching state from /api/state")
    const response = await fetch("/api/state", { cache: "no-store" })
    if (!response.ok) {
      throw new Error("Failed to load workspace state")
    }
    const payload = await response.json()
    console.log("[loadState] Loaded payload:", payload)
    console.log("[loadState] Tasks count:", payload.tasks?.length)
    console.log("[loadState] First task:", payload.tasks?.[0])
    return normaliseState(payload)
  }, [])

  const fetchState = useCallback(async () => {
    const data = await loadState()
    setState(data)
    setIsReady(true)
  }, [loadState])

  useEffect(() => {
    let active = true
    const initialise = async () => {
      try {
        const data = await loadState()
        if (!active) return
        setState(data)
      } catch (error) {
        console.error(error)
      } finally {
        if (active) {
          setIsReady(true)
        }
      }
    }
    void initialise()
    return () => {
      active = false
    }
  }, [loadState])

  const addProject = useCallback(
    async (input: ProjectInput) => {
      const trimmedName = input.name.trim()
      if (!trimmedName) {
        toast.error("Project name is required")
        return
      }

      await withToast(
        async () => {
          const response = await fetch("/api/projects", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...input, name: trimmedName }),
          })

          await ensureResponseSuccess(response, "Failed to create project")
          await fetchState()
        },
        {
          loading: "Creating project...",
          success: `Project "${trimmedName}" created`,
          error: "Failed to create project",
        }
      )
    },
    [fetchState]
  )

  const updateProject = useCallback(
    async (id: string, updates: Partial<Omit<Project, "id">>) => {
      await withToast(
        async () => {
          const response = await fetch(`/api/projects/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updates),
          })

          await ensureResponseSuccess(response, "Failed to update project")
          await fetchState()
        },
        {
          loading: "Updating project...",
          success: "Project updated",
          error: "Failed to update project",
        }
      )
    },
    [fetchState]
  )

  const deleteProject = useCallback(
    async (id: string) => {
      await withToast(
        async () => {
          const response = await fetch(`/api/projects/${id}`, {
            method: "DELETE",
          })

          await ensureResponseSuccess(response, "Failed to delete project")
          await fetchState()
        },
        {
          loading: "Deleting project...",
          success: "Project deleted",
          error: "Failed to delete project",
        }
      )
    },
    [fetchState]
  )

  const setProjectProgress = useCallback(
    async (id: string, progress: number) => {
      const nextProgress = clamp(progress)
      const status: ProjectStatus = nextProgress >= 100 ? "completed" : "in-progress"
      await updateProject(id, { progress: nextProgress, status })
    },
    [updateProject]
  )

  const addTask = useCallback(
    async (input: TaskInput) => {
      const trimmedName = input.name.trim()
      if (!trimmedName) {
        toast.error("Task name is required")
        return
      }

      await withToast(
        async () => {
          const response = await fetch("/api/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...input,
              name: trimmedName,
            }),
          })

          await ensureResponseSuccess(response, "Failed to create task")
          await fetchState()
        },
        {
          loading: "Creating task...",
          success: `Task "${trimmedName}" created`,
          error: "Failed to create task",
        }
      )
    },
    [fetchState]
  )

  const updateTask = useCallback(
    async (id: string, updates: Partial<Omit<Task, "id">>) => {
      console.log("[updateTask] Updating task:", id, "with updates:", updates)
      await withToast(
        async () => {
          const response = await fetch(`/api/tasks/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updates),
          })

          console.log("[updateTask] Response status:", response.status)
          await ensureResponseSuccess(response, "Failed to update task")
          await fetchState()
        },
        {
          loading: "Updating task...",
          success: "Task updated",
          error: "Failed to update task",
        }
      )
    },
    [fetchState]
  )

  const toggleTask = useCallback(
    async (id: string) => {
      console.log("[toggleTask] Called with id:", id)
      const task = state.tasks.find((item) => item.id === id)
      console.log("[toggleTask] Found task:", task)
      if (!task) {
        console.log("[toggleTask] Task not found in state")
        toast.error("Task not found")
        return
      }

      console.log("[toggleTask] Toggling isDone from", task.isDone, "to", !task.isDone)
      await updateTask(id, { isDone: !task.isDone })
    },
    [state.tasks, updateTask]
  )

  const deleteTask = useCallback(
    async (id: string) => {
      await withToast(
        async () => {
          const response = await fetch(`/api/tasks/${id}`, {
            method: "DELETE",
          })

          await ensureResponseSuccess(response, "Failed to delete task")
          await fetchState()
        },
        {
          loading: "Deleting task...",
          success: "Task deleted",
          error: "Failed to delete task",
        }
      )
    },
    [fetchState]
  )

  const addTeamMember = useCallback(
    async (input: TeamMemberInput) => {
      const trimmedName = input.name.trim()
      if (!trimmedName) {
        toast.error("Team member name is required")
        return
      }

      await withToast(
        async () => {
          const response = await fetch("/api/team", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...input, name: trimmedName }),
          })

          await ensureResponseSuccess(response, "Failed to add team member")
          await fetchState()
        },
        {
          loading: "Adding team member...",
          success: `Team member "${trimmedName}" added`,
          error: "Failed to add team member",
        }
      )
    },
    [fetchState]
  )

  const updateTeamMember = useCallback(
    async (id: string, updates: Partial<Omit<TeamMember, "id">>) => {
      await withToast(
        async () => {
          const response = await fetch(`/api/team/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updates),
          })

          await ensureResponseSuccess(response, "Failed to update team member")
          await fetchState()
        },
        {
          loading: "Updating team member...",
          success: "Team member updated",
          error: "Failed to update team member",
        }
      )
    },
    [fetchState]
  )

  const deleteTeamMember = useCallback(
    async (id: string) => {
      console.log("[deleteTeamMember] Deleting team member:", id)
      await withToast(
        async () => {
          const response = await fetch(`/api/team/${id}`, {
            method: "DELETE",
          })

          console.log("[deleteTeamMember] Response status:", response.status)
          await ensureResponseSuccess(response, "Failed to remove team member")

          console.log("[deleteTeamMember] Success! Refreshing state...")
          await fetchState()
          console.log("[deleteTeamMember] State refreshed")
        },
        {
          loading: "Removing team member...",
          success: "Team member removed",
          error: "Failed to remove team member",
        }
      )
    },
    [fetchState]
  )

  const value = useMemo<AppContextValue>(
    () => ({
      ...state,
      isReady,
      refresh: fetchState,
      addProject,
      updateProject,
      deleteProject,
      setProjectProgress,
      addTask,
      updateTask,
      toggleTask,
      deleteTask,
      addTeamMember,
      updateTeamMember,
      deleteTeamMember,
    }),
    [
      state,
      isReady,
      fetchState,
      addProject,
      updateProject,
      deleteProject,
      setProjectProgress,
      addTask,
      updateTask,
      toggleTask,
      deleteTask,
      addTeamMember,
      updateTeamMember,
      deleteTeamMember,
    ]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}

