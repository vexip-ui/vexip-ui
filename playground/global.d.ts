import type { VexipComponents, VexipProperties } from '../lib'

declare module '@vue/runtime-core' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface ComponentCustomProperties extends VexipProperties {}
}

declare module 'vue' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface GlobalComponents extends VexipComponents {}
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, any>
  export default component
}

declare module '@/dist/vexip-ui.es.js'
