let globalCount = 0

export function getGlobalCount() {
  return globalCount++
}

export function setGlobalCount(count: number) {
  globalCount = Math.round(count)
}

export function createCounter(count = 0) {
  return {
    getCount: () => count++,
    setCount: (newCount: number) => {
      count = newCount
    },
  }
}
