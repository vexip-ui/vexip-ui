import '@/style/contextmenu.scss'

import { createApp } from 'vue'
import Component from './contextmenu.vue'
import { destroyObject } from '@/common/utils/destroy-object'

import type { App } from 'vue'
import type { MenuOptions, ContextmenuInstance } from './symbol'

export class ContextmenuManager {
  name: string

  private _instance!: ContextmenuInstance
  private _container: App<unknown> | null

  constructor() {
    this._container = null
    this.name = 'Contextmenu'
  }

  open(options: MenuOptions) {
    return this._getInstance().openContextmenu(options)
  }

  destroy() {
    this._container && this._container.unmount()
    destroyObject(this)
  }

  isDestroyed() {
    return false
  }

  install(app: App) {
    app.config.globalProperties.$contextmenu = this
  }

  private _getInstance() {
    if (!this._instance) {
      const container = document.createElement('div')
      // 使用 createVNode 和 render 手动控制可以有效降低开销
      // 然而使用上述方式创建的组件无法被 devTool 正确加载
      // 因此选择开销更大的 createApp 以保证 devTool 的正常运行
      const innerApp = createApp(Component)

      this._instance = innerApp.mount(container) as ContextmenuInstance
      this._container = innerApp

      document.body.appendChild(container.firstElementChild!)
    }

    return this._instance
  }
}

export const Contextmenu = new ContextmenuManager()
