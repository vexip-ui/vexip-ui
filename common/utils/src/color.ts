import { isDefined } from './common'

interface RGB extends Record<any, any> {
  r: number,
  g: number,
  b: number,
  a?: number
}

export interface RGBColor extends RGB {
  a?: 1,
  format?: 'name' | 'rgb'
}

export interface RGBAColor extends RGB {
  a: number,
  format?: 'name' | 'rgba'
}

export interface HEX3Color extends RGB {
  a?: 1,
  format?: 'name' | 'hex3'
}
export interface HEX4Color extends RGB {
  a: number,
  format?: 'name' | 'hex4'
}
export interface HEX6Color extends RGB {
  a?: 1,
  format?: 'name' | 'hex6'
}
export interface HEX8Color extends RGB {
  a: number,
  format?: 'name' | 'hex8'
}

interface HSL extends Record<any, any> {
  h: number,
  s: number,
  l: number,
  a?: number
}

export interface HSLColor extends HSL {
  a?: 1,
  format?: 'name' | 'hsl'
}

export interface HSLAColor extends HSL {
  a: number,
  format?: 'name' | 'hsla'
}

interface HSV extends Record<any, any> {
  h: number,
  s: number,
  v: number,
  a?: number
}

export interface HSVColor extends HSV {
  a?: 1,
  format?: 'name' | 'hsv'
}

export interface HSVAColor extends HSV {
  a: number,
  format?: 'name' | 'hsva'
}

export type Color =
  | string
  | RGBColor
  | RGBAColor
  | HSLColor
  | HSLAColor
  | HSVColor
  | HSVAColor
  | HEX3Color
  | HEX4Color
  | HEX6Color
  | HEX8Color

export type ObjectColor = Exclude<Color, string>

export interface ColorMeta {
  rgb: RGBColor,
  hsl: HSLColor,
  hsv: HSVColor,
  hex: string,
  alpha: number,
  rgba: RGBAColor,
  hsla: HSLAColor,
  hsva: HSVAColor,
  hex8: string,
  gray: number,
  origin: Color
}

export type ColorType = 'hex' | 'rgb' | 'hsv' | 'hsl'

const INTEGER_REG = '[-\\+]?\\d+%?'
const NUMBER_REG = '[-\\+]?\\d*\\.\\d+%?'

const NUMBER_UNIT = `(?:${NUMBER_REG})|(?:${INTEGER_REG})`

const COLOR_REG_3 = `[\\s|\\(]+(${NUMBER_UNIT})[,|\\s]+(${NUMBER_UNIT})[,|\\s]+(${NUMBER_UNIT})\\s*\\)?`
const COLOR_REG_4 = `[\\s|\\(]+(${NUMBER_UNIT})[,|\\s]+(${NUMBER_UNIT})[,|\\s]+(${NUMBER_UNIT})[,|\\s]+(${NUMBER_UNIT})\\s*\\)?`

// const UNIT_REG = new RegExp(NUMBER_UNIT)

// const FORMAT_REG = /^((((?:rgb)|(?:hsl)|(?:hsv))a?)|hex[3468]?|name)$/

export const RGB_REG = new RegExp(`rgb${COLOR_REG_3}`)
export const RGBA_REG = new RegExp(`rgba${COLOR_REG_4}`)
export const HSL_REG = new RegExp(`hsl${COLOR_REG_4}`)
export const HSLA_REG = new RegExp(`hsla${COLOR_REG_4}`)
export const HSV_REG = new RegExp(`hsv${COLOR_REG_4}`)
export const HSVA_REG = new RegExp(`hsva${COLOR_REG_4}`)

export const HEX_REG_3 = /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/
export const HEX_REG_4 = /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/
export const HEX_REG_6 = /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
export const HEX_REG_8 = /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/

