import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json(
      { error: 'Missing “url” query parameter' },
      { status: 400 }
    )
  }

  // Fetch the remote PDF on the server (no CORS problem here)
  const res = await fetch(url)
  if (!res.ok) {
    return NextResponse.json(
      { error: `Failed to fetch PDF (${res.status})` },
      { status: res.status }
    )
  }

  // Read the data as an ArrayBuffer
  const arrayBuffer = await res.arrayBuffer()

  // Proxy it back to the client with CORS headers
  return new NextResponse(arrayBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Access-Control-Allow-Origin': '*', // allow your frontend to load it
      'Access-Control-Allow-Methods': 'GET,OPTIONS',
    },
  })
}
