import { createApp, createVNode, render } from 'vue'
import Component from './contextmenu.vue'
import { isClient, destroyObject } from '@vexip-ui/utils'

import type { App } from 'vue'
import type { Key, ContextmenuConfig, ContextmenuOptions, ContextmenuInstance } from './symbol'

export type { ContextmenuConfig, ContextmenuOptions }

export class ContextmenuManager {
  name: string

  private _mountedApp: App<unknown> | null
  private _instance: ContextmenuInstance | null
  private _innerApp: App<unknown> | null
  private _container: HTMLElement | null
  private _pending: Promise<Key[] | null> | null

  constructor() {
    this._mountedApp = null
    this._instance = null
    this._innerApp = null
    this._container = null
    this._pending = null
    this.name = 'Contextmenu'
  }

  open(options: ContextmenuOptions) {
    if (!isClient) {
      return
    }

    this._pending = this._getInstance().openContextmenu(options)

    return this._pending
  }

  destroy() {
    this._innerApp?.unmount()
    this._container && render(null, this._container)
    destroyObject(this)
  }

  isDestroyed() {
    return false
  }

  install(app: App, options: { property?: string } = {}) {
    const { property } = options

    this._mountedApp = app

    if (property || !app.config.globalProperties.$contextmenu) {
      app.config.globalProperties[property || '$contextmenu'] = this
    }
  }

  private _getInstance() {
    if (this._pending) {
      let innerApp = this._innerApp
      let container = this._container

      const unmount = () => {
        innerApp?.unmount()
        container && render(null, container)

        innerApp = null
        container = null
      }

      this._pending.finally(unmount)
      this._instance!.handleCancel()
    } else {
      this._innerApp?.unmount()
      this._container && render(null, this._container)
    }

    this._pending = null

    if (!this._mountedApp) {
      console.warn('[vexip-ui:Contextmenu]: App missing, the plugin maybe not installed.')

      this._container = document.createElement('div')
      this._innerApp = createApp(Component)
      this._instance = this._innerApp.mount(this._container) as ContextmenuInstance
    } else {
      const vnode = createVNode(Component, null, null)

      this._container = document.createElement('div')
      vnode.appContext = this._mountedApp._context

      render(vnode, this._container, false)

      this._instance = vnode.component!.proxy as ContextmenuInstance
    }

    document.body.appendChild(this._container.firstElementChild!)

    return this._instance
  }
}

export const Contextmenu = new ContextmenuManager()
