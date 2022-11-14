declare const __TARGET__: string
declare const __DEMOS__: string[]
declare const __THEME__: boolean
declare const __PORT__: number

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, any>
  export default component
}
