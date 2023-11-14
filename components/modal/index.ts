import { createApp, createVNode, getCurrentInstance, h, nextTick, ref, render } from 'vue'

import Component from './modal.vue'
import { isClient, noop } from '@vexip-ui/utils'

import type { App, AppContext, ComponentPublicInstance } from 'vue'
import type { ModalProps } from './props'
import type { ModalCommonSLot } from './symbol'

export type ModalOptions = Omit<ModalProps, 'active' | 'transfer' | 'autoRemove'> & {
  /**
   * Specify the app context, ensue the modal using same context
   */
  appContext: AppContext,
  /**
   * Another way to use default slot
   */
  renderer: ModalCommonSLot,
  /**
   * Another way to use header slot
   */
  headerRenderer: ModalCommonSLot,
  /**
   * Another way to use title slot
   */
  titleRenderer: ModalCommonSLot,
  /**
   * Another way to use close slot
   */
  closeRenderer: ModalCommonSLot,
  /**
   * Another way to use footer slot
   */
  footerRenderer: ModalCommonSLot
}

export function useModal(options: Partial<ModalOptions> = {}): () => Promise<void> {
  if (!isClient) return noop

  const {
    appContext,
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
    render(vnode, container, false)
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
        onHide: Array.isArray(onHide) ? [...onHide, destroy] : onHide ? [onHide, destroy] : destroy
      },
      {
        header: headerRenderer,
        title: titleRenderer,
        close: closeRenderer,
        default: renderer,
        footer: footerRenderer
      }
    )
  }

  function destroy() {
    if (instance) {
      container && render(null, container, false)
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
