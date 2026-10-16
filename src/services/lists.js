import { db } from '../db'
import { List } from '../models/List'

export async function getLists() {
  return await db.lists.orderBy('position').toArray()
}

export async function saveList(list) {
  const lists = await getLists()
  const position = lists.length + 1

  await db.lists.put({
    name: list.name,
    position: position,
  })
}

export async function updateByPositions(lists) {
  await Promise.all(
    lists.map((list, index) =>
      db.lists.update(list.id, { position: index + 1 })
    )
  )
}

