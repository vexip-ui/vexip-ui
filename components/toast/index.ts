import { createApp, createVNode, markRaw, render } from 'vue'

import Component from './toast.vue'
import { proxyExposed, unrefElement } from '@vexip-ui/hooks'
import { destroyObject, isClient, noop, toNumber } from '@vexip-ui/utils'

import type { App, MaybeRef } from 'vue'
import type { MaybeInstance } from '@vexip-ui/hooks'
import type { ToastInstance, ToastOptions, ToastType } from './symbol'

export { toastProps } from './props'

export type { ToastProps, ToastCProps } from './props'
export type { ToastType, ToastOptions }

type FuzzyOptions = string | ToastOptions

interface AipMethod {
  (options: ToastOptions): () => void,
  (content: string, duration?: number): () => void,
  /** @internal */
  (options: FuzzyOptions, duration?: number): () => void,
}

const conveniences: Record<ToastType, Record<string, any>> = {
  success: {},
  warning: {},
  error: {},
  loading: {
    showMask: true,
  },
}

export class ToastManager {
  name: string
  defaults: Record<string, unknown>

  open: AipMethod
  success: AipMethod
  warning: AipMethod
  error: AipMethod
  loading: AipMethod

  private _mountedApp: App<unknown> | null
  private _instance: ToastInstance | null
  private _innerApp: App<unknown> | null
  private _container: HTMLElement | null
  private _timer: ReturnType<typeof setTimeout> | null
  private _wrapper: HTMLElement | SVGElement | null
  private _mountedEl: HTMLElement | null

  constructor(options: Partial<ToastOptions> = {}) {
    options = {
      ...options,
      duration: options.duration ? toNumber(options.duration) : 2000,
    }

    this._mountedApp = null
    this._instance = null
    this._innerApp = null
    this._container = null
    this._timer = null
    this._wrapper = null
    this._mountedEl = null
    this.name = 'Toast'
    this.defaults = {}

    this.config(options)

    this.open = (content: FuzzyOptions, duration?: number) => {
      return this._open(null, content, duration)
    }

    this.success = (content: FuzzyOptions, duration?: number) => {
      return this._open('success', content, duration)
    }

    this.warning = (content: FuzzyOptions, duration?: number) => {
      return this._open('warning', content, duration)
    }

    this.error = (content: FuzzyOptions, duration?: number) => {
      return this._open('error', content, duration)
    }

    this.loading = (content: FuzzyOptions, duration?: number) => {
      return this._open('loading', content, duration)
    }
  }

  close() {
    this._timer && clearTimeout(this._timer)
    this._getInstance()?.closeToast()
  }

  config(options: Record<string, unknown>) {
    this.defaults = { ...this.defaults, ...options }
  }

  clone() {
    const manager = new ToastManager(this.defaults)

    manager._mountedApp = this._mountedApp

    return manager
  }

  destroy() {
    this._mountedEl && this._wrapper?.removeChild(this._mountedEl)
    this._innerApp?.unmount()
    this._container && render(null, this._container)
    destroyObject(this)
  }

  isDestroyed() {
    return false
  }

  install(app: App, options: Partial<ToastOptions> & { property?: string } = {}) {
    const { property, ...others } = options

    this.config(others)
    this._mountedApp = app

    if (property || !app.config.globalProperties.$toast) {
      app.config.globalProperties[property || '$toast'] = this
    }
  }

  transferTo(target: MaybeRef<string | MaybeInstance>) {
    if (!isClient) return

    const el = unrefElement(target)

    if (el) {
      this._wrapper = el

      if (this._instance) {
        this._mountedEl && this._wrapper.appendChild(this._mountedEl)
      } else {
        this._getInstance()
      }
    }
  }

  private _getInstance() {
    if (!this._instance && isClient) {
      if (!this._mountedApp) {
        console.warn('[vexip-ui:Toast]: App missing, the plugin maybe not installed.')

        this._container = document.createElement('div')
        this._innerApp = createApp(Component)
        this._instance = this._innerApp.mount(this._container) as ToastInstance
      } else {
        const vnode = createVNode(Component, null, null)

        this._container = document.createElement('div')
        vnode.appContext = this._mountedApp._context

        render(vnode, this._container)

        this._instance = proxyExposed<ToastInstance>(vnode)
      }

      this._mountedEl = this._container.firstElementChild as HTMLElement
      ;(this._wrapper || document.body).appendChild(this._mountedEl)
    }

    return this._instance
  }

  private _open(type: null | ToastType, content: FuzzyOptions, _duration?: number) {
    if (!isClient) {
      return noop
    }

    this._timer && clearTimeout(this._timer)

    const options = typeof content === 'string' ? { content, duration: _duration } : content
    const convenienceOptions = type ? (conveniences[type] ?? {}) : {}

    const userCloseFn = options.onClose
    const onClose = () => {
      this._timer && clearTimeout(this._timer)

      if (typeof userCloseFn === 'function') {
        return userCloseFn()
      }
    }

    const toast = this._getInstance()!
    const item: ToastOptions = {
      ...this.defaults,
      ...convenienceOptions,
      ...options,
      type: type ?? options.type,
      onClose,
    }

    if (item.icon && typeof item.icon !== 'function') {
      item.icon = markRaw(item.icon)
    }

    toast.openToast(item)

    const duration = typeof item.duration === 'number' ? item.duration : 2000

    if (duration >= 500) {
      this._timer = setTimeout(() => {
        toast.closeToast()
      }, duration)
    }

    return () => {
      this._timer && clearTimeout(this._timer)
      toast.closeToast()
    }
  }
}

export const Toast = new ToastManager()
