"use client"

import { useMemo, useState } from "react"

import { TeamCard } from "@/components/TeamCard"
import { TeamMemberForm, type TeamMemberFormState } from "@/components/TeamMemberForm"
import { Modal } from "@/components/ui/modal"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAppContext } from "@/context/AppContext"

const createEmptyForm = (): TeamMemberFormState => ({
  name: "",
  role: "",
  capacity: "",
})

type TeamMemberPayload = {
  name: string
  role?: string
  capacity?: number
}

const toPayload = (form: TeamMemberFormState): TeamMemberPayload | null => {
  const name = form.name.trim()
  if (!name) return null

  const roleValue = form.role.trim()
  const hasCapacity = form.capacity.trim().length > 0

  let capacityValue: number | undefined
  if (hasCapacity) {
    const parsed = Number(form.capacity)
    if (!Number.isFinite(parsed)) {
      return null
    }
    capacityValue = parsed
  }

  return {
    name,
    role: roleValue || undefined,
    capacity: capacityValue,
  }
}

export default function TeamPage() {
  const {
    team,
    tasks,
    isReady,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
  } = useAppContext()

  const [createForm, setCreateForm] = useState(createEmptyForm)
  const [editForm, setEditForm] = useState(createEmptyForm)
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  const resetCreateForm = () => {
    setCreateForm(createEmptyForm())
  }

  const resetEditState = () => {
    setEditForm(createEmptyForm())
    setEditingMemberId(null)
    setIsModalOpen(false)
  }

  const handleCreateSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const payload = toPayload(createForm)
    if (!payload) return
    await addTeamMember(payload)
    resetCreateForm()
  }

  const handleEditSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!editingMemberId) return
    const payload = toPayload(editForm)
    if (!payload) return
    await updateTeamMember(editingMemberId, payload)
    resetEditState()
  }

  const handleEdit = (memberId: string) => {
    const member = team.find((item) => item.id === memberId)
    if (!member) return
    setEditingMemberId(member.id)
    setEditForm({
      name: member.name,
      role: member.role ?? "",
      capacity: member.capacity != null ? String(member.capacity) : "",
    })
    setIsModalOpen(true)
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
      resetEditState()
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
              Add a teammate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TeamMemberForm
              mode="create"
              values={createForm}
              onChange={(next) => setCreateForm(next)}
              onSubmit={handleCreateSubmit}
              helperText="Keep everyone's capacity realistic to prevent burnout."
            />
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

      <Modal
        isOpen={isModalOpen}
        onClose={resetEditState}
        labelledBy="edit-teammate-title"
      >
        <Card>
          <CardHeader>
            <CardTitle
              id="edit-teammate-title"
              className="text-lg"
            >
              Update teammate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TeamMemberForm
              mode="edit"
              values={editForm}
              onChange={(next) => setEditForm(next)}
              onSubmit={handleEditSubmit}
              onCancel={resetEditState}
            />
          </CardContent>
        </Card>
      </Modal>
    </div>
  )
}


