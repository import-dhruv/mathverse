// Live search over Crossref — the DOI registry for publisher-issued research.
const cache = new Map()
const TTL = 10 * 60 * 1000

const plain = s => (Array.isArray(s) ? s[0] : s ?? '').replace(/<[^>]+>/g, ' ').trim()

function normalize(item) {
  return {
    id: item.DOI ?? item.URL,
    title: plain(item.title) || 'Untitled',
    year: item.published?.['date-parts']?.[0]?.[0] ?? item.issued?.['date-parts']?.[0]?.[0] ?? null,
    authors: (item.author ?? []).slice(0, 8).map(a => [a.given, a.family].filter(Boolean).join(' ')).filter(Boolean),
    venue: plain(item['container-title']),
    citedBy: item['is-referenced-by-count'] ?? 0,
    abstract: plain(item.abstract).slice(0, 900),
    doi: item.DOI ?? null,
    landingUrl: item.URL ?? (item.DOI ? `https://doi.org/${item.DOI}` : '#'),
    oaUrl: null,
    isOa: false,
    type: item.type ?? null,
  }
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=3600')
  const q = String(req.query.q ?? '').trim()
  if (!q) return res.status(400).json({ error: 'A search query is required.' })
  const rows = Math.min(25, Math.max(1, Number(req.query.rows) || 10))
  const offset = Math.max(0, Number(req.query.offset) || 0)
  const year = Number(req.query.year) || 0

  const url = new URL('https://api.crossref.org/works')
  url.searchParams.set('query', q)
  url.searchParams.set('rows', String(rows))
  url.searchParams.set('offset', String(offset))
  url.searchParams.set('select', 'DOI,title,author,published,issued,container-title,is-referenced-by-count,URL,abstract,type')
  if (year) url.searchParams.set('filter', `from-pub-date:${year}-01-01`)

  try {
    const key = url.toString()
    const hit = cache.get(key)
    let data
    if (hit && Date.now() - hit.at < TTL) data = hit.data
    else {
      const upstream = await fetch(key, {
        headers: { Accept: 'application/json', 'User-Agent': 'MATHVERSE/1.0 (https://mathverse-chi.vercel.app; educational research library)' },
      })
      if (!upstream.ok) throw new Error(`Crossref returned ${upstream.status}`)
      data = await upstream.json()
      cache.set(key, { at: Date.now(), data })
      if (cache.size > 120) cache.delete(cache.keys().next().value)
    }
    return res.status(200).json({
      source: 'Crossref',
      total: data.message?.['total-results'] ?? 0,
      nextOffset: offset + rows,
      papers: (data.message?.items ?? []).map(normalize),
    })
  } catch (err) {
    return res.status(502).json({ error: 'The DOI registry is temporarily unavailable.', detail: String(err.message ?? err) })
  }
}
