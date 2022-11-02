import { createApp } from 'vue'
import Component from './contextmenu.vue'
import { isClient, destroyObject } from '@vexip-ui/utils'

import type { App } from 'vue'
import type { Key, ContextmenuConfig, ContextmenuOptions, ContextmenuInstance } from './symbol'

export type { ContextmenuConfig, ContextmenuOptions }

export class ContextmenuManager {
  name: string

  private _instance: ContextmenuInstance | null
  private _innerApp: App<unknown> | null
  private _container: HTMLElement | null
  private _pending: Promise<Key[] | null> | null

  constructor() {
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
    destroyObject(this)
  }

  isDestroyed() {
    return false
  }

  install(app: App) {
    app.config.globalProperties.$contextmenu = this
  }

  private _getInstance() {
    if (this._pending) {
      let innerApp = this._innerApp

      const unmount = () => {
        innerApp?.unmount()
        innerApp = null
      }

      this._pending.finally(unmount)
      this._instance!.handleCancel()
    } else {
      this._innerApp?.unmount()
    }

    this._container = document.createElement('div')
    this._innerApp = createApp(Component)
    this._instance = this._innerApp.mount(this._container) as ContextmenuInstance
    this._pending = null

    document.body.appendChild(this._container.firstElementChild!)

    return this._instance
  }
}

export const Contextmenu = new ContextmenuManager()
export type {} from './props'
