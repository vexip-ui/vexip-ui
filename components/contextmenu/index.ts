import '@/style/contextmenu.scss'

import { createApp } from 'vue'
import Component from './contextmenu.vue'
import { destroyObject } from '@/common/utils/destroy-object'

import type { App } from 'vue'
import type { MenuOptions, ContextmenuInstance } from './symbol'

export class ContextmenuManager {
  name: string

  private _instance: ContextmenuInstance | null
  private _innerApp: App<unknown> | null
  private _container: HTMLElement | null
  private _pending: Promise<any> | null

  constructor() {
    this._instance = null
    this._innerApp = null
    this._container = null
    this._pending = null
    this.name = 'Contextmenu'
  }

  open(options: MenuOptions) {
    this._pending = this._getInstance().openContextmenu(options)

    return this._pending
  }

  destroy() {
    this._innerApp?.unmount()
    this._container && document.body.removeChild(this._container.firstElementChild!)

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
      let container = this._container

      const unmount = () => {
        innerApp?.unmount()
        innerApp = null
        container = null
      }

      this._pending.finally(unmount)
      this._instance!.handleCancel()
      this._pending = null
      this._instance = null
    } else {
      this._innerApp?.unmount()
      this._container && document.body.removeChild(this._container.firstElementChild!)

      this._instance = null
      this._innerApp = null
      this._container = null
    }

    this._container = document.createElement('div')
    this._innerApp = createApp(Component)
    this._instance = this._innerApp.mount(this._container) as ContextmenuInstance

    document.body.appendChild(this._container.firstElementChild!)

    return this._instance
  }
}

export const Contextmenu = new ContextmenuManager()
