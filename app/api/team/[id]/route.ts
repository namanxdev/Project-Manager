import { NextResponse } from "next/server"

import { getDb } from "@/lib/db"
import { stripMongoId } from "@/lib/server/serialise"

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: memberId } = await params
  const payload = await request.json().catch(() => null)

  if (!payload) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }

  const updates: Record<string, unknown> = {}

  if (typeof payload.name === "string") {
    const name = payload.name.trim()
    if (!name) {
      return NextResponse.json({ error: "Name cannot be empty" }, { status: 400 })
    }
    updates.name = name
  }

  if (typeof payload.role === "string") {
    updates.role = payload.role.trim() || undefined
  }

  if (typeof payload.capacity === "number" && Number.isFinite(payload.capacity)) {
    updates.capacity = Math.max(0, Math.round(payload.capacity))
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "No valid fields to update" }, { status: 400 })
  }

  const db = await getDb()
  const updatedMember = await db.collection("team").findOneAndUpdate(
    { id: memberId },
    { $set: updates },
    { returnDocument: "after" }
  )

  if (!updatedMember) {
    return NextResponse.json({ error: "Team member not found" }, { status: 404 })
  }

  return NextResponse.json(stripMongoId(updatedMember))
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: memberId } = await params
  const db = await getDb()
  const deletedMember = await db.collection("team").findOneAndDelete({ id: memberId })

  if (!deletedMember) {
    return NextResponse.json({ error: "Team member not found" }, { status: 404 })
  }

  // Unassign tasks that referenced this team member
  await db.collection("tasks").updateMany({ assigneeId: memberId }, { $unset: { assigneeId: "" } })

  return NextResponse.json({ success: true })
}


