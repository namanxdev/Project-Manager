"use client"

import { useMemo, useState } from "react"

import { TeamCard } from "@/components/TeamCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useAppContext } from "@/context/AppContext"

const createEmptyForm = () => ({
  name: "",
  role: "",
  capacity: "",
})

export default function TeamPage() {
  const {
    team,
    tasks,
    isReady,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
  } = useAppContext()

  const [form, setForm] = useState(createEmptyForm)
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null)
  const isEditing = editingMemberId != null

  const teamWithStats = useMemo(() => {
    const byMember = new Map<string, { assigned: number; completed: number }>()
    tasks.forEach((task) => {
      if (!task.assigneeId) return
      const current = byMember.get(task.assigneeId) ?? { assigned: 0, completed: 0 }
      current.assigned += 1
      if (task.isDone) current.completed += 1
      byMember.set(task.assigneeId, current)
    })
    return team.map((member) => {
      const stats = byMember.get(member.id) ?? { assigned: 0, completed: 0 }
      return { member, ...stats }
    })
  }, [tasks, team])

  const resetForm = () => {
    setForm(createEmptyForm())
    setEditingMemberId(null)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!form.name.trim()) return

    const hasCapacity = form.capacity.trim().length > 0
    const capacityValue = hasCapacity ? Number(form.capacity) : undefined

    if (hasCapacity && (capacityValue == null || Number.isNaN(capacityValue))) {
      return
    }

    const payload = {
      name: form.name.trim(),
      role: form.role.trim() || undefined,
      capacity: capacityValue,
    }

    if (isEditing && editingMemberId) {
      await updateTeamMember(editingMemberId, payload)
    } else {
      await addTeamMember(payload)
    }
    resetForm()
  }

  const handleEdit = (memberId: string) => {
    const member = team.find((item) => item.id === memberId)
    if (!member) return
    setEditingMemberId(member.id)
    setForm({
      name: member.name,
      role: member.role ?? "",
      capacity: member.capacity != null ? String(member.capacity) : "",
    })
  }

  const handleDelete = async (memberId: string) => {
    const member = team.find((item) => item.id === memberId)
    if (!member) return
    const confirmed = window.confirm(
      `Remove ${member.name} from the team? Their assigned tasks will become unassigned.`
    )
    if (!confirmed) return
    await deleteTeamMember(memberId)
    if (editingMemberId === memberId) {
      resetForm()
    }
  }

  if (!isReady) {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-48 animate-pulse rounded-xl border bg-card" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <h1 className="text-2xl font-semibold">Team overview</h1>
        <p className="text-sm text-muted-foreground">
          Understand who is carrying the most load and rebalance before deadlines sneak up.
        </p>
      </div>

      <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Studio load</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total team members</span>
              <span className="font-semibold">{team.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total assigned tasks</span>
              <span className="font-semibold">
                {tasks.filter((task) => Boolean(task.assigneeId)).length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Completed tasks</span>
              <span className="font-semibold">
                {tasks.filter((task) => task.isDone).length}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-lg">
              {isEditing ? "Update teammate" : "Add a teammate"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="member-name">Name</Label>
                <Input
                  id="member-name"
                  value={form.name}
                  onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                  placeholder="Alex, Priya, Malik..."
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="member-role">Role</Label>
                <Input
                  id="member-role"
                  value={form.role}
                  onChange={(event) => setForm((prev) => ({ ...prev, role: event.target.value }))}
                  placeholder="Project architect, BIM lead..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="member-capacity">Weekly capacity (tasks)</Label>
                <Input
                  id="member-capacity"
                  type="number"
                  min={0}
                  value={form.capacity}
                  onChange={(event) => setForm((prev) => ({ ...prev, capacity: event.target.value }))}
                  placeholder="6"
                />
              </div>
              <div className="flex items-center justify-between gap-3">
                {isEditing ? (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={resetForm}
                  >
                    Cancel
                  </Button>
                ) : (
                  <span className="text-xs text-muted-foreground">
                    Keep everyone’s capacity realistic to prevent burnout.
                  </span>
                )}
                <Button type="submit">{isEditing ? "Save changes" : "Add teammate"}</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>

      {teamWithStats.length === 0 ? (
        <div className="rounded-xl border border-dashed bg-card/70 p-10 text-center text-sm text-muted-foreground">
          Your team directory is empty. Add members using the form above and start assigning tasks.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {teamWithStats.map(({ member, assigned, completed }) => (
            <TeamCard
              key={member.id}
              member={member}
              assignedCount={assigned}
              completedCount={completed}
              onEdit={(item) => handleEdit(item.id)}
              onDelete={(item) => handleDelete(item.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}


