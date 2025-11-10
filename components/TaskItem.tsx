'use client'

import { Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Task, TeamMember } from "@/lib/types"
import { Trash2 } from "lucide-react"

interface TaskItemProps {
  task: Task
  teamMembers: TeamMember[]
  onToggle?: (taskId: string) => Promise<void>
  onDelete?: (taskId: string) => Promise<void>
  onAssign?: (taskId: string, assigneeId: string | null) => Promise<void>
}

export function TaskItem({ task, teamMembers, onToggle, onDelete, onAssign }: TaskItemProps) {
  const assigneeLabel =
    task.assigneeId && teamMembers.length
      ? teamMembers.find((member) => member.id === task.assigneeId)?.name ?? "Unassigned"
      : "Unassigned"

  return (
    <div className="flex flex-col gap-3 rounded-lg border bg-card/80 p-4 shadow-sm transition hover:border-primary/30 hover:shadow-md md:flex-row md:items-center">
      <div className="flex flex-1 items-start gap-3">
        <button
          type="button"
          onClick={() => {
            if (onToggle) {
              void onToggle(task.id)
            }
          }}
          className={cn(
            "mt-1 inline-flex h-5 w-5 items-center justify-center rounded-md border transition",
            task.isDone ? "border-primary bg-primary text-primary-foreground" : "border-input"
          )}
          aria-label={task.isDone ? "Mark task as incomplete" : "Mark task as complete"}
          aria-pressed={task.isDone}
        >
          {task.isDone ? (
            <span className="text-[10px] font-semibold leading-none">✓</span>
          ) : (
            <span className="text-[10px] font-semibold leading-none text-muted-foreground">○</span>
          )}
        </button>
        <div className="space-y-2">
          <p
            className={cn(
              "text-sm font-medium",
              task.isDone && "text-muted-foreground line-through"
            )}
          >
            {task.name}
          </p>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Badge variant={task.isDone ? "success" : "outline"}>
              {task.isDone ? "Complete" : "Active"}
            </Badge>
            <span>Created {new Date(task.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-2 md:w-64">
        <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Assignee
        </label>
        <Select
          value={task.assigneeId ?? ""}
          onChange={(event) => {
            if (onAssign) {
              void onAssign(task.id, event.target.value || null)
            }
          }}
        >
          <option value="">Unassigned</option>
          {teamMembers.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name}
            </option>
          ))}
        </Select>
        <span className="text-xs text-muted-foreground">{assigneeLabel}</span>
      </div>

      <div className="flex items-center gap-2 self-end md:self-center">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={`Delete task ${task.name}`}
          onClick={() => {
            if (onDelete) {
              void onDelete(task.id)
            }
          }}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

