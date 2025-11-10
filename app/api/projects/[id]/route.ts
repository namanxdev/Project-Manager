import { NextResponse } from "next/server"

import { getDb } from "@/lib/db"
import type { ProjectStatus } from "@/lib/types"
import { stripMongoId } from "@/lib/server/serialise"

const clamp = (value: number, min = 0, max = 100) => Math.min(max, Math.max(min, value))

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: projectId } = await params
  const payload = await request.json().catch(() => null)

  if (!payload) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }

  const updates: Record<string, unknown> = {}

  if (typeof payload.name === "string") {
    const name = payload.name.trim()
    if (!name) {
      return NextResponse.json({ error: "Project name cannot be empty" }, { status: 400 })
    }
    updates.name = name
  }

  if (typeof payload.description === "string") {
    updates.description = payload.description.trim() || undefined
  }

  if (typeof payload.progress === "number") {
    updates.progress = clamp(payload.progress)
    updates.status = (updates.progress as number) >= 100 ? "completed" : "in-progress"
  }

  if (typeof payload.status === "string") {
    const status = payload.status as ProjectStatus
    if (status === "completed" || status === "in-progress") {
      updates.status = status
    }
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "No valid fields to update" }, { status: 400 })
  }

  const db = await getDb()
  const updatedProject = await db.collection("projects").findOneAndUpdate(
    { id: projectId },
    { $set: updates },
    { returnDocument: "after" }
  )

  if (!updatedProject) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 })
  }

  return NextResponse.json(stripMongoId(updatedProject))
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: projectId } = await params
  const db = await getDb()
  const projectsCollection = db.collection("projects")
  const tasksCollection = db.collection("tasks")

  const deletedProject = await projectsCollection.findOneAndDelete({ id: projectId })

  if (!deletedProject) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 })
  }

  await tasksCollection.deleteMany({ projectId })

  return NextResponse.json({ success: true })
}


