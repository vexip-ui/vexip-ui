// export * from 'vue-router'

export type RouteLocationRaw = any

export function createWebHistory() {
  //
}

export function createRouter(options: any) {
  return { currentRoute: { value: '' }, options }
}
