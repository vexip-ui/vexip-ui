import { createVNode, render, markRaw } from 'vue'
import Component from './toast.vue'
import { toNumber, destroyObject } from '@vexip-ui/utils'
import { Check, Exclamation, Xmark, Spinner } from '@vexip-ui/icons'

import type { App } from 'vue'
import type { ToastType, ToastOptions, ToastInstance } from './symbol'

type FuzzyOptions = string | ToastOptions

interface AipMethod {
  (options: ToastOptions): () => void,
  (content: string, duration?: number): () => void,
  /** @internal */
  (options: FuzzyOptions, duration?: number): () => void
}

const conveniences: Record<ToastType, { icon: Record<string, any> }> = {
  success: {
    icon: Check
  },
  warning: {
    icon: Exclamation
  },
  error: {
    icon: Xmark
  },
  loading: {
    icon: Spinner
  }
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
  private _container: HTMLElement | null

  constructor(options: Partial<ToastOptions> = {}) {
    options = {
      ...options,
      duration: options.duration ? toNumber(options.duration) : 2000
    }

    this._mountedApp = null
    this._instance = null
    this._container = null
    this.name = 'Toast'
    this.defaults = {}

    this.config(options)

    this.open = (content: FuzzyOptions, duration?: number) => {
      return this._open(null, content, duration)
    }

    this.loading = (content: FuzzyOptions, duration?: number) => {
      return this._open('loading', content, duration)
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
  }

  config(options: Record<string, unknown>) {
    this.defaults = { ...this.defaults, ...options }
  }

  clone() {
    return new ToastManager(this.defaults)
  }

  destroy() {
    this._container && render(null, this._container)
    destroyObject(this)
  }

  isDestroyed() {
    return false
  }

  install(app: App, options: Partial<ToastOptions> = {}) {
    this.config(options)
    app.config.globalProperties.$toast = this
    this._mountedApp = app
  }

  private _getInstance() {
    if (!this._mountedApp) {
      console.warn('[vexip-ui:Toast]: App missing, the plugin maybe not installed.')
      return null
    }

    if (!this._instance) {
      const vnode = createVNode(Component, null, null)

      this._container = document.createElement('div')
      vnode.appContext = this._mountedApp._context

      render(vnode, this._container, false)
      document.body.appendChild(this._container.firstElementChild!)

      this._instance = vnode.component!.proxy as ToastInstance
    }

    return this._instance
  }

  private _open(type: null | ToastType, content: FuzzyOptions, _duration?: number) {
    const options = typeof content === 'string' ? { content, duration: _duration } : content
    const convenienceOptions = type ? conveniences[type] ?? {} : {}

    let timer: ReturnType<typeof setTimeout>

    const userCloseFn = options.onClose
    const onClose = () => {
      clearTimeout(timer)

      if (typeof userCloseFn === 'function') {
        return userCloseFn()
      }
    }

    const toast = this._getInstance()
    const item: ToastOptions = { ...this.defaults, ...convenienceOptions, ...options, onClose }

    if (item.icon && typeof item.icon !== 'function') {
      item.icon = markRaw(item.icon)
    }

    toast?.openToast(item)

    const duration = typeof item.duration === 'number' ? item.duration : 2000

    if (duration >= 500) {
      timer = setTimeout(() => {
        toast?.cloasToast()
      }, duration)
    }

    return () => {
      clearTimeout(timer)
      toast?.cloasToast()
    }
  }
}

export const Toast = new ToastManager()
