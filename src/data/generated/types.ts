import type { Level } from '../../lib/types'

export interface GeneratedProblem {
  id: string
  familyId: string
  index: number
  title: string
  topicId: string
  level: Level
  type: string
  statement: string
  hints: string[]
  answer: string
  solution: { title: string; text: string; math?: string }[]
}

export interface GeneratedFamily {
  id: string
  title: string
  topicId: string
  level: Level
  type: string
  concepts: string[]
  make: (i: number) => Omit<GeneratedProblem, 'id' | 'familyId' | 'index' | 'title' | 'topicId' | 'level' | 'type'>
}
