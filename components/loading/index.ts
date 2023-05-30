import { createApp, createVNode, render } from 'vue'

import Component from './loading.vue'
import { destroyObject, isClient } from '@vexip-ui/utils'

import type { App } from 'vue'
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

  constructor(options: InitLoadingOptions = {}) {
    this._mountedApp = null
    this._instance = null
    this._innerApp = null
    this._container = null
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

    this._getInstance().startLoading({ ...this.defaults, ...options })
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

  private _getInstance() {
    if (!this._instance) {
      if (!this._mountedApp) {
        console.warn('[vexip-ui:Loading]: App missing, the plugin maybe not installed.')

        this._container = document.createElement('div')
        this._innerApp = createApp(Component)
        this._instance = this._innerApp.mount(this._container) as LoadingInstance
      } else {
        const vnode = createVNode(Component, null, null)

        this._container = document.createElement('div')
        vnode.appContext = this._mountedApp._context

        render(vnode, this._container, false)

        this._instance = vnode.component!.proxy as LoadingInstance
      }

      document.body.appendChild(this._container.firstElementChild!)
    }

    return this._instance
  }
}

export const Loading = new LoadingManager()
