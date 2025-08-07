import { createApp, createVNode, getCurrentInstance, h, nextTick, ref, render, unref } from 'vue'

import Component from './modal.vue'
import { isClient, noop } from '@vexip-ui/utils'

import type { App, AppContext, ComponentPublicInstance, MaybeRef } from 'vue'
import type { ModalProps } from './props'
import type { ModalCommonSlot } from './symbol'

export type ModalOptions = Omit<ModalProps, 'active' | 'transfer' | 'loading' | 'autoRemove'> & {
  /**
   * Specify the app context, ensue the modal using same context
   */
  appContext: AppContext,
  /**
   * Specify whether the modal is loading
   */
  loading: MaybeRef<boolean>,
  /**
   * Another way to use default slot
   */
  renderer: ModalCommonSlot,
  /**
   * Another way to use header slot
   */
  headerRenderer: ModalCommonSlot,
  /**
   * Another way to use title slot
   */
  titleRenderer: ModalCommonSlot,
  /**
   * Another way to use close slot
   */
  closeRenderer: ModalCommonSlot,
  /**
   * Another way to use footer slot
   */
  footerRenderer: ModalCommonSlot,
}

export function useModal(options: Partial<ModalOptions> = {}): () => Promise<void> {
  if (!isClient) return noop

  const {
    appContext,
    loading,
    renderer,
    headerRenderer,
    titleRenderer,
    closeRenderer,
    footerRenderer,
    onHide,
    ...props
  } = options

  const active = ref(false)

  let instance = getCurrentInstance()

  let container: HTMLElement | undefined = document.createElement('div')
  let app: App | undefined

  if (appContext || instance) {
    const vnode = createVNode(createModal, null, null)

    vnode.appContext = appContext || instance!.appContext
    render(vnode, container)
  } else {
    app = createApp(createModal)
    app.mount(container)
  }

  document.body.appendChild(container)

  // Ensure Modal show transition is effective
  nextTick(() => {
    active.value = true
  })

  function createModal() {
    return h(
      Component,
      {
        ...props,
        active: active.value,
        transfer: false,
        autoRemove: false,
        loading: unref(loading),
        onHide: Array.isArray(onHide) ? [...onHide, destroy] : onHide ? [onHide, destroy] : destroy,
      },
      {
        header: headerRenderer,
        title: titleRenderer,
        close: closeRenderer,
        default: renderer,
        footer: footerRenderer,
      },
    )
  }

  function destroy() {
    if (instance) {
      container && render(null, container)
      instance = null
    }

    if (app) {
      app.unmount()
      app = undefined
    }

    if (container) {
      document.body.removeChild(container)
      container = undefined
    }
  }

  return () =>
    nextTick(() => {
      active.value = false
    })
}

Component.open = useModal

const Modal = Component as typeof Component & { open: typeof useModal }

export { Modal }
export { modalProps } from './props'

export type ModalExposed = ComponentPublicInstance & InstanceType<typeof Component>

export type { ModalProps, ModalCProps } from './props'
export type { ModalSlotParams } from './symbol'
