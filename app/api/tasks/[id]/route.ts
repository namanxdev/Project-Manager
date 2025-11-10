import { NextResponse } from "next/server"

import { getDb } from "@/lib/db"
import { recalcProjectProgress } from "@/lib/server/project-service"
import { stripMongoId } from "@/lib/server/serialise"

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: taskId } = await params
  const payload = await request.json().catch(() => null)

  if (!payload) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }

  const db = await getDb()
  const tasksCollection = db.collection("tasks")

  const existing = await tasksCollection.findOne({ id: taskId })

  if (!existing) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 })
  }

  const setPayload: Record<string, unknown> = {}
  const unsetPayload: Record<string, unknown> = {}
  let shouldRecalculate = false

  if (typeof payload.name === "string") {
    const name = payload.name.trim()
    if (!name) {
      return NextResponse.json({ error: "Task name cannot be empty" }, { status: 400 })
    }
    setPayload.name = name
  }

  if ("assigneeId" in payload) {
    if (payload.assigneeId === null || payload.assigneeId === "") {
      unsetPayload.assigneeId = ""
    } else if (typeof payload.assigneeId === "string") {
      setPayload.assigneeId = payload.assigneeId
    }
  }

  if (typeof payload.isDone === "boolean") {
    setPayload.isDone = payload.isDone
    shouldRecalculate = true
  }

  const updateOperations: Record<string, Record<string, unknown>> = {}
  if (Object.keys(setPayload).length > 0) {
    updateOperations.$set = setPayload
  }
  if (Object.keys(unsetPayload).length > 0) {
    updateOperations.$unset = unsetPayload
  }

  if (Object.keys(updateOperations).length === 0) {
    return NextResponse.json({ error: "No valid fields to update" }, { status: 400 })
  }

  const updatedTask = await tasksCollection.findOneAndUpdate(
    { id: taskId },
    updateOperations,
    { returnDocument: "after" }
  )

  if (!updatedTask) {
    return NextResponse.json({ error: "Task not found after update" }, { status: 404 })
  }

  if (shouldRecalculate) {
    await recalcProjectProgress(existing.projectId)
  }

  return NextResponse.json(stripMongoId(updatedTask))
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: taskId } = await params
  const db = await getDb()
  const tasksCollection = db.collection("tasks")

  const deletedTask = await tasksCollection.findOneAndDelete({ id: taskId })

  if (!deletedTask) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 })
  }

  await recalcProjectProgress(deletedTask.projectId)

  return NextResponse.json({ success: true })
}


