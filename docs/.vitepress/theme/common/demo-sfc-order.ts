import { ref } from 'vue'

import { isClient } from '@vexip-ui/utils'

export type FirstSfcType = 'script' | 'template'

export const firstSfcOptions = Object.freeze<FirstSfcType[]>(['script', 'template'])

const firstSfcKey = 'vexip-docs-prefer-demo-first-sfc'
const firstSfc = ref<FirstSfcType>(
  isClient ? (localStorage.getItem(firstSfcKey) as FirstSfcType) || 'script' : 'script',
)

const templateRE = /<template>[\s\S]*<\/template>/
const scriptRE = /<script.*>[\s\S]*<\/script>/
const styleRE = /<style.*>[\s\S]*<\/style>/

export function getFirstSfc() {
  return firstSfc.value
}

export function setFirstSfc(value: FirstSfcType) {
  firstSfc.value = value
  isClient && localStorage.setItem(firstSfcKey, firstSfc.value)
}

export function transformOrder(code: string) {
  if (code.startsWith(`<${firstSfc.value}`)) return code

  const template = code.match(templateRE)?.[0]
  const script = code.match(scriptRE)?.[0]
  const style = code.match(styleRE)?.[0]

  if (!template || !script) return code

  const units = firstSfc.value === 'script' ? [script, template] : [template, script]

  style && units.push(style)

  return units.join('\n\n') + (code.endsWith('\n') ? '\n' : '')
}
