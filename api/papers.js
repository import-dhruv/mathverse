// Live search over OpenAlex — a global index of 250M+ scholarly works.
// Returns normalized records; full text access depends on each publisher.
const cache = new Map()
const TTL = 10 * 60 * 1000

function normalize(w) {
  const inv = w.abstract_inverted_index
  let abstract = ''
  if (inv) {
    const words = []
    for (const [word, positions] of Object.entries(inv)) for (const pos of positions) words[pos] = word
    abstract = words.filter(Boolean).join(' ')
  }
  const authors = (w.authorships ?? []).slice(0, 8).map(a => a.author?.display_name).filter(Boolean)
  const loc = w.primary_location ?? {}
  return {
    id: w.doi ?? w.id,
    title: w.title ?? w.display_name ?? 'Untitled',
    year: w.publication_year ?? null,
    authors,
    venue: loc.source?.display_name ?? null,
    citedBy: w.cited_by_count ?? 0,
    abstract: abstract.slice(0, 900),
    doi: w.doi ?? null,
    landingUrl: loc.landing_page_url ?? w.doi ?? w.id,
    oaUrl: w.open_access?.oa_url ?? null,
    isOa: Boolean(w.open_access?.is_oa),
    type: w.type ?? null,
  }
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=3600')
  const q = String(req.query.q ?? '').trim()
  if (!q) return res.status(400).json({ error: 'A search query is required.' })

  const perPage = Math.min(25, Math.max(1, Number(req.query.perPage) || 10))
  const cursor = String(req.query.cursor ?? '*')
  const year = Number(req.query.year) || 0
  const oaOnly = String(req.query.oaOnly) === 'true'
  const sort = ['relevance_score:desc', 'cited_by_count:desc', 'publication_date:desc']
    .includes(String(req.query.sort)) ? String(req.query.sort) : 'relevance_score:desc'

  const filters = []
  if (year) filters.push(`from_publication_date:${year}-01-01`)
  if (oaOnly) filters.push('open_access.is_oa:true')

  const url = new URL('https://api.openalex.org/works')
  url.searchParams.set('search', q)
  url.searchParams.set('per-page', String(perPage))
  url.searchParams.set('cursor', cursor)
  url.searchParams.set('sort', sort)
  url.searchParams.set('select', 'id,doi,title,publication_year,authorships,primary_location,open_access,cited_by_count,abstract_inverted_index,type')
  if (filters.length) url.searchParams.set('filter', filters.join(','))

  try {
    const key = url.toString()
    const hit = cache.get(key)
    let data
    if (hit && Date.now() - hit.at < TTL) data = hit.data
    else {
      const upstream = await fetch(key, { headers: { Accept: 'application/json' } })
      if (!upstream.ok) throw new Error(`OpenAlex returned ${upstream.status}`)
      data = await upstream.json()
      cache.set(key, { at: Date.now(), data })
      if (cache.size > 120) cache.delete(cache.keys().next().value)
    }
    return res.status(200).json({
      source: 'OpenAlex',
      total: data.meta?.count ?? 0,
      nextCursor: data.meta?.next_cursor ?? null,
      papers: (data.results ?? []).map(normalize),
    })
  } catch (err) {
    return res.status(502).json({ error: 'The global paper index is temporarily unavailable.', detail: String(err.message ?? err) })
  }
}
