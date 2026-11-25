import {
  Sigma, Variable, FunctionSquare, Triangle, Circle, TrendingUp, Compass,
  Layers, Grid3x3, Braces, Dices, ChartColumn, Boxes, Hash, Activity, Infinity as InfinityIcon,
  Orbit, Waves, GitBranch, Calculator, Mountain, Binary, Network, Users, Atom, Cog,
  BrainCircuit, TrendingDown, HeartPulse, Scale, Telescope, Sparkles,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const ICONS: Record<string, LucideIcon> = {
  sigma: Sigma, variable: Variable, 'function-square': FunctionSquare, triangle: Triangle,
  circle: Circle, 'trending-up': TrendingUp, integral: FunctionSquare, compass: Compass,
  layers: Layers, 'grid-3x3': Grid3x3, braces: Braces, dices: Dices, 'chart-column': ChartColumn,
  boxes: Boxes, hash: Hash, activity: Activity, infinity: InfinityIcon, orbit: Orbit, waves: Waves,
  'git-branch': GitBranch, calculator: Calculator, mountain: Mountain, binary: Binary,
  network: Network, users: Users, atom: Atom, cog: Cog, 'brain-circuit': BrainCircuit,
  'trending-down': TrendingDown, 'heart-pulse': HeartPulse, scale: Scale, telescope: Telescope,
  sparkles: Sparkles,
}

export function BranchIcon({ name, size = 17 }: { name: string; size?: number }) {
  const Icon = ICONS[name] ?? Sigma
  return <Icon size={size} />
}
