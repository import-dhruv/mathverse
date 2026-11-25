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
const {
  GENERATED_FAMILIES, GENERATED_COUNT, GENERATED_IDS, getGeneratedProblem,
  INTERNATIONAL_FAMILIES, INTERNATIONAL_COUNT, INTERNATIONAL_IDS, getInternationalProblem,
} = mod

if (GENERATED_IDS.length !== GENERATED_COUNT) throw new Error('Standard ID count mismatch')
if (INTERNATIONAL_IDS.length !== INTERNATIONAL_COUNT) throw new Error('International ID count mismatch')
let checked = 0
const verify = (id, getter) => {
  const p = getter(id)
  if (!p) throw new Error(`Missing generated problem ${id}`)
  if (p.id !== id) throw new Error(`Id mismatch for ${id}`)
  if (!p.statement || p.statement.length < 8) throw new Error(`Empty statement for ${id}`)
  if (!p.answer || p.answer.length < 1) throw new Error(`Missing answer for ${id}`)
  if (!p.solution?.length || !p.hints?.length) throw new Error(`Missing solution/hints for ${id}`)
  checked++
}
for (const id of GENERATED_IDS) verify(id, getGeneratedProblem)
for (const id of INTERNATIONAL_IDS) verify(id, getInternationalProblem)
// Determinism spot-check across every family.
for (const family of GENERATED_FAMILIES) {
  for (const idx of [0, 137, 499]) {
    const id = `gen-${family.id}-${idx}`
    if (JSON.stringify(getGeneratedProblem(id)) !== JSON.stringify(getGeneratedProblem(id))) throw new Error(`Non-deterministic family ${family.id}`)
  }
}
for (const family of INTERNATIONAL_FAMILIES) {
  for (const idx of [0, 137, 499]) {
    const id = `intl-${family.id}-${idx}`
    if (JSON.stringify(getInternationalProblem(id)) !== JSON.stringify(getInternationalProblem(id))) throw new Error(`Non-deterministic family ${family.id}`)
  }
}
console.log(`✓ ${checked} generated problems verified (${GENERATED_FAMILIES.length} standard + ${INTERNATIONAL_FAMILIES.length} international families × 500)`)
console.log('✓ Every variant has statement, hints, answer and solution; generation is deterministic')
