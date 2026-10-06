import Dexie from 'dexie'

const db = new Dexie('ShellyDatabase')

db.version(1).stores({
  books: '++id, isbn, title, author, publishedDate, pages, publishingHouse, type, status, cover ',
  preferences: 'id, value',
  statuses: '++id, status',
  types: '++id, type',
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

  await db.statuses.bulkAdd([
    { status: 'toRead' },  
    { status: 'reading' },  
    { status: 'read' },  
    { status: 'abandoned' },  
    { status: 'paused' },  
  ])

  await db.types.bulkAdd([
    { type: 'ebook' },
    { type: 'audiobook' },
    { type: 'paperback' },
    { type: 'hardcover' },
    { type: 'pocket' },
    { type: 'collector' },
    { type: 'signed' },
  ])

  await db.books.bulkAdd([
    { 
      isbn: '9780544115552',
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      publishedDate: '2012/11/08',
      pages: 167,
      publishingHouse: 'HarperCollins',
      type: 'ebook',
      status: 'reading',
      cover: 'https://books.google.com/books/content?id=OlCHcjX0RT4C&printsec=frontcover&img=1&zoom=1&source=gbs_api'
    },
    { 
      isbn: '9780062289841',
      title: 'Divergent Movie Tie-in Edition',
      author: 'Veronica Roth',
      publishedDate: '2014/02/11',
      pages: 496,
      publishingHouse: 'Katherine Tegen Books',
      type: 'ebook',
      status: 'read',
      cover: 'https://books.google.com/books/content?id=rewjtQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'
    },
    { 
      isbn: '9780142424179',
      title: 'The Fault in Our Stars',
      author: 'John Green',
      publishedDate: '2014/04/08',
      pages: 338,
      publishingHouse: 'Penguin Books',
      type: 'ebook',
      status: 'reading',
      cover: 'https://books.google.com/books/content?id=QiLaCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
    },
    { 
      isbn: '9780606381826',
      title: 'Allegiant',
      author: 'Veronica Roth',
      publishedDate: '2016/02/16',
      pages: 346,
      publishingHouse: 'Turtleback Books',
      type: 'ebook',
      status: 'reading',
      cover: 'https://books.google.com/books/content?id=YOV6jwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'
    },
  ])

}

db.on('populate', populate)

export { db }
