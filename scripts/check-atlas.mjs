// Verifies that every canonical topic resolves to a complete first-principles
// lesson, not an empty or thin page.
import path from 'node:path'
import { build } from 'esbuild'

const root = path.resolve(import.meta.dirname, '..')
const result = await build({
  entryPoints: [path.join(root, 'src/data/index.ts')],
  bundle: true, format: 'esm', platform: 'node', write: false, logLevel: 'silent',
})
const mod = await import('data:text/javascript;base64,' + Buffer.from(result.outputFiles[0].text).toString('base64'))
const { ALL_TOPICS, ALL_TOPIC_IDS, STATS } = mod
const required = [
  'why this topic exists', 'what you will be able to do', 'prerequisites and logical order',
  'intuitive understanding', 'visual and geometric understanding', 'definition and notation',
  'mathematical formulation', 'derivation from first principles', 'theorems and proof structure',
  'worked example', 'real-world applications', 'common mistakes',
  'conceptual questions', 'practice and further reading',
]
if (ALL_TOPICS.length !== ALL_TOPIC_IDS.length) throw new Error('Topic count mismatch with architecture')
let blocks = 0
for (const t of ALL_TOPICS) {
  if (t.status !== 'Complete') throw new Error(`${t.id} is not a complete lesson`)
  const atlasBuilt = t.tags.includes('first-principles lesson')
  if (t.blocks.length < (atlasBuilt ? 20 : 10)) throw new Error(`Thin lesson: ${t.id} (${t.blocks.length} blocks)`)
  if (atlasBuilt) {
    const headings = t.blocks.filter(b => b.kind === 'heading').map(b => b.text.toLowerCase())
    for (const section of required) {
      if (!headings.some(h => h.includes(section))) throw new Error(`${t.id} missing section: ${section}`)
    }
  }
  for (const kind of ['steps', 'code', 'math', 'callout']) {
    if (!t.blocks.some(b => b.kind === kind)) throw new Error(`${t.id} missing ${kind} block`)
  }
  blocks += t.blocks.length
}
console.log(`✓ ${ALL_TOPICS.length} topics are complete lessons, ${blocks} structured blocks total`)
console.log(`✓ ${STATS.authoredEssays} hand-authored essays + ${ALL_TOPICS.length - STATS.authoredEssays} atlas-built lessons`)
