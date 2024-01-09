import { createApp, createVNode, render } from 'vue'

import Component from './contextmenu.vue'
import { proxyExposed, unrefElement } from '@vexip-ui/hooks'
import { destroyObject, isClient } from '@vexip-ui/utils'

import type { App, MaybeRef } from 'vue'
import type { MaybeInstance } from '@vexip-ui/hooks'
import type { ContextmenuConfig, ContextmenuInstance, ContextmenuOptions, Key } from './symbol'

export type { ContextmenuConfig, ContextmenuOptions }

export class ContextmenuManager {
  name: string

  private _mountedApp: App<unknown> | null
  private _instance: ContextmenuInstance | null
  private _innerApp: App<unknown> | null
  private _container: HTMLElement | null
  private _pending: Promise<Key[] | null> | null
  private _wrapper: HTMLElement | SVGElement | null
  private _mountedEl: HTMLElement | null

  constructor() {
    this._mountedApp = null
    this._instance = null
    this._innerApp = null
    this._container = null
    this._pending = null
    this._wrapper = null
    this._mountedEl = null
    this.name = 'Contextmenu'
  }

  open(options: ContextmenuOptions) {
    if (!isClient) {
      return
    }

    const { target = document.body, ...others } = options

    this._pending = this._getInstance(target)!.openContextmenu(others)

    return this._pending
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

  install(app: App, options: { property?: string } = {}) {
    const { property } = options

    this._mountedApp = app

    if (property || !app.config.globalProperties.$contextmenu) {
      app.config.globalProperties[property || '$contextmenu'] = this
    }
  }

  private _getInstance(target: MaybeRef<string | MaybeInstance>) {
    if (!isClient) return

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
      this._instance?.handleCancel()
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

      this._instance = proxyExposed<ContextmenuInstance>(vnode)
    }

    this._mountedEl = this._container.firstElementChild as HTMLElement
    this._wrapper = unrefElement(target) || document.body

    this._wrapper.appendChild(this._mountedEl)

    return this._instance
  }
}

export const Contextmenu = new ContextmenuManager()
