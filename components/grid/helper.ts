import { ref } from 'vue'

import { isClient } from '@vexip-ui/utils'

export type BreakPoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

export const breakPoints = Object.freeze<BreakPoint[]>(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'])
export const currentBreakPoint = ref<BreakPoint>('xs')

if (isClient) {
  const computedStyle = getComputedStyle(document.documentElement)
  const queryMap = {} as Record<BreakPoint, MediaQueryList>

  breakPoints.forEach(point => {
    const media = computedStyle.getPropertyValue(`--vxp-break-point-${point}`).trim()
    const query = matchMedia(`only screen and ${media}`)

    query.addEventListener('change', handleBreakPointChange)
    queryMap[point] = query
  })

  const queryEntries = Object.entries(queryMap).reverse() as [BreakPoint, MediaQueryList][]

  function handleBreakPointChange() {
    for (const [point, query] of queryEntries) {
      if (query.matches) {
        currentBreakPoint.value = point
        break
      }
    }
  }

  handleBreakPointChange()
}
