declare const __SSR__: boolean
declare const __ROLLBACK_LANG__: string
declare const __VERSION__: string

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, any>
  export default component
}

declare module '*.md' {
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, any>
  export default component
}
