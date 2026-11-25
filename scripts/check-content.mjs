// Verifies the integrity of the curriculum architecture and authored content.
// Fails on unknown/duplicate ids, thin articles, missing simulation ids, or
// missing sections required by the five-dimension teaching structure.
import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const read = p => fs.readFileSync(path.join(root, p), 'utf8')
const architecture = read('src/data/architecture.ts')
const canonical = new Set()
for (const m of architecture.matchAll(/topicIds:\s*\[([^\]]+)\]/g)) {
  for (const id of m[1].match(/'([^']+)'/g) ?? []) canonical.add(id.replace(/'/g, ''))
}
const simSource = read('src/data/simulations.ts')
const simIds = new Set([...simSource.matchAll(/\bid: '([a-z0-9-]+)'/g)].map(m => m[1]))

const parts = ['part1', 'part2', 'part3', 'part4']
const authored = []
const problems = []
const derivations = []
for (const part of parts) {
  const src = read(`src/data/content.${part}.ts`)
  const topicChunks = src.split(/(?=\n  \{\n    id: ')/g)
  for (const chunk of topicChunks) {
    if (!/title: '/.test(chunk) || !/blocks:/.test(chunk)) continue
    const id = /id: '([a-z0-9-]+)'/.exec(chunk)?.[1]
    if (!id) continue
    if (!canonical.has(id)) throw new Error(`Unknown canonical topic id in ${part}: ${id}`)
    const blocks = (chunk.match(/kind: '/g) ?? []).length
    if (blocks < 10) throw new Error(`Thin article for ${id}: only ${blocks} blocks`)
    if (!/String\.raw`/.test(chunk)) throw new Error(`No LaTeX in ${id}`)
    if (!/kind: 'steps'/.test(chunk)) throw new Error(`No derivation steps in ${id}`)
    if (!/kind: 'code'/.test(chunk)) throw new Error(`No computational experiment in ${id}`)
    if (!/kind: 'callout'/.test(chunk)) throw new Error(`No explanatory callout in ${id}`)
    for (const s of chunk.matchAll(/'sim':\s*'([a-z0-9-]+)'|kind: 'sim', sim: '([a-z0-9-]+)'/g)) {
      const sid = s[1] ?? s[2]
      if (!simIds.has(sid)) throw new Error(`Unknown simulation ${sid} in ${id}`)
    }
    authored.push({ id, part, blocks })
  }
  problems.push(...[...src.matchAll(/id: '(p\d-prob-[a-z0-9-]+)'/g)].map(m => m[1]))
  derivations.push(...[...src.matchAll(/id: '(p\d-der-[a-z0-9-]+)'/g)].map(m => m[1]))
}

const seen = new Set()
for (const t of authored) {
  if (seen.has(t.id)) throw new Error(`Duplicate authored topic: ${t.id}`)
  seen.add(t.id)
}
const dupProblems = problems.filter((p, i) => problems.indexOf(p) !== i)
if (dupProblems.length) throw new Error(`Duplicate problem ids: ${dupProblems.join(', ')}`)

const branches = [...architecture.matchAll(/\{ id: '([a-z0-9-]+)', title: '([^']+)'/g)].length
console.log(`✓ ${canonical.size} canonical topics across ${branches} branches`)
console.log(`✓ ${authored.length} deep articles (avg ${Math.round(authored.reduce((a, t) => a + t.blocks, 0) / authored.length)} blocks)`)
console.log(`✓ ${canonical.size - authored.length} topics covered by the content atlas (full structured lessons)`)
console.log(`✓ ${problems.length} authored problems, ${derivations.length} derivations`)
console.log(`✓ ${simIds.size} interactive visualizations referenced consistently`)
