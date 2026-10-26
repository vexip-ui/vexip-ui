import { createApp, createVNode, render } from 'vue'

import Component from './loading.vue'
import { proxyExposed, unrefElement } from '@vexip-ui/hooks'
import { destroyObject, isClient } from '@vexip-ui/utils'

import type { App, MaybeRef } from 'vue'
import type { MaybeInstance } from '@vexip-ui/hooks'
import type { LoadingInstance, LoadingOptions, LoadingState } from './symbol'

export type { LoadingState, LoadingOptions }

type InitLoadingOptions = Omit<LoadingOptions, 'percent'>

export class LoadingManager {
  name: string
  defaults: InitLoadingOptions

  private _mountedApp: App<unknown> | null
  private _instance: LoadingInstance | null
  private _innerApp: App<unknown> | null
  private _container: HTMLElement | null
  private _wrapper: HTMLElement | SVGElement | null
  private _mountedEl: HTMLElement | null

  constructor(options: InitLoadingOptions = {}) {
    this._mountedApp = null
    this._instance = null
    this._innerApp = null
    this._container = null
    this._wrapper = null
    this._mountedEl = null
    this.name = 'Loading'
    this.defaults = {}

    this.config(options)
  }

  open(percent: number): void
  open(options: LoadingOptions): void
  open(options: number | LoadingOptions) {
    if (!isClient) return

    if (typeof options === 'number') {
      options = { percent: options }
    }

    this._getInstance()!.startLoading({ ...this.defaults, ...options })
  }

  close() {
    this.open(100)
  }

  config(options: InitLoadingOptions) {
    this.defaults = { ...this.defaults, ...options }
  }

  clone() {
    const manager = new LoadingManager(this.defaults)

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

  install(app: App, options: InitLoadingOptions & { property?: string } = {}) {
    const { property, ...others } = options

    this.config(others)
    this._mountedApp = app

    if (property || !app.config.globalProperties.$loading) {
      app.config.globalProperties[property || '$loading'] = this
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
        console.warn('[vexip-ui:Loading]: App missing, the plugin maybe not installed.')

        this._container = document.createElement('div')
        this._innerApp = createApp(Component)
        this._instance = this._innerApp.mount(this._container) as LoadingInstance
      } else {
        const vnode = createVNode(Component, null, null)

        this._container = document.createElement('div')
        vnode.appContext = this._mountedApp._context

        render(vnode, this._container)

        this._instance = proxyExposed<LoadingInstance>(vnode)
      }

      this._mountedEl = this._container.firstElementChild as HTMLElement
      ;(this._wrapper || document.body).appendChild(this._mountedEl)
    }

    return this._instance
  }
}

export const Loading = new LoadingManager()
