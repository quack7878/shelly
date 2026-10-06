import { db } from '../db'

export async function getStatuses() {
  return await db.statuses.toArray()
}
