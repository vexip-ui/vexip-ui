import { computed, inject, provide, unref } from 'vue'

import { useBEM } from '@vexip-ui/bem-helper'

import type { App, ComputedRef } from 'vue'
import type { MaybeRef } from './types'

export type Namespace = 'vxp'

export const PROVIDED_NAMESPACE = '__vxp-provided-namespace'
export const globalNamespace = computed(() => 'vxp' as Namespace)

/**
 * Provide a namespace config for under components.
 *
 * You only should use this method when initialize application.
 *
 * @param sourceNamespace namespace config
 * @param app the app of Vue, will use app.provide if specify
 */
export function configNamespace<N extends string = Namespace>(
  sourceNamespace: MaybeRef<N>,
  app?: App
) {
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

export function useNamespace<N extends string = Namespace>() {
  return inject(PROVIDED_NAMESPACE, globalNamespace) as ComputedRef<N>
}

/**
 * Create a name helper for BEM.
 *
 * For css vars name, the namespace is fixed to 'vxp' (not responsive).
 */
export function useNameHelper<B extends string, N extends string = Namespace>(
  block: B,
  namespace: MaybeRef<N> = useNamespace()
) {
  return useBEM(block, isVar => (isVar ? 'vxp' : unref(namespace)))
}

export type NameHelper = ReturnType<typeof useNameHelper>
