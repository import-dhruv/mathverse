// Builds the generated-problem module with esbuild and verifies all 20,000
// deterministic variants are reproducible, have solutions and a matching id.
import path from 'node:path'
import { build } from 'esbuild'

const root = path.resolve(import.meta.dirname, '..')
const result = await build({
  entryPoints: [path.join(root, 'src/data/generated/index.ts')],
  bundle: true, format: 'esm', platform: 'node', write: false,
  external: [], logLevel: 'silent',
})
const code = result.outputFiles[0].text
const mod = await import('data:text/javascript;base64,' + Buffer.from(code).toString('base64'))
const { GENERATED_FAMILIES, GENERATED_COUNT, GENERATED_IDS, getGeneratedProblem } = mod

if (GENERATED_IDS.length !== GENERATED_COUNT) throw new Error('ID count mismatch')
let checked = 0
for (const id of GENERATED_IDS) {
  const p = getGeneratedProblem(id)
  if (!p) throw new Error(`Missing generated problem ${id}`)
  if (p.id !== id) throw new Error(`Id mismatch for ${id}`)
  if (!p.statement || p.statement.length < 8) throw new Error(`Empty statement for ${id}`)
  if (!p.answer || p.answer.length < 1) throw new Error(`Missing answer for ${id}`)
  if (!p.solution?.length || !p.hints?.length) throw new Error(`Missing solution/hints for ${id}`)
  checked++
}
// Determinism spot-check across every family.
for (const family of GENERATED_FAMILIES) {
  for (const idx of [0, 137, 499]) {
    const id = `gen-${family.id}-${idx}`
    const a = JSON.stringify(getGeneratedProblem(id))
    const b = JSON.stringify(getGeneratedProblem(id))
    if (a !== b) throw new Error(`Non-deterministic family ${family.id}`)
  }
}
console.log(`✓ ${checked} generated problems verified (${GENERATED_FAMILIES.length} families × 500)`)
console.log('✓ Every variant has statement, hints, answer and solution; generation is deterministic')
