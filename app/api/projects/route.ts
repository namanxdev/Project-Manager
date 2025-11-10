import { NextResponse } from "next/server"

import { getDb } from "@/lib/db"
import { createId } from "@/lib/id"
import type { Project, ProjectStatus } from "@/lib/types"
import { stripMongoId } from "@/lib/server/serialise"

export async function GET() {
  const db = await getDb()
  const projects = await db.collection("projects").find().toArray()
  return NextResponse.json(projects.map(stripMongoId))
}

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null)

  if (!payload || typeof payload.name !== "string") {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }

  const name = payload.name.trim()
  if (!name) {
    return NextResponse.json({ error: "Project name is required" }, { status: 400 })
  }

  const status: ProjectStatus =
    payload.status === "completed" || payload.status === "in-progress"
      ? payload.status
      : "in-progress"

  const project: Project = {
    id: createId("project"),
    name,
    description: typeof payload.description === "string" && payload.description.trim().length
      ? payload.description.trim()
      : undefined,
    status,
    progress: status === "completed" ? 100 : 0,
    createdAt: new Date().toISOString(),
  }

  const db = await getDb()
  await db.collection("projects").insertOne(project)

  return NextResponse.json(project, { status: 201 })
}