export const NAMED_COLORS = Object.freeze({
  aliceblue: 'f0f8ff',
  antiquewhite: 'faebd7',
  aqua: '0ff',
  aquamarine: '7fffd4',
  azure: 'f0ffff',
  beige: 'f5f5dc',
  bisque: 'ffe4c4',
  black: '000',
  blanchedalmond: 'ffebcd',
  blue: '00f',
  blueviolet: '8a2be2',
  brown: 'a52a2a',
  burlywood: 'deb887',
  burntsienna: 'ea7e5d',
  cadetblue: '5f9ea0',
  chartreuse: '7fff00',
  chocolate: 'd2691e',
  coral: 'ff7f50',
  cornflowerblue: '6495ed',
  cornsilk: 'fff8dc',
  crimson: 'dc143c',
  cyan: '0ff',
  darkblue: '00008b',
  darkcyan: '008b8b',
  darkgoldenrod: 'b8860b',
  darkgray: 'a9a9a9',
  darkgreen: '006400',
  darkgrey: 'a9a9a9',
  darkkhaki: 'bdb76b',
  darkmagenta: '8b008b',
  darkolivegreen: '556b2f',
  darkorange: 'ff8c00',
  darkorchid: '9932cc',
  darkred: '8b0000',
  darksalmon: 'e9967a',
  darkseagreen: '8fbc8f',
  darkslateblue: '483d8b',
  darkslategray: '2f4f4f',
  darkslategrey: '2f4f4f',
  darkturquoise: '00ced1',
  darkviolet: '9400d3',
  deeppink: 'ff1493',
  deepskyblue: '00bfff',
  dimgray: '696969',
  dimgrey: '696969',
  dodgerblue: '1e90ff',
  firebrick: 'b22222',
  floralwhite: 'fffaf0',
  forestgreen: '228b22',
  fuchsia: 'f0f',
  gainsboro: 'dcdcdc',
  ghostwhite: 'f8f8ff',
  gold: 'ffd700',
  goldenrod: 'daa520',
  gray: '808080',
  green: '008000',
  greenyellow: 'adff2f',
  grey: '808080',
  honeydew: 'f0fff0',
  hotpink: 'ff69b4',
  indianred: 'cd5c5c',
  indigo: '4b0082',
  ivory: 'fffff0',
  khaki: 'f0e68c',
  lavender: 'e6e6fa',
  lavenderblush: 'fff0f5',
  lawngreen: '7cfc00',
  lemonchiffon: 'fffacd',
  lightblue: 'add8e6',
  lightcoral: 'f08080',
  lightcyan: 'e0ffff',
  lightgoldenrodyellow: 'fafad2',
  lightgray: 'd3d3d3',
  lightgreen: '90ee90',
  lightgrey: 'd3d3d3',
  lightpink: 'ffb6c1',
  lightsalmon: 'ffa07a',
  lightseagreen: '20b2aa',
  lightskyblue: '87cefa',
  lightslategray: '789',
  lightslategrey: '789',
  lightsteelblue: 'b0c4de',
  lightyellow: 'ffffe0',
  lime: '0f0',
  limegreen: '32cd32',
  linen: 'faf0e6',
  magenta: 'f0f',
  maroon: '800000',
  mediumaquamarine: '66cdaa',
  mediumblue: '0000cd',
  mediumorchid: 'ba55d3',
  mediumpurple: '9370db',
  mediumseagreen: '3cb371',
  mediumslateblue: '7b68ee',
  mediumspringgreen: '00fa9a',
  mediumturquoise: '48d1cc',
  mediumvioletred: 'c71585',
  midnightblue: '191970',
  mintcream: 'f5fffa',
  mistyrose: 'ffe4e1',
  moccasin: 'ffe4b5',
  navajowhite: 'ffdead',
  navy: '000080',
  oldlace: 'fdf5e6',
  olive: '808000',
  olivedrab: '6b8e23',
  orange: 'ffa500',
  orangered: 'ff4500',
  orchid: 'da70d6',
  palegoldenrod: 'eee8aa',
  palegreen: '98fb98',
  paleturquoise: 'afeeee',
  palevioletred: 'db7093',
  papayawhip: 'ffefd5',
  peachpuff: 'ffdab9',
  peru: 'cd853f',
  pink: 'ffc0cb',
  plum: 'dda0dd',
  powderblue: 'b0e0e6',
  purple: '800080',
  rebeccapurple: '663399',
  red: 'f00',
  rosybrown: 'bc8f8f',
  royalblue: '4169e1',
  saddlebrown: '8b4513',
  salmon: 'fa8072',
  sandybrown: 'f4a460',
  seagreen: '2e8b57',
  seashell: 'fff5ee',
  sienna: 'a0522d',
  silver: 'c0c0c0',
  skyblue: '87ceeb',
  slateblue: '6a5acd',
  slategray: '708090',
  slategrey: '708090',
  snow: 'fffafa',
  springgreen: '00ff7f',
  steelblue: '4682b4',
  tan: 'd2b48c',
  teal: '008080',
  thistle: 'd8bfd8',
  tomato: 'ff6347',
  turquoise: '40e0d0',
  violet: 'ee82ee',
  wheat: 'f5deb3',
  white: 'fff',
  whitesmoke: 'f5f5f5',
  yellow: 'ff0',
  yellowgreen: '9acd32'
})

