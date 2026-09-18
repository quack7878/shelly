import { db } from '../db'

export async function getBookCoverBlob(
  coverUrl
) {
  const response = await fetch(coverUrl)

  if (!response.ok) {
    throw new Error(`Failed to download cover: ${response.status}`)
  }

  const blob = await response.blob()

  return blob
}
