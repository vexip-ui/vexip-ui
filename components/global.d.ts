declare const __VERSION__: string

declare module 'vue' {
  interface InputHTMLAttributes {
    webkitdirectory?: boolean
  }
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, any>
  export default component
}

export {}
