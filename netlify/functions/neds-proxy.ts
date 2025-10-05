// netlify/functions/neds-proxy.ts
import type { Handler } from '@netlify/functions'

const CORS = (origin?: string) => ({
  'access-control-allow-origin': origin ?? 'paul-entain.netlify.app',
  'access-control-allow-methods': 'GET, OPTIONS',
  'access-control-allow-headers': 'Content-Type',
})

export const handler: Handler = async (event) => {
  const origin = event.headers.origin

  // Preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS(origin) }
  }

  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, headers: CORS(origin), body: 'Method Not Allowed' }
  }

  // Whitelist + sanitize inputs
  const countRaw = event.queryStringParameters?.count ?? '50'
  const count = Math.max(1, Math.min(parseInt(countRaw, 10) || 50, 50))

  const url = `https://api.neds.com.au/rest/v1/racing/?method=nextraces&count=${count}`

  try {
    const upstream = await fetch(url, { headers: { 'accept': 'application/json' } })
    const text = await upstream.text()

    return {
      statusCode: upstream.status,
      headers: {
        ...CORS(origin),
        'content-type': 'application/json',
        'cache-control': 'public, max-age=10', // small CDN/browser cache
      },
      body: text,
    }
  } catch (err: any) {
    return {
      statusCode: 502,
      headers: CORS(origin),
      body: JSON.stringify({ error: 'Upstream fetch failed', message: err?.message }),
    }
  }
}
