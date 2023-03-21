import { createApp, markRaw, createVNode, render } from 'vue'
import Component from './message.vue'
import { isClient, isNull, noop, toNumber, destroyObject } from '@vexip-ui/utils'

import type { App } from 'vue'
import type { Key, MessageType, MessagePlacement, MessageOptions, MessageInstance } from './symbol'

export type { MessageType, MessagePlacement, MessageOptions }

type FuzzyOptions = string | MessageOptions
type ManagerOptions = { duration?: number, placement?: MessagePlacement } & Record<string, unknown>

interface AipMethod {
  (options: MessageOptions): () => void,
  (content: string, duration?: number): () => void,
  /** @internal */
  (options: FuzzyOptions, duration?: number): () => void
}

const placementWhiteList: MessagePlacement[] = ['top', 'bottom']

let count = 1

function getKey() {
  return `message-${count++}`
}

export class MessageManager {
  name: string
  defaults: Record<string, unknown>

  open: AipMethod
  info: AipMethod
  success: AipMethod
  warning: AipMethod
  error: AipMethod

  private _mountedApp: App<unknown> | null
  private _instance: MessageInstance | null
  private _innerApp: App<unknown> | null
  private _container: HTMLElement | null

  constructor(options: ManagerOptions = {}) {
    options = {
      ...options,
      duration: options.duration ? toNumber(options.duration) : 3000
    }

    this._mountedApp = null
    this._instance = null
    this._innerApp = null
    this._container = null
    this.name = 'Message'
    this.defaults = {}

    this.config(options)

    this.open = (content: FuzzyOptions, duration?: number) => {
      return this._open(null, content, duration)
    }

    this.info = (content: FuzzyOptions, duration?: number) => {
      return this._open('info', content, duration)
    }

    this.success = (content: FuzzyOptions, duration?: number) => {
      return this._open('success', content, duration)
    }

    this.warning = (content: FuzzyOptions, duration?: number) => {
      return this._open('warning', content, duration)
    }

    this.error = (content: FuzzyOptions, duration?: number) => {
      return this._open('error', content, duration)
    }
  }

  judge(state: boolean, success: string, error: string, duration?: number): void
  judge(state: boolean, success: MessageOptions, error: string, duration?: number): void
  judge(state: boolean, success: string, error: MessageOptions, duration?: number): void
  judge(state: boolean, success: MessageOptions, error: MessageOptions): void
  judge(
    state: boolean,
    success: string | MessageOptions,
    error: string | MessageOptions,
    duration?: number
  ) {
    if (state) {
      this.success(success, duration)
    } else {
      this.error(error, duration)
    }
  }

  close(key: Key) {
    if (isNull(key)) {
      this.clear()
    } else {
      this._getInstance().remove(key)
    }
  }

  config({ placement, ...others }: { placement?: MessagePlacement, [x: string]: unknown }) {
    if (placement) {
      this._getInstance().placement = placementWhiteList.includes(placement)
        ? placement
        : placementWhiteList[0]
    }

    this.defaults = { ...this.defaults, ...others }
  }

  clone() {
    const manager = new MessageManager(this.defaults)

    manager._mountedApp = this._mountedApp

    return manager
  }

  clear() {
    this._getInstance().clear()
  }

  destroy() {
    this._innerApp?.unmount()
    this._container && render(null, this._container)
    destroyObject(this)
  }

  isDestroyed() {
    return false
  }

  install(app: App, options: ManagerOptions & { property?: string } = {}) {
    const { property, ...others } = options

    this.config(others)
    this._mountedApp = app

    if (property || !app.config.globalProperties.$message) {
      app.config.globalProperties[property || '$message'] = this
    }
  }

  private _getInstance() {
    if (!this._instance) {
      if (!this._mountedApp) {
        console.warn('[vexip-ui:Message]: App missing, the plugin maybe not installed.')

        this._container = document.createElement('div')
        this._innerApp = createApp(Component)
        this._instance = this._innerApp.mount(this._container) as MessageInstance
      } else {
        const vnode = createVNode(Component, null, null)

        this._container = document.createElement('div')
        vnode.appContext = this._mountedApp._context

        render(vnode, this._container, false)

        this._instance = vnode.component!.proxy as MessageInstance
      }

      document.body.appendChild(this._container.firstElementChild!)
    }

    return this._instance
  }

  private _open(type: null | MessageType, content: FuzzyOptions, _duration?: number) {
    if (!isClient) {
      return noop
    }

    const options = typeof content === 'string' ? { content, duration: _duration } : content

    const key = options.key ?? getKey()
    const message = this._getInstance()

    let timer: ReturnType<typeof setTimeout>

    const userCloseFn = options.onClose
    const onClose = () => {
      clearTimeout(timer)

      if (typeof userCloseFn === 'function') {
        return userCloseFn()
      }
    }

    const item: MessageOptions = {
      ...this.defaults,
      ...options,
      key,
      type,
      onClose
    }

    if (item.icon && typeof item.icon !== 'function') {
      item.icon = markRaw(item.icon)
    }

    message.add(item)

    const duration = typeof item.duration === 'number' ? item.duration : 3000

    if (duration >= 500) {
      timer = setTimeout(() => {
        message.remove(key)
      }, duration)
    }

    return () => {
      clearTimeout(timer)
      message.remove(key)
    }
  }
}

export const Message = new MessageManager()
