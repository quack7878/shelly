import { db } from '../db'
import { get } from './preferences'

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
    const url = new URL("https://openlibrary.org/search.json")
    url.searchParams.set("q", query);  
    url.searchParams.set("limit", "10");  
    url.searchParams.set("fields", [ "title", "author_name", "isbn", "cover_i", "number_of_pages_median", "first_publish_year", "publisher", "key", "edition_key", "first_sentence"].join(","))

  const response = await fetch(url)
    .then(response => response.json())
    .catch(error => console.error('Error:', error))

  const books = response.docs.map(mapOpenLibraryBook)

  return books
}

async function searchGoogleBooks(query, googleKey) {
  const url = new URL("https://www.googleapis.com/books/v1/volumes")

  url.searchParams.set("q", query)
  url.searchParams.set("maxResults", "10")
  url.searchParams.set("key", googleKey)

  url.searchParams.set(
    "fields",
    "items(id,volumeInfo(title,authors,industryIdentifiers,imageLinks,pageCount,publishedDate,publisher,description,previewLink,infoLink))"
  )

  const response = await fetch(url)

    if (!response.ok) {
    throw new Error(
      `Google Books API error: ${response.status} ${response.statusText}`
    )
  }

  const data = await response.json()

  return (data.items ?? []).map(mapGoogleBook)
}

function mapOpenLibraryBook(doc) {
  const workId = doc.key?.replace("/works/", "")
  const editionId = doc.edition_key?.[0]

  return {    
    isbn: doc.isbn?.[0],
    title: doc.title ?? "Untitled",
    coverUrl: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-S.jpg` : undefined,
    pages: doc.number_of_pages_median,
    author: doc.author_name?.join(", "),
    publishedDate: doc.first_publish_year ? new Date(`${doc.first_publish_year}-01-01`) : undefined,
    publishingHouse: doc.publisher?.[0],
    openLibraryWorkId: workId,
    openLibraryEditionId: editionId,
  }

}

function mapGoogleBook(book) {
  const info = book.volumeInfo ?? {}

  const isbn10 = info.industryIdentifiers?.find(
    identifier => identifier.type === "ISBN_10"
  )?.identifier

  const isbn13 = info.industryIdentifiers?.find(
    identifier => identifier.type === "ISBN_13"
  )?.identifier

  const authors = info.authors ?? undefined
  return {
    id: book.id,
    title: info.title ?? null,
    author: authors ? authors[0] : null,
    isbn: isbn13 ?? isbn10 ?? null,
    coverUrl: info.imageLinks?.thumbnail?.replace(/^http:/, "https:") ?? null,
    pages: info.pageCount ?? null,
    publicationDate: info.publishedDate ?? null,
    publishingHouse: info.publisher ?? null,
    description: info.description ?? null,
    previewLink: info.previewLink ?? null,
    infoLink: info.infoLink ?? null
  }
}

export async function saveBook(
  id,
  title,
  isbn,
  pages,
  type,
  author,
  publicationDate,
  publishingHouse,
  openLibraryWorkId,
  openLibraryEditionId,
) {

  await db.books.put({
  id,
  isbn,
  title,
  pages,
  type,
  author,
  publicationDate,
  publishingHouse,
  openLibraryWorkId,
  openLibraryEditionId,
  })
}

export async function getBook(id) {
  return db.books.get(id)
}
