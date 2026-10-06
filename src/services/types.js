import { db } from '../db'

export async function getTypes() {
  return await db.types.toArray()
}
