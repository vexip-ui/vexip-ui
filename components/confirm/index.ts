import { createVNode, render, markRaw } from 'vue'
import Component from './confirm.vue'
import { destroyObject } from '@vexip-ui/utils'

import type { App } from 'vue'
import type { ConfirmType, ConfirmOptions, ConfirmInstance } from './symbol'

export type { ConfirmType, ConfirmOptions }

type FuzzyOptions = string | ConfirmOptions

export class ConfirmManager {
  name: string
  defaults: Record<string, unknown>

  private _mountedApp: App<unknown> | null
  private _instance: ConfirmInstance | null
  private _container: HTMLElement | null

  constructor(options: Partial<ConfirmOptions> = {}) {
    this._mountedApp = null
    this._instance = null
    this._container = null
    this.name = 'Confirm'
    this.defaults = {}

    this.config(options)
  }

  open(content: string, type?: ConfirmType): Promise<boolean>
  open(options: ConfirmOptions): Promise<boolean>
  open(options: FuzzyOptions, type?: ConfirmType) {
    if (typeof options === 'string') {
      options = { content: options, confirmType: type }
    }

    const item: ConfirmOptions = { ...this.defaults, ...options }

    if (item.icon && typeof item.icon !== 'function') {
      item.icon = markRaw(item.icon)
    }

    return this._getInstance()?.openConfirm(item)
  }

  config(options: Record<string, unknown>) {
    this.defaults = { ...this.defaults, ...options }
  }

  clone() {
    return new ConfirmManager(this.defaults)
  }

  destroy() {
    this._container && render(null, this._container)
    destroyObject(this)
  }

  isDestroyed() {
    return false
  }

  install(app: App, options: Partial<ConfirmOptions> = {}) {
    this.config(options)
    app.config.globalProperties.$confirm = this
    this._mountedApp = app
  }

  private _getInstance() {
    if (!this._mountedApp) {
      console.warn('[vexip-ui:Confirm]: App missing, the plugin maybe not installed.')
      return null
    }

    if (!this._instance) {
      const vnode = createVNode(Component, null, null)

      this._container = document.createElement('div')
      vnode.appContext = this._mountedApp._context

      render(vnode, this._container, false)
      document.body.appendChild(this._container.firstElementChild!)

      this._instance = vnode.component!.proxy as ConfirmInstance
    }

    return this._instance
  }
}

export const Confirm = new ConfirmManager()
