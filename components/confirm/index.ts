import '@/style/confirm.scss'

import { createApp } from 'vue'
import Component from './confirm.vue'
import { destroyObject } from '@/common/utils/destroy-object'

import type { App } from 'vue'
import type { ConfirmType, ConfirmOptions, ConfirmInstance } from './symbol'

type FuzzyOptions = string | ConfirmOptions

export class ConfirmManager {
  name: string
  defaults: Record<string, unknown>

  private _instance: ConfirmInstance | null
  private _innerApp: App<unknown> | null
  private _container: HTMLElement | null

  constructor(options: Partial<ConfirmOptions> = {}) {
    this._instance = null
    this._innerApp = null
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

    return this._getInstance().openConfirm({ ...this.defaults, ...options })
  }

  config(options: Record<string, unknown>) {
    this.defaults = { ...this.defaults, ...options }
  }

  destroy() {
    this._innerApp?.unmount()
    destroyObject(this)
  }

  isDestroyed() {
    return false
  }

  install(app: App, options: Partial<ConfirmOptions> = {}) {
    this.config(options)
    app.config.globalProperties.$confirm = this
  }

  private _getInstance() {
    if (!this._instance) {
      this._container = document.createElement('div')
      // 使用 createVNode 和 render 手动控制可以有效降低开销
      // 然而使用上述方式创建的组件无法被 devTool 正确加载
      // 因此选择开销更大的 createApp 以保证 devTool 的正常运行
      this._innerApp = createApp(Component)
      this._instance = this._innerApp.mount(this._container) as ConfirmInstance

      document.body.appendChild(this._container.firstElementChild!)
    }

    return this._instance
  }
}

export const Confirm = new ConfirmManager()
