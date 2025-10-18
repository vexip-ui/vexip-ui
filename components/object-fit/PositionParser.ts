/* ========================= Basic types ========================= */
export type HorKey = 'left' | 'center' | 'right'
export type VertKey = 'top' | 'center' | 'bottom'
export type Key = HorKey | VertKey

export type Unit = 'px' | 'em' | 'rem' | 'ch' | 'cm' | 'mm' | 'in' | 'pt' | 'pc'
export type Length = { type: 'length', value: number, unit: Unit }
export type Percent = { type: 'percent', value: number, unit: '%' }
export type LP = Length | Percent

/* ------- Double keywords: reverse writing allowed during input, normalized to x first ------- */
export type DoubleKeyInput = { x: HorKey, y: VertKey } | { x: VertKey, y: HorKey }

export type DoubleKeyNormalized = { x: HorKey, y: VertKey }

/* ===================== Unified AST (after normalization) =================== */
export type Position =
  | { type: 'single', x?: LP | HorKey, y?: LP | VertKey }
  | { type: 'double', x: HorKey | LP, y: VertKey | LP }
  | { type: 'edge', x: { key: HorKey, offset: LP }, y: { key: VertKey, offset: LP } }

/* ======================== Parser ============================ */
export default class PositionParser {
  private static readonly KEYWORDS: Key[] = ['left', 'center', 'right', 'top', 'bottom']
  private static tokenize(src: string): string[] {
    return src.split(/\s+/)
  }

  /* Main entry */
  static parse(input: string): Position {
    if (typeof input !== 'string') return { type: 'single', x: 'center', y: 'center' }
    const src = input.trim()
    if (!src) throw new Error('Empty input')
    const tokens = this.tokenize(src)

    // 1. Edge offset: left 10px top 20%
    if (tokens.length === 4) {
      const edge = this.tryEdgeOffset(src)
      if (edge) return edge
    }

    // 2. Exactly two tokens: distinguish between "double keywords" and "double values"
    if (tokens.length === 2) {
      const kw1 = this.asKey(tokens[0])
      const kw2 = this.asKey(tokens[1])

      // 2-1 Double keywords
      if (kw1 !== null && kw2 !== null) {
        const norm = this.normalizeTwoKeys(kw1, kw2)
        return { type: 'double', x: norm.x, y: norm.y }
      }

      // 2-2 Double values
      const xVal = this.tryParseValue(tokens[0])
      const yVal = this.tryParseValue(tokens[1])

      if (xVal === null || yVal === null) {
        // Parse error
        return { type: 'double', x: 'center', y: 'center' }
      } else if (yVal === 'left' || yVal === 'right') {
        return { type: 'double', x: 'center', y: 'center' }
      } else if (xVal === 'top' || xVal === 'bottom') {
        return { type: 'double', x: 'center', y: 'center' }
      } else if (xVal === 'right' || xVal === 'left') {
        return { type: 'double', x: xVal, y: yVal }
      } else if (yVal === 'top' || yVal === 'bottom') {
        return { type: 'double', x: xVal, y: yVal }
      } else {
        return { type: 'double', x: xVal, y: yVal }
      }
    }

    // 3. Single value
    return this.parseSingle(src)
  }

  static stringify(p: Position): string {
    switch (p.type) {
      case 'single':
      case 'double':
        return `${this.valStr(p.x ?? 'center')} ${this.valStr(p.y ?? 'center')}`
      case 'edge':
        return `${p.x.key} ${this.valStr(p.x.offset)} ${p.y.key} ${this.valStr(p.y.offset)}`
    }
  }

  /* -------------- Edge offset: order arbitrary, must each appear once -------------- */
  private static tryEdgeOffset(src: string): Position | null {
    // 1. Horizontal: (left|right) <lp>
    const hRe = /(left|right)\s+([+-]?\d+(?:\.\d+)?(?:px|em|rem|ch|cm|mm|in|pt|pc|%))/i
    // 2. Vertical: (top|bottom) <lp>
    const vRe = /(top|bottom)\s+([+-]?\d+(?:\.\d+)?(?:px|em|rem|ch|cm|mm|in|pt|pc|%))/i

    const hMatch = src.match(hRe)
    const vMatch = src.match(vRe)
    if (!hMatch || !vMatch) return null

    // 3. Block indices must not overlap to be considered "co-occurring"
    const hIdx = hMatch.index!
    const vIdx = vMatch.index!
    const hEnd = hIdx + hMatch[0].length
    const vEnd = vIdx + vMatch[0].length
    const overlap = !(hEnd <= vIdx || vEnd <= hIdx)
    if (overlap) return null // Same substring reused, invalid

    // 4. Normalization: always x first
    const [, xKey, xOff] = hMatch
    const [, yKey, yOff] = vMatch
    return {
      type: 'edge',
      x: { key: xKey as HorKey, offset: this.lp(xOff) },
      y: { key: yKey as VertKey, offset: this.lp(yOff) },
    }
  }

  /* ---------- utilities ---------- */
  private static asKey(s: string): Key | null {
    const k = s.toLowerCase()
    return this.KEYWORDS.includes(k as Key) ? (k as Key) : null
  }

  private static tryParseValue(s: string): HorKey | VertKey | LP | null {
    const k = this.asKey(s)
    if (k !== null) return k
    if (/^0+$/.test(s)) return { type: 'length', value: 0, unit: 'px' }
    try {
      return this.lp(s)
    } catch {
      /* Continue */
    }
    return null
  }

  /* Normalization: always return x first */
  private static normalizeTwoKeys(k1: Key, k2: Key): DoubleKeyNormalized {
    const isVert = (k: Key) => k === 'top' || k === 'bottom'
    if (isVert(k1)) return { x: k2 as HorKey, y: k1 as VertKey }
    return { x: k1 as HorKey, y: k2 as VertKey }
  }

  /* -------------------- Single value --------------------------------- */
  private static parseSingle(src: string): Position {
    const tok = src.toLowerCase() as Key
    if (tok === 'left' || tok === 'right' || tok === 'center')
      return { type: 'single', x: tok, y: 'center' }
    if (tok === 'top' || tok === 'bottom') return { type: 'single', x: 'center', y: tok }
    // Zero length can omit unit
    if (/^0+$/.test(src))
      return { type: 'single', x: { type: 'length', value: 0, unit: 'px' }, y: 'center' }

    // Other pure numbers → use default
    if (/^[\d.-]+$/.test(src)) return { type: 'single', x: 'center', y: 'center' }

    // With unit or percentage
    return { type: 'single', x: this.lp(src), y: 'center' }
  }

  /* Utility: string -> LP */
  private static lp(s: string): LP {
    if (s.endsWith('%')) return { type: 'percent', value: Number(s.slice(0, -1)), unit: '%' }
    const m = s.match(/^([+-]?\d+(?:\.\d+)?)(px|em|rem|ch|cm|mm|in|pt|pc)$/i)

    if (m) return { type: 'length', value: Number(m[1]), unit: m[2].toLowerCase() as Unit }
    throw new Error(`Bad LP: ${s}`)
  }

  private static valStr(v: HorKey | VertKey | LP): string {
    if (typeof v === 'string') return v
    return v.type === 'percent' ? `${v.value}%` : `${v.value}${v.unit}`
  }
}
