import { db } from '../db'

export async function getBookCoverBlob(
  coverUrl
) {
  const url = new URL('/api/cover/googlebooks', window.location.origin)
  url.searchParams.set('url', coverUrl)

  const response = await fetch(url)
  console.log(response)

  if (!response.ok) {
    throw new Error(`Failed to download cover: ${response.status}`)
  }

  const blob = await response.blob()

  return blob
}
