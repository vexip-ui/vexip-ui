import { createApp, createVNode, markRaw, render } from 'vue'

import Component from './message.vue'
import { proxyExposed, unrefElement } from '@vexip-ui/hooks'
import { destroyObject, isClient, isNull, noop, toNumber } from '@vexip-ui/utils'

import type { App, MaybeRef } from 'vue'
import type { MaybeInstance } from '@vexip-ui/hooks'
import type {
  Key,
  MessageConfig,
  MessageInstance,
  MessageOptions,
  MessagePlacement,
  MessageType
} from './symbol'

export type { MessageConfig, MessageType, MessagePlacement, MessageOptions }

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
  private _wrapper: HTMLElement | SVGElement | null
  private _mountedEl: HTMLElement | null

  constructor(options: ManagerOptions = {}) {
    options = {
      ...options,
      duration: options.duration ? toNumber(options.duration) : 3000
    }

    this._mountedApp = null
    this._instance = null
    this._innerApp = null
    this._container = null
    this._wrapper = null
    this._mountedEl = null
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
      this._getInstance()?.remove(key)
    }
  }

  config({ placement, ...others }: MessageConfig & MessageOptions) {
    if (placement) {
      this._getInstance()?.config({
        placement: placementWhiteList.includes(placement) ? placement : placementWhiteList[0]
      })
    }

    this.defaults = { ...this.defaults, ...others }
  }

  clone() {
    const manager = new MessageManager(this.defaults)

    manager._mountedApp = this._mountedApp

    return manager
  }

  clear() {
    this._getInstance()?.clear()
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
        console.warn('[vexip-ui:Message]: App missing, the plugin maybe not installed.')

        this._container = document.createElement('div')
        this._innerApp = createApp(Component)
        this._instance = this._innerApp.mount(this._container) as MessageInstance
      } else {
        const vnode = createVNode(Component, null, null)

        this._container = document.createElement('div')
        vnode.appContext = this._mountedApp._context

        render(vnode, this._container, false)

        this._instance = proxyExposed<MessageInstance>(vnode)
      }

      this._mountedEl = this._container.firstElementChild as HTMLElement
      ;(this._wrapper || document.body).appendChild(this._mountedEl)
    }

    return this._instance
  }

  private _open(type: null | MessageType, content: FuzzyOptions, _duration?: number) {
    if (!isClient) {
      return noop
    }

    const options = typeof content === 'string' ? { content, duration: _duration } : content

    const key = options.key ?? getKey()
    const message = this._getInstance()!

    let timer: ReturnType<typeof setTimeout>

    const userCloseFn = options.onClose
    const onClose = () => {
      clearTimeout(timer)

      if (typeof userCloseFn === 'function') {
        return userCloseFn()
      }
    }

    const userEnterFn = options.onEnter
    const onEnter = () => {
      if (options.liveOnEnter) {
        clearTimeout(timer)
      }

      if (typeof userEnterFn === 'function') {
        return userEnterFn()
      }
    }

    const userLeaveFn = options.onLeave
    const onLeave = () => {
      if (options.liveOnEnter) {
        clearTimeout(timer)
        setDelayClose()
      }

      if (typeof userLeaveFn === 'function') {
        return userLeaveFn()
      }
    }

    const item: MessageOptions = {
      ...this.defaults,
      ...options,
      key,
      type,
      onClose,
      onEnter,
      onLeave
    }

    if (item.icon && typeof item.icon !== 'function') {
      item.icon = markRaw(item.icon)
    }

    message.add(item)
    setDelayClose()

    function setDelayClose() {
      const duration = typeof item.duration === 'number' ? item.duration : 3000

      if (duration >= 500) {
        timer = setTimeout(() => {
          message.remove(key)
        }, duration)
      }
    }

    return () => {
      clearTimeout(timer)
      message.remove(key)
    }
  }
}

export const Message = new MessageManager()