export type ColorName = keyof typeof NAMED_COLORS

export const COLOR_NAMES = Object.freeze(new Set(Object.keys(NAMED_COLORS))) as Readonly<
  Set<ColorName>
>

/**
 * 判断给定的字符串是否为一个合法颜色值
 *
 * @param value 原始字符串
 */
export function isColor(value: string): boolean {
  value = String(value).trim().toLowerCase()

  if (!value) {
    return false
  }

  if (value === 'transparent' || NAMED_COLORS[value as ColorName]) {
    return true
  }

  return (
    value === 'transparent' ||
    COLOR_NAMES.has(value as ColorName) ||
    RGB_REG.test(value) ||
    RGBA_REG.test(value) ||
    HSL_REG.test(value) ||
    HSLA_REG.test(value) ||
    HSV_REG.test(value) ||
    HSVA_REG.test(value) ||
    HEX_REG_3.test(value) ||
    HEX_REG_4.test(value) ||
    HEX_REG_6.test(value) ||
    HEX_REG_8.test(value)
  )
}

/**
 * 将给定的字符串转化为 {@link ObjectColor}，无法转换时返回 null
 *
 * @param color 原始颜色字符串
 */
export function parseStringColor(color: string): ObjectColor | null {
  color = color.toString().trim().toLowerCase()

  if (color === 'transparent') {
    return { r: 0, g: 0, b: 0, a: 0, format: 'name', toString: toRgbString }
  }

  let named = false

  if (NAMED_COLORS[color as ColorName]) {
    color = NAMED_COLORS[color as ColorName]
    named = true
  }

  let match

  if ((match = RGB_REG.exec(color))) {
    const { r, g, b } = normalizeRgb(match[1], match[2], match[3])

    return {
      r: r * 255,
      g: g * 255,
      b: b * 255,
      format: 'rgb',
      toString: toRgbString
    }
  }

  if ((match = RGBA_REG.exec(color))) {
    const { r, g, b } = normalizeRgb(match[1], match[2], match[3])

    return {
      r: r * 255,
      g: g * 255,
      b: b * 255,
      a: normalizeAlpha(match[4]),
      format: 'rgba',
      toString: toRgbString
    }
  }

  if ((match = HSL_REG.exec(color))) {
    const { h, s, l } = normalizeHsl(match[0], match[1], match[3])

    return { h: h * 360, s, l, format: 'hsl', toString: toHslString }
  }

  if ((match = HSLA_REG.exec(color))) {
    const { h, s, l } = normalizeHsl(match[0], match[1], match[3])

    return {
      h: h * 360,
      s,
      l,
      a: normalizeAlpha(match[4]),
      format: 'hsla',
      toString: toHslString
    }
  }

  if ((match = HSV_REG.exec(color))) {
    const { h, s, v } = normalizeHsv(match[0], match[1], match[3])

    return { h: h * 360, s, v, format: 'hsv', toString: toHsvString }
  }

  if ((match = HSVA_REG.exec(color))) {
    const { h, s, v } = normalizeHsv(match[0], match[1], match[3])

    return {
      h: h * 360,
      s,
      v,
      a: normalizeAlpha(match[4]),
      format: 'hsva',
      toString: toHsvString
    }
  }

  if ((match = HEX_REG_3.exec(color))) {
    return {
      r: parseInt(`${match[1]}${match[1]}`, 16),
      g: parseInt(`${match[2]}${match[2]}`, 16),
      b: parseInt(`${match[3]}${match[3]}`, 16),
      format: named ? 'name' : 'hex3',
      toString: toRgbString
    }
  }

  if ((match = HEX_REG_4.exec(color))) {
    return {
      r: parseInt(`${match[1]}${match[1]}`, 16),
      g: parseInt(`${match[2]}${match[2]}`, 16),
      b: parseInt(`${match[3]}${match[3]}`, 16),
      a: convertHexToDecimal(`${match[4]}${match[4]}`),
      format: named ? 'name' : 'hex4',
      toString: toRgbString
    }
  }

  if ((match = HEX_REG_6.exec(color))) {
    return {
      r: parseInt(match[1], 16),
      g: parseInt(match[2], 16),
      b: parseInt(match[3], 16),
      format: named ? 'name' : 'hex6',
      toString: toRgbString
    }
  }

  if ((match = HEX_REG_8.exec(color))) {
    return {
      r: parseInt(match[1], 16),
      g: parseInt(match[2], 16),
      b: parseInt(match[3], 16),
      a: convertHexToDecimal(match[4]),
      format: named ? 'name' : 'hex8',
      toString: toRgbString
    }
  }

  return null
}

