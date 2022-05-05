import { ref } from 'vue'

export type BreakPoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

export const breakPoints = Object.freeze<BreakPoint[]>(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'])
export const currentBreakPoint = ref<BreakPoint>('xs')

const computedStyle = getComputedStyle(document.documentElement)
const queryMap = {} as Record<BreakPoint, MediaQueryList>

breakPoints.forEach(point => {
  const media = computedStyle.getPropertyValue(`--vxp-grid-break-point-${point}`)
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
