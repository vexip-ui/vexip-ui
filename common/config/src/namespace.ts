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
  /**
   * @returns `${namespace}-${block}`
   */
  const b = () => `${unref(namespace)}-${block}`
  /**
   * @returns `${namespace}-${block}__${element}`
   */
  const be = (element: string) => `${b()}__${element}`
  /**
   * @returns `${namespace}-${block}--${modifier}`
   */
  const bm = (modifier: string | number) => `${b()}--${modifier}`
  /**
   * @returns `${namespace}-${block}__${element}--${modifier}`
   */
  const bem = (element: string, modifier: string | number) => `${b()}__${element}--${modifier}`
  /**
   * @returns `${namespace}-${block}-${suffix}`
   */
  const bs = (suffix: string) => `${b()}-${suffix}`
  /**
   * @returns `${namespace}-${suffix}`
   */
  const ns = (suffix: string) => `${unref(namespace)}-${suffix}`
  /**
   * @returns `${namespace}-${block}-${name}`
   */
  const cv = (name: string) => `--${b()}-${name}`
  /**
   * @returns a map that is transformed origin style map's key to cv(key)
   */
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