/**
 * 将给定的 {@link Color} 解析为 {@link ColorMeta}
 *
 * @param color 原始颜色值
 */
export function parseColor(color: Color): ColorMeta {
  const { a, ...rgb } = parseColorToRgba(color)

  delete rgb.format

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
  const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b)
  const hex = rgbToHex(rgb.r, rgb.g, rgb.b)

  const hex8 = rgbaToHex(rgb.r, rgb.g, rgb.b, a)

  return {
    rgb: rgb as RGBColor,
    hsl,
    hsv,
    hex,
    alpha: a,
    rgba: { ...rgb, a, format: 'rgba' },
    hsla: { ...hsl, a, format: 'hsla' },
    hsva: { ...hsv, a, format: 'hsva' },
    hex8,
    gray: rgbToGrayScale(rgb),
    origin: color
  }
}

/**
 * 将给定的 {@link Color} 解析为 {@link RGBAColor}
 *
 * @param originColor 原始颜色值
 */
export function parseColorToRgba(originColor: Color): RGBAColor {
  let rgb: RGBColor = { r: 0, g: 0, b: 0 }
  let a = 1
  let color: Color | null

  if (typeof originColor === 'string') {
    color = parseStringColor(originColor)
  } else {
    color = originColor
  }

  if (color !== null && typeof color === 'object') {
    if ('l' in color) {
      rgb = hslToRgb(color.h, color.s, color.l)
    } else if ('v' in color) {
      rgb = hsvToRgb(color.h, color.s, color.v)
    }

    if ('a' in color) {
      a = normalizeAlpha(color.a ?? 1)

      if (Number.isNaN(a)) {
        a = 1
      }
    }

    rgb = color as RGBColor
  }

  return { ...rgb, a, format: 'rgba', toString: toRgbString }
}

/**
 * 将原始的 h、s、l 值标准化为 0 ~ 1 的值
 *
 * @param h 0 ~ 360
 * @param s 0 ~ 1，0% ~ 100%
 * @param l 0 ~ 1，0% ~ 100%
 */
