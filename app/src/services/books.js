import { db } from '../db'
import { get } from './preferences'
import { Book } from '../models/Book'
import { getBookCoverBlob } from './covers.js'

export async function searchBooks(query) {
    const api = await get('api')
    const googleKey = await get('google_key')
    const books = []

    if (api == 'openlibrary') {
      return await searchOpenLibrary(query)
    }
    else if (api == 'googlebooks' && googleKey != '') {
      return await searchGoogleBooks(query, googleKey)
    }
    
}

async function searchOpenLibrary(query) {
    const url = new URL('/api/openlibrary', window.location.origin)
    url.searchParams.set('q', query)  

  const response = await fetch(url)
    .then(response => response.json())
    .catch(error => console.error('Error:', error))

  const books = await Promise.all(response.docs.map(mapOpenLibraryBook))

  return books
}

async function searchGoogleBooks(query, googleKey) {
  const url = new URL('/api/googlebooks', window.location.origin)
  url.searchParams.set('q', query)
  url.searchParams.set('key', googleKey)

  const response = await fetch(url)

    if (!response.ok) {
    throw new Error(
      `Google Books API error: ${response.status} ${response.statusText}`
    )
  }

  const data = await response.json()

  const books = await Promise.all(data.items.map(mapGoogleBook))

  return books
}

async function mapOpenLibraryBook(doc) {
  const workId = doc.key?.replace('/works/', '')
  const editionId = doc.edition_key?.[0]

  return new Book({    
    isbn: doc.isbn?.[0],
    title: doc.title ?? 'Untitled',
    author: doc.author_name?.join(', '),
    publishedDate: doc.first_publish_year ? new Date(`${doc.first_publish_year}-01-01`) : undefined,
    pages: doc.number_of_pages_median,
    publishingHouse: doc.publisher?.[0],
    cover: doc.cover_i ? await getBookCoverBlob(`https://covers.openlibrary.org/b/id/${doc.cover_i}-S.jpg`) : undefined,
  })

}

async function mapGoogleBook(book) {
  const info = book.volumeInfo ?? {}

  const isbn10 = info.industryIdentifiers?.find(
    identifier => identifier.type === 'ISBN_10'
  )?.identifier

  const isbn13 = info.industryIdentifiers?.find(
    identifier => identifier.type === 'ISBN_13'
  )?.identifier

  const authors = info.authors ?? undefined
  return new Book ({
   isbn: isbn13 ?? isbn10 ?? null,
   title: info.title ?? null,
   author: authors ? authors[0] : null,
   publishedDate: info.publishedDate ?? null,
   pages: info.pageCount ?? null,
   publishingDate: info.publisher ?? null,
   cover: await getBookCoverBlob(info.imageLinks?.thumbnail?.replace(/^http:/, 'https:')) ?? null,
  })
}

export async function saveBook(book) {

  await db.books.put({
    isbn: book.isbn,
    title: book.title,
    author: book.author,
    publishedDate: book.publishedDate,
    pages: book.pages,
    publishingHouse: book.publishingHouse,
    type: book.type,
    status: book.status,
    cover: book.cover,
  })

}

export async function getBooks() {
  const books =  await db.books.toArray()

  return books.map((book) => ({
    ...book,
    coverUrl: book.cover
      ? URL.createObjectURL(book.cover)
      : null
  }))
}

export async function getBook(id) {
  return db.books.get(id)
}
