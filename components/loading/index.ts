import { createApp } from 'vue'
import Component from './loading.vue'
import { isClient, destroyObject } from '@vexip-ui/utils'

import type { App } from 'vue'
import type { LoadingState, LoadingOptions, LoadingInstance } from './symbol'

export type { LoadingState, LoadingOptions }

type InitLoadingOptions = Omit<LoadingOptions, 'percent'>

export class LoadingManager {
  name: string
  defaults: InitLoadingOptions

  private _instance: LoadingInstance | null
  private _innerApp: App<unknown> | null
  private _container: HTMLElement | null

  constructor(options: InitLoadingOptions = {}) {
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

  destroy() {
    this._innerApp?.unmount()
    destroyObject(this)
  }

  isDestroyed() {
    return false
  }

  install(app: App, options: InitLoadingOptions = {}) {
    this.config(options)
    app.config.globalProperties.$loading = this
  }

  private _getInstance() {
    if (!this._instance) {
      this._container = document.createElement('div')
      this._innerApp = createApp(Component)
      this._instance = this._innerApp.mount(this._container) as LoadingInstance

      document.body.appendChild(this._container.firstElementChild!)
    }

    return this._instance
  }
}

export const Loading = new LoadingManager()
export type {} from './props'
