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

export function useNamespace<N extends string = string>() {
  return inject(PROVIDED_NAMESPACE, globalNamespace) as ComputedRef<N>
}

type Token = string | number

export function useNameHelper<B extends Token, N extends string = string>(
  block: B,
  namespace: Ref<N> | N = useNamespace()
) {
  /**
   * @returns `${namespace}-${block}`
   */
  const b = () => `${unref(namespace)}-${block}` as const
  /**
   * @returns `${namespace}-${block}__${element}`
   */
  const be = <E extends Token>(element: E) => `${b()}__${element}` as const
  /**
   * @returns `${namespace}-${block}--${modifier}`
   */
  const bm = <M extends Token>(modifier: M) => `${b()}--${modifier}` as const
  /**
   * @returns `${namespace}-${block}__${element}--${modifier}`
   */
  const bem = <E extends Token, M extends Token>(element: E, modifier: M) =>
    `${b()}__${element}--${modifier}` as const
  /**
   * @returns `${namespace}-${block}-${suffix}`
   */
  const bs = <S extends Token>(suffix: S) => `${b()}-${suffix}` as const
  /**
   * @returns `${namespace}-${suffix}`
   */
  const ns = (suffix: Token) => `${unref(namespace)}-${suffix}` as const
  /**
   * @returns `${namespace}-${block}-${name}`
   */
  const cv = <S extends Token>(name: S) => `--${b()}-${name}` as const
  /**
   * @returns a map that is transformed origin style map's key to cv(key)
   */
  const cvm = (map: Record<string, string>, style: Record<string, string> = {}) => {
    Object.keys(map).forEach(name => {
      style[cv(name)] = map[name]
    })

    return style
  }
  const v = <S extends Token>(name: S) => `--${unref(namespace)}-${name}` as const
  const gv = <S extends Token>(name: S) => `var(${v(name)})` as const
  const gcv = <S extends Token>(name: S) => `var(${cv(name)})` as const

  return {
    b,
    be,
    bm,
    bem,
    bs,
    ns,
    cv,
    cvm,
    v,
    gv,
    gcv
  }
}

export type NameHelper = ReturnType<typeof useNameHelper>

export function useClassHelper<N extends NameHelper>(nh: N) {
  const b = () => `.${nh.b()}` as const
  const be = <E extends Token>(element: E) => `.${nh.b()}__${element}` as const
  const bm = <M extends Token>(modifier: M) => `.${nh.b()}--${modifier}` as const
  const bem = <E extends Token, M extends Token>(element: E, modifier: M) =>
    `.${nh.b()}__${element}--${modifier}` as const
  const bs = <S extends Token>(suffix: S) => `.${nh.b()}-${suffix}` as const
  const ns = (suffix: Token) => `.${nh.ns(suffix)}` as const

  return {
    ...nh,
    b,
    be,
    bm,
    bem,
    bs,
    ns
  }
}

export type ClassHelper = ReturnType<typeof useClassHelper>
