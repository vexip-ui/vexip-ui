declare const __VERSION__: string
declare const __VUE_VERSION__: string
declare const __TS_VERSION__: string
declare const __REPL_VERSION__: string

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, any>
  export default component
}

declare module '@/dist/vexip-ui.es.js'
declare module '@vue/repl/monaco-editor'
