import { db } from '../db'
import { get } from './preferences'

export async function getBookCoverBlob(
  coverUrl
) {
  const api = await get('api')

  const url = new URL(`/api/cover/${api}`, window.location.origin)
  url.searchParams.set('url', coverUrl)

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to download cover: ${response.status}`)
  }

  const blob = await response.blob()

  return blob
}
