import { NextResponse } from "next/server"

import { getDb } from "@/lib/db"
import { createId } from "@/lib/id"
import { recalcProjectProgress } from "@/lib/server/project-service"
import { stripMongoId } from "@/lib/server/serialise"
import type { Task } from "@/lib/types"

export async function GET() {
  const db = await getDb()
  const tasks = await db.collection("tasks").find().toArray()
  return NextResponse.json(tasks.map(stripMongoId))
}

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null)

  if (
    !payload ||
    typeof payload.projectId !== "string" ||
    typeof payload.name !== "string"
  ) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }

  const name = payload.name.trim()
  if (!name) {
    return NextResponse.json({ error: "Task name is required" }, { status: 400 })
  }

  const task: Task = {
    id: createId("task"),
    projectId: payload.projectId,
    name,
    isDone: false,
    assigneeId: typeof payload.assigneeId === "string" && payload.assigneeId.length
      ? payload.assigneeId
      : undefined,
    createdAt: new Date().toISOString(),
  }

  const db = await getDb()
  await db.collection("tasks").insertOne(task)

  await recalcProjectProgress(task.projectId)

  return NextResponse.json(task, { status: 201 })
}


