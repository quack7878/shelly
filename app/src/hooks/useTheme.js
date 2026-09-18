import { useState } from 'react'

export function useTheme(id, value) {

  export async function save(id, value) {
    await db.preferences.update(id, { 'value': value })
  }

  export async function get(id) {
    const value = await db.preferences.get(id)
    return value.value
  }

}
