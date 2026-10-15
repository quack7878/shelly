import { db } from '../db'
import { List } from '../models/List'

export async function getLists() {
  return await db.lists.toArray()
}

export async function saveList(list) {

  const lists = await getLists()
  const position = lists.length + 1

  await db.lists.put({
    name: list.name,
    position: position,
  })

}
