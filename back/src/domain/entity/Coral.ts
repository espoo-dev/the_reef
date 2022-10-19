export type Light = 'low' | 'medium' | 'high'
export type Flow = 'weak' | 'medium' | 'strong'
export type Depth = 'shallow' | 'medium'| 'deep' | 'indiferent'
export type Difficulty = 'To newbies' | 'Need more careful' | 'Only experients aquarists'

export class Coral {
  constructor (
    readonly name: string,
    readonly light: Light[] | Light,
    readonly flow: Flow[] | Flow,
    readonly depth: Depth[] | Depth,
    readonly difficulty: Difficulty
  ) {
  }
}