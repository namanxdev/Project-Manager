"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { TaskItem } from "@/components/TaskItem"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAppContext } from "@/context/AppContext"

export default function ProjectDetailPage() {
  const params = useParams<{ id: string }>()
  const projectId = params?.id ?? ""
  const {
    projects,
    tasks,
    team,
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
    isReady,
  } = useAppContext()

  const [taskForm, setTaskForm] = useState<{ name: string; assigneeId: string | null }>({
    name: "",
    assigneeId: null,
  })

  const project = projects.find((item) => item.id === projectId)
  const projectTasks = useMemo(
    () =>
      tasks
        .filter((task) => task.projectId === projectId)
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()),
    [projectId, tasks]
  )

  const completedCount = projectTasks.filter((task) => task.isDone).length

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!taskForm.name.trim() || !project) return
    await addTask({
      projectId: project.id,
      name: taskForm.name,
      assigneeId: taskForm.assigneeId,
    })
    setTaskForm({ name: "", assigneeId: null })
  }

  if (!isReady) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-56 animate-pulse rounded bg-muted" />
        <div className="grid gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-24 animate-pulse rounded-xl border bg-card" />
          ))}
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="flex flex-col items-start gap-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground underline">
          <ArrowLeft className="h-4 w-4" /> Back to projects
        </Link>
        <Card className="max-w-xl">
          <CardHeader>
            <CardTitle>Project not found</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>The requested project does not exist or has been removed.</p>
            <Button asChild>
              <Link href="/">Return to dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-3">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to dashboard
        </Link>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">{project.name}</h1>
            {project.description ? (
              <p className="max-w-2xl text-sm text-muted-foreground">{project.description}</p>
            ) : null}
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <Badge variant={project.status === "completed" ? "success" : "warning"}>
                {project.status === "completed" ? "Completed" : "In Progress"}
              </Badge>
              <span>{completedCount}/{projectTasks.length} tasks completed</span>
              <span>Progress {project.progress}%</span>
            </div>
          </div>
          <div className="w-full max-w-xs space-y-2">
            <Progress value={project.progress} />
            <p className="text-xs text-muted-foreground">
              Project progress will mark 100% automatically once every task is complete.
            </p>
          </div>
        </div>
      </div>

      <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-lg">Add a task</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="task-name">Task name</Label>
                <Input
                  id="task-name"
                  placeholder="Brief deliverable description"
                  value={taskForm.name}
                  onChange={(event) =>
                    setTaskForm((prev) => ({ ...prev, name: event.target.value }))
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="task-assignee">Assign to</Label>
                <Select
                  id="task-assignee"
                  value={taskForm.assigneeId ?? ""}
                  onChange={(event) =>
                    setTaskForm((prev) => ({
                      ...prev,
                      assigneeId: event.target.value ? event.target.value : null,
                    }))
                  }
                >
                  <option value="">Unassigned</option>
                  {team.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </Select>
              </div>
              <Button type="submit" className="w-full">
                Add task
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-lg">Project metadata</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span>Created</span>
              <span>{new Date(project.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Total tasks</span>
              <span>{projectTasks.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Open tasks</span>
              <span>{projectTasks.length - completedCount}</span>
            </div>
            <div className="flex justify-between">
              <span>Complete</span>
              <span>{completedCount}</span>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Task list</h2>
        {projectTasks.length === 0 ? (
          <div className="rounded-xl border border-dashed bg-card/70 p-8 text-center text-sm text-muted-foreground">
            No tasks yet. Capture milestones or deliverables using the form above.
          </div>
        ) : (
          <div className="space-y-3">
            {projectTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                teamMembers={team}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onAssign={(taskId, assigneeId) =>
                  updateTask(taskId, { assigneeId: assigneeId ?? undefined })
                }
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}


