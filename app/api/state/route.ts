import { NextResponse } from "next/server"

import { getDb } from "@/lib/db"
import { stripMongoId } from "@/lib/server/serialise"

export async function GET() {
  const db = await getDb()

  const [projects, tasks, team] = await Promise.all([
    db.collection("projects").find().toArray(),
    db.collection("tasks").find().toArray(),
    db.collection("team").find().toArray(),
  ])

  return NextResponse.json({
    projects: projects.map(stripMongoId),
    tasks: tasks.map(stripMongoId),
    team: team.map(stripMongoId),
  })
}