export function normalizeHsl(h: number | string, s: number | string, l: number | string) {
  return {
    h: boundRange(h, 0, 360) / 360,
    s: boundRange(isPercentage(s) ? parsePercentage(s) : s, 0, 1),
    l: boundRange(isPercentage(l) ? parsePercentage(l) : l, 0, 1)
  }
}

/**
 * 将原始的 r、g、b 值标准化为 0 ~ 1 的值
 *
 * @param r 0 ~ 255
 * @param g 0 ~ 255
 * @param b 0 ~ 255
 */
export function normalizeRgb(r: number | string, g: number | string, b: number | string) {
  return {
    r: boundRange(r, 0, 255) / 255,
    g: boundRange(g, 0, 255) / 255,
    b: boundRange(b, 0, 255) / 255
  }
}

/**
 * 将原始的 h、s、v 值标准化为 0 ~ 1 的值
 *
 * @param h 0 ~ 360
 * @param s 0 ~ 1，0% ~ 100%
 * @param v 0 ~ 1，0% ~ 100%
 */
export function normalizeHsv(h: number | string, s: number | string, v: number | string) {
  return {
    h: boundRange(h, 0, 360) / 360,
    s: boundRange(isPercentage(s) ? parsePercentage(s) : s, 0, 1),
    v: boundRange(isPercentage(v) ? parsePercentage(v) : v, 0, 1)
  }
}

/**
 * 将原始透明度值标准化为 0 ~ 1 的值
 *
 * @param a 0 ~ 1，0% ~ 100%
 */
export function normalizeAlpha(a: number | string) {
  return boundRange(isPercentage(a) ? parsePercentage(a) : a, 0, 1)
}

export function hslToRgb(h: number | string, s: number | string, l: number | string): RGBColor {
  let r, g, b
  ;({ h, s, l } = normalizeHsl(h, s, l))

  if (s === 0) {
    r = g = b = l
  } else {
    const q = l < 0.5 ? 1 * (1 + s) : l + s - l * s
    const p = 2 * l - q

    r = hueToRgb(p, q, h + 1 / 3)
    g = hueToRgb(p, q, h)
    b = hueToRgb(p, q, h - 1 / 3)
  }

  r *= 255
  g *= 255
  b *= 255

  return { r, g, b, toString: toRgbString }
}

export function rgbToHsl(r: number | string, g: number | string, b: number | string): HSLColor {
  ({ r, g, b } = normalizeRgb(r, g, b))

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h, s

  const l = (max + min) / 2

  if (max === min) {
    h = s = 0
  } else {
    const d = max - min

    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r: {
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      }
      case g: {
        h = (b - r) / d + 2
        break
      }
      case b: {
        h = (r - g) / d + 4
        break
      }
      default: {
        h = 0
      }
    }

    h *= 60
  }

  return { h, s, l, toString: toHslString }
}

export function hslToHsv(h: number | string, s: number | string, l: number | string): HSVColor {
  ({ h, s, l } = normalizeHsl(h, s, l))

  const v = 0.5 * (2 * l + s * (1 - Math.abs(2 * l - 1)))

  s = (2 * (v - l)) / v

  return { h: h * 360, s, v, toString: toHsvString }
}

export function hsvToHsl(h: number | string, s: number | string, v: number | string): HSLColor {
  ({ h, s, v } = normalizeHsv(h, s, v))

  const l = 0.5 * v * (2 - s)

  s = (v * s) / (1 - Math.abs(2 * l - 1))

  return { h: h * 360, s, l, toString: toHslString }
}

export function hsvToRgb(h: number | string, s: number | string, v: number | string): RGBColor {
  ({ h, s, v } = normalizeHsv(h, s, v))

  h *= 6

  const i = Math.floor(h)
  const f = h - i
  const p = v * (1 - s)
  const q = v * (1 - f * s)
  const t = v * (1 - (1 - f) * s)
  const mod = i % 6

  let r = [v, q, p, p, t, v][mod]
  let g = [t, v, v, q, p, p][mod]
  let b = [p, p, t, v, v, q][mod]

  r *= 255
  g *= 255
  b *= 255

  return { r, g, b, toString: toRgbString }
}

