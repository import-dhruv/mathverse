// Direct-first live paper search. Both OpenAlex and Crossref expose permissive
// CORS headers, so the browser can query them with the visitor's own rate
// budget. The MATHVERSE serverless proxies are used only as a fallback.
export type PaperRecord = {
  id: string
  title: string
  year: number | null
  authors: string[]
  venue: string | null
  citedBy: number
  abstract: string
  doi: string | null
  landingUrl: string
  oaUrl: string | null
  isOa: boolean
  type: string | null
}
export type PaperResult = {
  source: string
  total: number
  papers: PaperRecord[]
  nextCursor?: string | null
  nextOffset?: number
}

const OA_SELECT = 'id,doi,title,publication_year,authorships,primary_location,open_access,cited_by_count,abstract_inverted_index,type'
const CR_SELECT = 'DOI,title,author,published,issued,container-title,is-referenced-by-count,URL,abstract,type'

function normalizeOpenAlex(w: any): PaperRecord {
  const inv = w.abstract_inverted_index
  const words: string[] = []
  if (inv) for (const [word, positions] of Object.entries(inv)) for (const pos of positions as number[]) words[pos] = word as string
  const loc = w.primary_location ?? {}
  return {
    id: w.doi ?? w.id,
    title: w.title ?? w.display_name ?? 'Untitled',
    year: w.publication_year ?? null,
    authors: (w.authorships ?? []).slice(0, 8).map((a: any) => a.author?.display_name).filter(Boolean),
    venue: loc.source?.display_name ?? null,
    citedBy: w.cited_by_count ?? 0,
    abstract: words.filter(Boolean).join(' ').slice(0, 900),
    doi: w.doi ?? null,
    landingUrl: loc.landing_page_url ?? w.doi ?? w.id,
    oaUrl: w.open_access?.oa_url ?? null,
    isOa: Boolean(w.open_access?.is_oa),
    type: w.type ?? null,
  }
}
const plain = (s: any) => (Array.isArray(s) ? s[0] : s ?? '').toString().replace(/<[^>]+>/g, ' ').trim()
function normalizeCrossref(x: any): PaperRecord {
  return {
    id: x.DOI ?? x.URL,
    title: plain(x.title) || 'Untitled',
    year: x.published?.['date-parts']?.[0]?.[0] ?? x.issued?.['date-parts']?.[0]?.[0] ?? null,
    authors: (x.author ?? []).slice(0, 8).map((a: any) => [a.given, a.family].filter(Boolean).join(' ')).filter(Boolean),
    venue: plain(x['container-title']),
    citedBy: x['is-referenced-by-count'] ?? 0,
    abstract: plain(x.abstract).slice(0, 900),
    doi: x.DOI ?? null,
    landingUrl: x.URL ?? (x.DOI ? `https://doi.org/${x.DOI}` : '#'),
    oaUrl: null, isOa: false, type: x.type ?? null,
  }
}

export async function searchPapers(
  source: 'openalex' | 'crossref',
  opts: { query: string; year: string; oaOnly: boolean; sort: string; cursor: string; page: number; perPage: number },
): Promise<PaperResult> {
  const { query, year, oaOnly, sort, cursor, page, perPage } = opts
  const proxy = new URLSearchParams({ q: query, perPage: String(perPage) })
  if (year) proxy.set('year', year)

  let primary: string
  if (source === 'openalex') {
    const p = new URLSearchParams({ search: query, 'per-page': String(perPage), cursor, sort, select: OA_SELECT })
    const filters: string[] = []
    if (year) filters.push(`from_publication_date:${year}-01-01`)
    if (oaOnly) filters.push('open_access.is_oa:true')
    if (filters.length) p.set('filter', filters.join(','))
    primary = `https://api.openalex.org/works?${p}`
    proxy.set('cursor', cursor); proxy.set('sort', sort)
    if (oaOnly) proxy.set('oaOnly', 'true')
  } else {
    const p = new URLSearchParams({ query, rows: String(perPage), offset: String(page * perPage), select: CR_SELECT })
    if (year) p.set('filter', `from-pub-date:${year}-01-01`)
    primary = `https://api.crossref.org/works?${p}`
    proxy.set('offset', String(page * perPage))
  }

  const urls = [primary, `/api/${source === 'openalex' ? 'papers' : 'crossref'}?${proxy}`]
  let lastError = ''
  for (const url of urls) {
    try {
      const res = await fetch(url, { headers: { Accept: 'application/json' } })
      if (!res.ok) { lastError = `Index returned ${res.status}`; continue }
      const data = await res.json()
      if (source === 'openalex') {
        if (data.error) { lastError = data.error; continue }
        return { source: 'OpenAlex', total: data.meta?.count ?? 0,
          nextCursor: data.meta?.next_cursor ?? null, papers: (data.results ?? []).map(normalizeOpenAlex) }
      }
      if (data.error) { lastError = data.error; continue }
      return { source: 'Crossref', total: data.message?.['total-results'] ?? 0,
        nextOffset: page * perPage + perPage, papers: (data.message?.items ?? []).map(normalizeCrossref) }
    } catch (e) { lastError = e instanceof Error ? e.message : 'Network error' }
  }
  throw new Error(lastError || 'Both the direct index and the MATHVERSE proxy are unavailable.')
}
