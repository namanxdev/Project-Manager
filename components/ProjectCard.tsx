'use client'

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowUpRight, Trash2 } from "lucide-react"

import type { Project, Task } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

interface ProjectCardProps {
  project: Project
  tasks: Task[]
  onProgressChange?: (projectId: string, progress: number) => Promise<void>
  onDelete?: (projectId: string) => Promise<void>
}

export function ProjectCard({ project, tasks, onProgressChange, onDelete }: ProjectCardProps) {
  const [progressDraft, setProgressDraft] = useState<string | null>(null)

  const stats = useMemo(() => {
    const total = tasks.length
    const completed = tasks.filter((task) => task.isDone).length
    const pending = total - completed
    return { total, completed, pending }
  }, [tasks])

  const statusBadge = useMemo(() => {
    if (project.status === "completed") {
      return { label: "Completed", variant: "success" as const }
    }
    return { label: "In Progress", variant: "warning" as const }
  }, [project.status])

  const inputValue = progressDraft ?? String(project.progress ?? 0)

  const handleProgressCommit = async (rawValue?: string) => {
    if (!onProgressChange) return
    const nextValue = rawValue ?? inputValue
    const parsed = Number(nextValue)
    if (Number.isNaN(parsed)) {
      setProgressDraft(null)
      return
    }
    await onProgressChange(project.id, parsed)
    setProgressDraft(null)
  }

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="space-y-2">
          <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
          <CardTitle className="text-xl">
            <Link
              href={`/project/${project.id}`}
              className="flex items-center gap-2 text-left transition hover:text-primary"
            >
              <span>{project.name}</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </CardTitle>
          {project.description ? (
            <p className="text-sm text-muted-foreground">{project.description}</p>
          ) : null}
        </div>
        <Button
          variant="ghost"
          size="icon"
          aria-label={`Delete ${project.name}`}
          onClick={() => {
            if (onDelete) {
              void onDelete(project.id)
            }
          }}
          className="text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-muted-foreground">Progress</span>
            <span className="font-semibold">{project.progress}%</span>
          </div>
          <Progress value={project.progress} />
          <div className="flex flex-col gap-2 rounded-lg border border-dashed p-3">
            <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Manual update (%)
            </label>
            <Input
              type="number"
              min={0}
              max={100}
              step={5}
              value={inputValue}
              onChange={(event) => setProgressDraft(event.target.value)}
              onBlur={(event) => {
                void handleProgressCommit(event.currentTarget.value)
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault()
                  void handleProgressCommit((event.target as HTMLInputElement).value)
                }
              }}
            />
            <p className="text-xs text-muted-foreground">
              Adjust progress manually. It will automatically complete once all tasks are finished.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 text-center text-sm">
          <div className={cn("rounded-md border bg-muted/40 p-3")}>
            <span className="block text-xs text-muted-foreground">Total tasks</span>
            <span className="text-lg font-semibold">{stats.total}</span>
          </div>
          <div className={cn("rounded-md border bg-emerald-50/60 p-3 text-emerald-700")}>
            <span className="block text-xs uppercase tracking-wide">Complete</span>
            <span className="text-lg font-semibold">{stats.completed}</span>
          </div>
          <div className={cn("rounded-md border bg-amber-50/70 p-3 text-amber-800")}>
            <span className="block text-xs uppercase tracking-wide">Open</span>
            <span className="text-lg font-semibold">{stats.pending}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-auto flex flex-col gap-4">
        <Button asChild className="w-full">
          <Link href={`/project/${project.id}`}>Open task board</Link>
        </Button>
        <p className="text-xs text-muted-foreground">
          Created{" "}
          {new Date(project.createdAt).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </CardFooter>
    </Card>
  )
}