export function rgbToHsv(r: number | string, g: number | string, b: number | string): HSVColor {
  ({ r, g, b } = normalizeRgb(r, g, b))

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)

  let h

  const v = max
  const d = max - min
  const s = max === 0 ? 0 : d / max

  if (max === min) {
    h = 0
  } else {
    switch (max) {
      case r: {
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      }
      case g: {
        h = (b - r) / d + 2
        break
      }
      case b: {
        h = (r - g) / d + 4
        break
      }
      default: {
        h = 0
      }
    }

    h *= 60
  }

  return { h, s, v, toString: toHsvString }
}

export function rgbToHex(
  r: number | string,
  g: number | string,
  b: number | string,
  allow3Char = false
) {
  ({ r, g, b } = normalizeRgb(r, g, b))

  const hex = [
    repairDigits(Math.round(r * 255).toString(16)),
    repairDigits(Math.round(g * 255).toString(16)),
    repairDigits(Math.round(b * 255).toString(16))
  ]

  if (allow3Char && isRepetitive(hex[0]) && isRepetitive(hex[1]) && isRepetitive(hex[2])) {
    return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0)
  }

  return '#' + hex.join('')
}

export function rgbaToHex(
  r: number | string,
  g: number | string,
  b: number | string,
  a: number | string,
  allow4Char = false
) {
  ({ r, g, b } = normalizeRgb(r, g, b))

  const hex = [
    repairDigits(Math.round(r * 255).toString(16)),
    repairDigits(Math.round(g * 255).toString(16)),
    repairDigits(Math.round(b * 255).toString(16)),
    repairDigits(convertDecimalToHex(normalizeAlpha(a)))
  ]

  if (
    allow4Char &&
    isRepetitive(hex[0]) &&
    isRepetitive(hex[1]) &&
    isRepetitive(hex[2]) &&
    isRepetitive(hex[3])
  ) {
    return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0)
  }

  return '#' + hex.join('')
}

export function mixColor(color1: Color, color2: Color, weight = 0.5): RGBAColor {
  if (!color1 && !color2) return { r: 0, g: 0, b: 0, a: 1 }
  if (!color1) return parseColorToRgba(color2)
  if (!color2) return parseColorToRgba(color1)

  const rgba1 = parseColorToRgba(color1)
  const rgba2 = parseColorToRgba(color2)

  const originalWeight = boundRange(weight, 0, 1)
  const normalizedWeight = originalWeight * 2 - 1

  const alphaDistance = rgba1.a - rgba2.a
  const mixWeight =
    normalizedWeight * alphaDistance === -1
      ? normalizedWeight
      : (normalizedWeight + alphaDistance) / (1 + normalizedWeight * alphaDistance)
  const weight1 = (mixWeight + 1) / 2
  const weight2 = 1 - weight1

  return {
    r: Math.round(rgba1.r * weight1 + rgba2.r * weight2),
    g: Math.round(rgba1.g * weight1 + rgba2.g * weight2),
    b: Math.round(rgba1.b * weight1 + rgba2.b * weight2),
    a: Math.round(rgba1.a * originalWeight + rgba2.a * (1 - originalWeight)),
    format: 'rgba',
    toString: toRgbString
  }
}

export function adjustAlpha(color: Color, alpha: number | string) {
  const rgba = parseColorToRgba(color)

  rgba.a = normalizeAlpha(isPercentage(alpha) ? parsePercentage(alpha) : alpha)

  return rgba
}

export function randomColor(withAlpha = false, type: ColorType = 'hex') {
  const r = Math.round(Math.random() * 255)
  const g = Math.round(Math.random() * 255)
  const b = Math.round(Math.random() * 255)

  if (type === 'hex') {
    return withAlpha ? rgbaToHex(r, g, b, Math.random()) : rgbToHex(r, g, b)
  }

  let color: ObjectColor

  if (type === 'hsl') {
    color = rgbToHsl(r, g, b)
  } else if (type === 'hsv') {
    color = rgbToHsv(r, g, b)
  } else {
    color = Object.create({ r, g, b, toString: toRgbString })
  }

  if (withAlpha) {
    (color as RGBAColor).a = Math.random()
  }

  return color.toString()
}

