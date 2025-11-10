'use server'

import type { ProjectStatus } from "@/lib/types"
import { getDb } from "@/lib/db"

const clamp = (value: number, min = 0, max = 100) => Math.min(max, Math.max(min, value))

export const recalcProjectProgress = async (projectId: string) => {
  const db = await getDb()
  const tasksCollection = db.collection("tasks")
  const projectsCollection = db.collection("projects")

  const tasks = await tasksCollection.find({ projectId }).toArray()

  let progress = 0
  if (tasks.length > 0) {
    const completed = tasks.filter((task) => task.isDone).length
    progress = Math.round((completed / tasks.length) * 100)
  }

  progress = clamp(progress)

  let status: ProjectStatus = "in-progress"
  if (progress >= 100) {
    status = "completed"
  }

  await projectsCollection.updateOne({ id: projectId }, { $set: { progress, status } })

  return { progress, status }
}


