import { NextResponse } from "next/server"

import { getDb } from "@/lib/db"
import { createId } from "@/lib/id"
import type { TeamMember } from "@/lib/types"
import { stripMongoId } from "@/lib/server/serialise"

export async function GET() {
  const db = await getDb()
  const team = await db.collection("team").find().toArray()
  return NextResponse.json(team.map(stripMongoId))
}

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null)

  if (!payload || typeof payload.name !== "string") {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }

  const name = payload.name.trim()
  if (!name) {
    return NextResponse.json({ error: "Team member name is required" }, { status: 400 })
  }

  const capacityValue =
    typeof payload.capacity === "number" && Number.isFinite(payload.capacity)
      ? Math.max(0, Math.round(payload.capacity))
      : 0

  const member: TeamMember = {
    id: createId("member"),
    name,
    role:
      typeof payload.role === "string" && payload.role.trim().length ? payload.role.trim() : undefined,
    capacity: capacityValue,
  }

  const db = await getDb()
  await db.collection("team").insertOne(member)

  return NextResponse.json(member, { status: 201 })
}


