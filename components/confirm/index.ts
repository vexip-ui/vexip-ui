import { createApp, createVNode, markRaw, render } from 'vue'

import Component from './confirm.vue'
import { proxyExposed, unrefElement } from '@vexip-ui/hooks'
import { destroyObject, isClient } from '@vexip-ui/utils'

import type { App, MaybeRef } from 'vue'
import type { MaybeInstance } from '@vexip-ui/hooks'
import type { ConfirmButtonType, ConfirmInstance, ConfirmOptions, ConfirmState } from './symbol'

export { confirmProps } from './props'

export type { ConfirmProps, ConfirmCProps } from './props'
export type { ConfirmButtonType, ConfirmOptions, ConfirmState }

type FuzzyOptions = string | ConfirmOptions

Component.name = 'Confirm'

export class ConfirmManager {
  name: string
  defaults: Record<string, unknown>

  private _mountedApp: App<unknown> | null
  private _instance: ConfirmInstance | null
  private _innerApp: App<unknown> | null
  private _container: HTMLElement | null
  private _wrapper: HTMLElement | SVGElement | null
  private _mountedEl: HTMLElement | null

  constructor(options: Partial<ConfirmOptions> = {}) {
    this._mountedApp = null
    this._instance = null
    this._innerApp = null
    this._container = null
    this._wrapper = null
    this._mountedEl = null
    this.name = 'Confirm'
    this.defaults = {}

    this.config(options)
  }

  open(content: string, type?: ConfirmButtonType): Promise<boolean>
  open(options: ConfirmOptions): Promise<boolean>
  open(content: string, title: string, type?: ConfirmButtonType): Promise<boolean>
  open(options: FuzzyOptions, title?: string, type?: ConfirmButtonType) {
    if (!isClient) {
      return
    }

    if (typeof options === 'string') {
      if (type) {
        options = { title, content: options, confirmType: type }
      } else {
        options = { content: options, confirmType: title as ConfirmButtonType }
      }
    }

    const item: ConfirmOptions = { ...this.defaults, ...options }

    if (item.icon && typeof item.icon === 'object') {
      item.icon = markRaw(item.icon)
    }

    return this._getInstance()?.openConfirm(item)
  }

  config(options: Record<string, unknown>) {
    this.defaults = { ...this.defaults, ...options }
  }

  clone() {
    const manager = new ConfirmManager(this.defaults)

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

  install(app: App, options: Partial<ConfirmOptions> & { property?: string } = {}) {
    const { property, ...others } = options

    this.config(others)
    this._mountedApp = app

    if (property || !app.config.globalProperties.$confirm) {
      app.config.globalProperties[property || '$confirm'] = this
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
        console.warn('[vexip-ui:Confirm]: App missing, the plugin maybe not installed.')

        this._container = document.createElement('div')
        this._innerApp = createApp(Component)
        this._instance = this._innerApp.mount(this._container) as ConfirmInstance
      } else {
        const vnode = createVNode(Component, null, null)

        this._container = document.createElement('div')
        vnode.appContext = this._mountedApp._context

        render(vnode, this._container, false)

        this._instance = proxyExposed<ConfirmInstance>(vnode)
      }

      this._mountedEl = this._container.firstElementChild as HTMLElement
      ;(this._wrapper || document.body).appendChild(this._mountedEl)
    }

    return this._instance
  }
}

export const Confirm = new ConfirmManager()
