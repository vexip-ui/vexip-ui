import { parseColorToRgba, mixColor, adjustAlpha, toFixed } from '@vexip-ui/utils'

import type { Color } from '@vexip-ui/utils'

const rootEl = document.documentElement
const rootStyle = getComputedStyle(rootEl)

export function computeSeriesColors(value: Color) {
  const colors: Record<string, string[]> = {
    light: [],
    opacity: [],
    dark: []
  }
  const black = parseColorToRgba(
    rootStyle.getPropertyValue('--vxp-color-black') || { r: 0, g: 0, b: 0, a: 1 }
  )
  const white = parseColorToRgba(
    rootStyle.getPropertyValue('--vxp-color-white') || { r: 255, g: 255, b: 255, a: 1 }
  )
  const style = rootEl.style

  for (let i = 1; i < 10; ++i) {
    const light = mixColor(white, value, i * 0.1).toString()
    const opacity = adjustAlpha(value, toFixed(1 - i * 0.1, 1)).toString()

    style.setProperty(`--vxp-color-primary-light-${i}`, light)
    style.setProperty(`--vxp-color-primary-opacity-${i}`, opacity)

    colors.light.push(light)
    colors.opacity.push(opacity)
  }

  for (let i = 1; i < 3; ++i) {
    const dark = mixColor(black, value, i * 0.1).toString()

    style.setProperty(`--vxp-color-primary-dark-${i}`, dark)

    colors.dark.push(dark)
  }

  style.setProperty('--vxp-color-primary-base', `${value}`)
  localStorage.setItem('vexip-docs-prefer-major-color', `${value}`)

  return colors
}
