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
