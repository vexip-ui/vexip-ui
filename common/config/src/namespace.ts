import { computed, provide, inject, unref } from 'vue'

import type { App, ComputedRef, Ref } from 'vue'

export const PROVIDED_NAMESPACE = '__vxp-provided-namespace'
export const globalNamespace = computed(() => 'vxp')

export function configNamespace(sourceNamespace: string | Ref<string>, app?: App) {
  if (app) {
    const namespace = computed(() => {
      const namespace = unref(sourceNamespace)

      return namespace || globalNamespace.value
    })

    app.provide(PROVIDED_NAMESPACE, namespace)
  } else {
    const upstreamNamespace = inject<ComputedRef<string> | null>(PROVIDED_NAMESPACE, null)
    const namespace = computed(() => {
      return unref(sourceNamespace) || upstreamNamespace?.value || globalNamespace.value
    })

    provide(PROVIDED_NAMESPACE, namespace)
  }
}

export function useNamespace() {
  return inject(PROVIDED_NAMESPACE, globalNamespace)
}

export function useNameHelper(block: string, namespace: Ref<string> | string = useNamespace()) {
  const b = () => `${unref(namespace)}-${block}`
  const be = (element: string) => `${b()}__${element}`
  const bm = (modifier: string | number) => `${b()}--${modifier}`
  const bem = (element: string, modifier: string | number) => `${b()}__${element}--${modifier}`
  const bs = (suffix: string) => `${b()}-${suffix}`
  const ns = (suffix: string) => `${unref(namespace)}-${suffix}`

  const cv = (name: string) => `--${b()}-${name}`
  const cvm = (map: Record<string, string>, style: Record<string, string> = {}) => {
    Object.keys(map).forEach(name => {
      style[cv(name)] = map[name]
    })

    return style
  }

  return {
    b,
    be,
    bm,
    bem,
    bs,
    ns,

    cv,
    cvm
  }
}

export type NameHelper = ReturnType<typeof useNameHelper>