export function randomPreferColor(
  prefer: 'hard' | 'soft',
  withAlpha = false,
  type: ColorType = 'hex'
) {
  const h = Math.round(Math.random() * 360)
  const s = Math.round(prefer === 'hard' ? 80 + Math.random() * 20 : 20 + Math.random() * 70) / 100
  const l = Math.round(prefer === 'hard' ? 40 + Math.random() * 20 : 80 + Math.random() * 15) / 100

  if (type === 'hsl') {
    return toHslString.bind({ h, s, l })()
  }

  let color!: ObjectColor

  if (type === 'hex' || type === 'rgb') {
    color = hslToRgb(h, s, l)

    if (type === 'hex') {
      const { r, g, b } = color

      return withAlpha ? rgbaToHex(r, g, b, Math.random()) : rgbToHex(r, g, b)
    }
  } else if (type === 'hsv') {
    color = hslToHsv(h, s, l)
  }

  if (withAlpha) {
    (color as RGBAColor).a = Math.random()
  }

  return color.toString()
}

export function randomHardColor(withAlpha = false, type: ColorType = 'hex') {
  return randomPreferColor('hard', withAlpha, type)
}

export function randomSoftColor(withAlpha = false, type: ColorType = 'hex') {
  return randomPreferColor('soft', withAlpha, type)
}

export function toGrayScale(color: string) {
  return rgbToGrayScale(parseColorToRgba(color))
}

function repairDigits(str: string) {
  return str.length === 1 ? `0${str}` : str.toString()
}

function isRepetitive(string: string): boolean {
  return string.charAt(0) === string.charAt(1)
}

// function testUnit(color: number | string): boolean {
//   return UNIT_REG.test(color as string)
// }

function convertDecimalToHex(number: number | string): string {
  return Math.round(parseFloat(number as string) * 255).toString(16)
}

function convertHexToDecimal(hex: string): number {
  return parseInt(hex, 16) / 255
}

function boundRange(number: number | string, min: number, max: number): number {
  return Math.max(min, Math.min(max, parseFloat(number as string)))
}

function hueToRgb(p: number, q: number, t: number): number {
  if (t < 0) t += 1
  if (t > 1) t -= 1
  if (t < 1 / 6) return p + (q - p) * 6 * t
  if (t < 1 / 2) return q
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6

  return p
}

function isPercentage(percent: number | string): boolean {
  return String(percent).trim().includes('%')
}

function parsePercentage(percent: number | string): number {
  const number = parseFloat(percent as string) / 100

  return Number.isNaN(number) ? 0 : number
}

function toRgbString(this: RGB) {
  if (isDefined(this.a) && this.a >= 0 && this.a < 1) {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`
  }

  return `rgb(${this.r}, ${this.g}, ${this.b})`
}

function toHslString(this: HSL) {
  const s = `${this.s * 100}%`
  const l = `${this.l * 100}%`

  if (isDefined(this.a) && this.a >= 0 && this.a < 1) {
    return `hsla(${this.h}, ${s}, ${l}, ${this.a})`
  }

  return `hsl(${this.h}, ${s}, ${l})`
}

function toHsvString(this: HSV) {
  const s = `${this.s * 100}%`
  const v = `${this.v * 100}%`

  if (isDefined(this.a) && this.a >= 0 && this.a < 1) {
    return `hsva(${this.h}, ${s}, ${v}, ${this.a})`
  }

  return `hsv(${this.h}, ${s}, ${v})`
}

function rgbToGrayScale(rgb: RGB) {
  return (rgb.r * 0.2126 + rgb.g * 0.7152 + rgb.b * 0.0722) / 255
}
