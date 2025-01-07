import { rgbToHsv } from '@vexip-ui/utils'

import type { RGBColor } from '@vexip-ui/utils'

export type ColorFormat = 'rgb' | 'hsl' | 'hsv' | 'hex'

export interface ColorPrickerSlots {
  control?: (params: { color: RGBColor, alpha: number, empty: boolean }) => any,
  prefix?: () => any,
  suffix?: () => any,
  label?: (params: { color: RGBColor, alpha: number, empty: boolean, label: string }) => any
}

export const defaultShortcuts = Object.freeze([
  '#2d8cf0',
  '#19be6b',
  '#ff9900',
  '#ed4014',
  '#00b5ff',
  '#19c919',
  '#f9e31c',
  '#ea1a1a',
  '#9b1dea',
  '#00c2b1',
  '#ac7a33',
  '#1d35ea',
  '#8bc34a',
  '#f16b62',
  '#ea4ca3',
  '#0d94aa',
  '#febd79',
  '#5d4037',
  '#00bcd4',
  '#f06292',
  '#cddc39',
  '#607d8b',
  '#000000',
  '#ffffff'
])

export const getDefaultHsv = () => rgbToHsv(0, 0, 0)
