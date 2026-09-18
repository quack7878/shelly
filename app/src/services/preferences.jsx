import { db } from '../db'

export async function save(id, value) {
  await db.preferences.update(id, { 'value': value })
}

export async function get(id) {
  const value = await db.preferences.get(id)
  return value.value
}
