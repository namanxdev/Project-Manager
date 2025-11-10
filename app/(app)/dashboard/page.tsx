"use client"

import { useMemo, useState } from "react"

import { ProjectCard } from "@/components/ProjectCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useAppContext } from "@/context/AppContext"

const statusOptions = [
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
]

export default function DashboardPage() {
  const { projects, tasks, addProject, deleteProject, setProjectProgress, isReady } = useAppContext()
  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "in-progress" as "in-progress" | "completed",
  })

  const stats = useMemo(() => {
    const totalTasks = tasks.length
    const completedTasks = tasks.filter((task) => task.isDone).length
    const openTasks = totalTasks - completedTasks
    const completedProjects = projects.filter((project) => project.status === "completed").length
    return { totalTasks, completedTasks, openTasks, completedProjects }
  }, [projects, tasks])

  const orderedProjects = useMemo(
    () =>
      [...projects].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    [projects]
  )

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!form.name.trim()) return
    await addProject(form)
    setForm({
      name: "",
      description: "",
      status: "in-progress",
    })
  }

  if (!isReady) {
    return (
      <div className="grid gap-4">
        <div className="h-10 w-40 animate-pulse rounded-md bg-muted" />
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="h-64 animate-pulse rounded-xl border bg-card" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-10">
      <section className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Add a new project</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="project-name">Project name</Label>
                <Input
                  id="project-name"
                  placeholder="Adaptive reuse, residential, competition..."
                  value={form.name}
                  onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-description">Summary (optional)</Label>
                <Textarea
                  id="project-description"
                  placeholder="One-line context for the studio team"
                  value={form.description}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, description: event.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-status">Status</Label>
                <Select
                  id="project-status"
                  value={form.status}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      status: event.target.value as "in-progress" | "completed",
                    }))
                  }
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </div>
              <Button type="submit" className="w-full">
                Add project
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-card/80">
          <CardHeader>
            <CardTitle className="text-lg">Workspace snapshot</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Projects completed</span>
              <span className="font-semibold">
                {stats.completedProjects}/{projects.length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Open tasks</span>
              <span className="font-semibold">{stats.openTasks}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Completed tasks</span>
              <span className="font-semibold">{stats.completedTasks}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total tasks in studio</span>
              <span className="font-semibold">{stats.totalTasks}</span>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Project dashboard</h2>
          <p className="text-sm text-muted-foreground">
            Track progress across every active commission. Click into a project to manage its task list.
          </p>
        </div>

        {orderedProjects.length === 0 ? (
          <div className="rounded-xl border border-dashed bg-card/70 p-10 text-center text-sm text-muted-foreground">
            No projects yet. Add your first project using the form above.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {orderedProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                tasks={tasks.filter((task) => task.projectId === project.id)}
                onProgressChange={setProjectProgress}
                onDelete={deleteProject}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
