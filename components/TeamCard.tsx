'use client'

import type { TeamMember } from "@/lib/types"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

interface TeamCardProps {
  member: TeamMember
  assignedCount: number
  completedCount: number
  onEdit?: (member: TeamMember) => void
  onDelete?: (member: TeamMember) => Promise<void>
}

export function TeamCard({ member, assignedCount, completedCount, onEdit, onDelete }: TeamCardProps) {
  const loadRatio = member.capacity ? assignedCount / member.capacity : 0
  const capacityPercent = Math.min(100, Math.round(loadRatio * 100))
  const atCapacity = loadRatio >= 1
  const nearingCapacity = loadRatio >= 0.85 && loadRatio < 1

  const loadLabel =
    loadRatio === 0
      ? "Available"
      : loadRatio <= 0.5
        ? "Healthy"
        : nearingCapacity
          ? "Reaching capacity"
          : atCapacity
            ? "At capacity"
            : "Beyond capacity"

  const badgeVariant =
    loadRatio === 0
      ? "secondary"
      : loadRatio <= 0.5
        ? "success"
        : nearingCapacity
          ? "warning"
          : "destructive"

  const indicatorClassName = atCapacity
    ? "bg-destructive"
    : nearingCapacity
      ? "bg-amber-500"
      : loadRatio <= 0.5
        ? "bg-emerald-500"
        : "bg-primary"

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{member.name}</span>
          <Badge variant={badgeVariant}>{loadLabel}</Badge>
        </CardTitle>
        {member.role ? <CardDescription>{member.role}</CardDescription> : null}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-baseline justify-between text-sm">
          <div>
            <p className="text-muted-foreground">Assigned tasks</p>
            <p className="text-lg font-semibold">{assignedCount}</p>
          </div>
          <div className="text-right">
            <p className="text-muted-foreground">Completed</p>
            <p className="text-lg font-semibold">{completedCount}</p>
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Capacity</span>
            <span>
              {assignedCount}/{member.capacity} tasks
            </span>
          </div>
          <Progress value={capacityPercent} className="h-2" indicatorClassName={indicatorClassName} />
        </div>
      </CardContent>
      {onEdit || onDelete ? (
        <CardFooter className="flex items-center justify-end gap-2 pt-0">
          {onEdit ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(member)}
            >
              Edit
            </Button>
          ) : null}
          {onDelete ? (
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive"
              onClick={() => {
                if (onDelete) {
                  void onDelete(member)
                }
              }}
            >
              Remove
            </Button>
          ) : null}
        </CardFooter>
      ) : null}
    </Card>
  )
}


