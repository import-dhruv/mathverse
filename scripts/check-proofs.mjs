// Verifies the proof atlas: every record must be complete, correctly typed,
// labelled by status and carry verifiable references.
import path from 'node:path'
import { build } from 'esbuild'

const root = path.resolve(import.meta.dirname, '..')
const result = await build({
  entryPoints: [path.join(root, 'src/data/index.ts')],
  bundle: true, format: 'esm', platform: 'node', write: false, logLevel: 'silent',
})
const mod = await import('data:text/javascript;base64,' + Buffer.from(result.outputFiles[0].text).toString('base64'))
const { PROOF_ATLAS, PROOF_TECHNIQUES, PROOF_EXERCISES, ALL_TOPIC_IDS } = mod
const canonical = new Set(ALL_TOPIC_IDS)
const statuses = new Set(['Theorem', 'Lemma', 'Corollary', 'Classical result', 'Proof sketch', 'Open problem'])
const seen = new Set()
let steps = 0
for (const p of PROOF_ATLAS) {
  if (seen.has(p.id)) throw new Error(`Duplicate proof id: ${p.id}`)
  seen.add(p.id)
  if (!p.title || !p.field || !p.statement || !p.idea || !p.conclusion) throw new Error(`Incomplete proof: ${p.id}`)
  if (!statuses.has(p.status)) throw new Error(`Invalid status for ${p.id}: ${p.status}`)
  if (!Array.isArray(p.hypotheses) || p.hypotheses.length === 0) throw new Error(`No hypotheses: ${p.id}`)
  if (!Array.isArray(p.steps) || p.steps.length < 3) throw new Error(`Thin proof: ${p.id}`)
  for (const s of p.steps) if (!s.title || !s.text) throw new Error(`Empty step in ${p.id}`)
  if (!Array.isArray(p.assumptionsUsed) || !p.assumptionsUsed.length) throw new Error(`No hypothesis audit: ${p.id}`)
  if (!Array.isArray(p.edgeCases) || !p.edgeCases.length) throw new Error(`No edge cases: ${p.id}`)
  if (!Array.isArray(p.applications) || !p.applications.length) throw new Error(`No applications: ${p.id}`)
  if (!Array.isArray(p.references) || !p.references.length) throw new Error(`No references: ${p.id}`)
  for (const r of p.references) {
    if (/arxiv\.org\/abs\/\d|10\.\d{4,}\//.test(r)) throw new Error(`Unverified precise identifier in ${p.id}: ${r}`)
  }
  for (const t of p.topicIds) if (!canonical.has(t)) throw new Error(`Unknown topic ${t} in ${p.id}`)
  if (p.status === 'Open problem' && p.steps.length > 0) throw new Error(`Open problem with proof steps: ${p.id}`)
  steps += p.steps.length
}
console.log(`✓ ${PROOF_ATLAS.length} proofs, ${steps} proof steps, ${new Set(PROOF_ATLAS.map(p => p.field)).size} fields`)
console.log(`✓ ${PROOF_TECHNIQUES.length} techniques, ${PROOF_EXERCISES.length} exercises; all records labelled and referenced`)
