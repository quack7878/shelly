import { db } from '../db'

const LANGUAGES = ['fr', 'en']
const TINTS = ['pink', 'green']
const APIS = ['googlebooks', 'openlibrary']

export async function save(id, value) {
  await db.preferences.update(id, { 'value': value })
}

export async function get(id) {
  const value = await db.preferences.get(id)
  return value.value
}

export function languages() {
  return LANGUAGES
}

export function tints() {
  return TINTS
}

export function apis() {
  return APIS
}
