declare const __ROLLBACK_LANG__: string

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, any>
  export default component
}

declare module '*.md' {
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, any>
  export default component
}
