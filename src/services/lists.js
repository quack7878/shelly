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

export async function getBooksNotInList(listId) {
  const inList = new Set(
    await db.booksList.where('listId').equals(listId).keys()
  )

  const booksNotInList = await db.books
    .filter(book => !inList.has(book.id))
    .toArray()

  return booksNotInList

}

export async function getBooksByList(listId) {
  const rows = await db.booksList
    .where('listId')
    .equals(listId)
    .toArray()

  const bookIds = rows.map(row => row.bookId)
  return (await db.books.bulkGet(bookIds)).filter(Boolean)
}

export async function addBooksList(listId, bookIds) {
  if (!bookIds.length) return

  await db.booksList.bulkAdd(
    bookIds.map(bookId => ({ listId, bookId }))
  )
}

