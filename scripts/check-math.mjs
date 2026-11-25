// Structural LaTeX validation across all authored content.
// Checks balanced braces / dollar delimiters and matched \begin...\end
// environments. This is a syntactic check, not a mathematical proof checker.
import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const files = []
const walk = dir => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p)
    else if (e.name.endsWith('.ts') || e.name.endsWith('.tsx')) files.push(p)
  }
}
walk(path.join(root, 'src'))
let checked = 0
const errors = []
for (const file of files) {
  const src = fs.readFileSync(file, 'utf8')
  const candidates = [...src.matchAll(/String\.raw`([\s\S]*?)`/g)].map(m => m[1])
    .concat([...src.matchAll(/latex:\s*'([^']*)'/g)].map(m => m[1]))
    .concat([...src.matchAll(/latex:\s*String\.raw`([\s\S]*?)`/g)].map(m => m[1]))
  for (const tex of new Set(candidates)) {
    if (!tex.trim()) continue
    checked++
    const label = path.relative(root, file)
    let depth = 0
    for (const ch of tex) { if (ch === '{') depth++; else if (ch === '}') depth--; if (depth < 0) break }
    if (depth !== 0) errors.push(`${label}: unbalanced braces in ${JSON.stringify(tex.slice(0, 70))}`)
    const dollars = (tex.match(/(?<!\\)\$/g) ?? []).length
    if (dollars % 2 !== 0) errors.push(`${label}: unbalanced $ delimiters in ${JSON.stringify(tex.slice(0, 70))}`)
    const begins = [...tex.matchAll(/\\begin\{([a-zA-Z]+)\}/g)].map(m => m[1])
    const ends = [...tex.matchAll(/\\end\{([a-zA-Z]+)\}/g)].map(m => m[1])
    if (begins.length !== ends.length || begins.some((b, i) => b !== ends[i])) {
      errors.push(`${label}: mismatched \\begin/\\end in ${JSON.stringify(tex.slice(0, 70))}`)
    }
  }
}
if (errors.length) {
  console.error(errors.slice(0, 20).join('\n'))
  console.error(`\n${errors.length} LaTeX structural errors`)
  process.exit(1)
}
console.log(`✓ ${checked} LaTeX expressions structurally valid (braces, delimiters, environments)`)
console.log('Note: structural validation does not prove mathematical correctness; derivations are authored and reviewed separately.')
