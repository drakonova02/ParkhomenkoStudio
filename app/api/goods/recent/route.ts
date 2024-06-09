import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { getDbAndReqBody, getRecentBlog } from '@/lib/utils/api-routes'

export async function GET() {
  const { db } = await getDbAndReqBody(clientPromise, null)

  return NextResponse.json(await getRecentBlog(db))
}
