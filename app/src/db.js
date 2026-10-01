import Dexie from 'dexie'

const db = new Dexie('ShellyDatabase')

db.version(1).stores({
  books: '++id, isbn, title, author, publishedDate, pages, publishingHouse, type, status, cover ',
  preferences: 'id, value',
  status: '++id, status',
  type: '++id, type',
})

export async function populate() {
  await db.preferences.add({
    id: 'tint',
    value: 'GREEN'
  })

  await db.preferences.add({
    id: 'mode',
    value: 'light',
  })

  await db.preferences.add({
    id: 'language',
    value: 'en',
  })

  await db.preferences.add({
    id: 'api',
    value: 'openlibrary',
  })

  await db.preferences.add({
    id: 'google_key',
    value: '',
  })

  await db.status.bulkAdd([
    { status: 'toRead' },  
    { status: 'reading' },  
    { status: 'read' },  
    { status: 'abandoned' },  
    { status: 'paused' },  
  ])

  await db.type.bulkAdd([
    { type: 'ebook' },
    { type: 'audiobook' },
    { type: 'paperback' },
    { type: 'hardcover' },
    { type: 'pocket' },
    { type: 'collector' },
    { type: 'signed' },
  ])

}

db.on('populate', populate)

export { db }
