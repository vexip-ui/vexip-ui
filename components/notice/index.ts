import { createApp, createVNode, markRaw, render } from 'vue'

import Component from './notice.vue'
import { proxyExposed, unrefElement } from '@vexip-ui/hooks'
import { destroyObject, isClient, isNull, isObject, noop, toNumber } from '@vexip-ui/utils'

import type { App, MaybeRef } from 'vue'
import type { MaybeInstance } from '@vexip-ui/hooks'
import type {
  Key,
  NoticeConfig,
  NoticeInstance,
  NoticeOptions,
  NoticePlacement,
  NoticeType,
} from './symbol'

export type { NoticeConfig, NoticeType, NoticePlacement, NoticeOptions }

type FuzzyOptions = string | NoticeOptions
type ManagerOptions = { marker?: boolean, duration?: number } & NoticeConfig &
  Record<string, unknown>

interface AipMethod {
  (options: NoticeOptions): () => void,
  (title: string, duration?: number): () => void,
  (title: string, content: string, duration?: number): () => void,
  /** @internal */
  (options: FuzzyOptions, duration?: number): () => void
}

const placementWhiteList: NoticePlacement[] = [
  'top-right',
  'top-left',
  'bottom-right',
  'bottom-left',
]

let count = 1

function getKey() {
  return `notice-${count++}`
}

export class NoticeManager {
  name: string
  defaults: Record<string, unknown>

  open: AipMethod
  primary: AipMethod
  info: AipMethod
  success: AipMethod
  warning: AipMethod
  error: AipMethod

  private _mountedApp: App<unknown> | null
  private _instance: NoticeInstance | null
  private _innerApp: App<unknown> | null
  private _container: HTMLElement | null
  private _wrapper: HTMLElement | SVGElement | null
  private _mountedEl: HTMLElement | null
  private _installed: boolean
  private _configRecord: NoticeConfig | null

  constructor(options: ManagerOptions = {}) {
    options = {
      ...options,
      marker: !!options.marker,
      duration: options.duration ? toNumber(options.duration) : 4000,
    }

    this._mountedApp = null
    this._instance = null
    this._innerApp = null
    this._container = null
    this._wrapper = null
    this._mountedEl = null
    this._installed = false
    this._configRecord = null
    this.name = 'Notice'
    this.defaults = {}

    this.config(options)

    this.open = (title: FuzzyOptions, content?: string | number, duration?: number) => {
      return this._open(null, title, content, duration)
    }

    this.primary = (title: FuzzyOptions, content?: string | number, duration?: number) => {
      return this._open('primary', title, content, duration)
    }

    this.info = (title: FuzzyOptions, content?: string | number, duration?: number) => {
      return this._open('info', title, content, duration)
    }

    this.success = (title: FuzzyOptions, content?: string | number, duration?: number) => {
      return this._open('success', title, content, duration)
    }

    this.warning = (title: FuzzyOptions, content?: string | number, duration?: number) => {
      return this._open('warning', title, content, duration)
    }

    this.error = (title: FuzzyOptions, content?: string | number, duration?: number) => {
      return this._open('error', title, content, duration)
    }
  }

  judge(state: boolean, success: string, error: string, duration?: number): void
  judge(state: boolean, success: NoticeOptions, error: string, duration?: number): void
  judge(state: boolean, success: string, error: NoticeOptions, duration?: number): void
  judge(state: boolean, success: NoticeOptions, error: NoticeOptions): void
  judge(
    state: boolean,
    success: string | NoticeOptions,
    error: string | NoticeOptions,
    duration?: number,
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

  config({ placement, startOffset, itemGap, ...others }: NoticeConfig & NoticeOptions) {
    this._configRecord = { placement, startOffset, itemGap }
    this.defaults = { ...this.defaults, ...others }

    if (this._installed) {
      const instance = this._getInstance()

      if (instance) {
        if (placement) {
          instance.config({
            placement: placementWhiteList.includes(placement) ? placement : placementWhiteList[0],
          })
        }

        instance.config({ startOffset, itemGap })
      }
    }
  }

  clone() {
    const manager = new NoticeManager(this.defaults)

    manager._mountedApp = this._mountedApp
    manager._configRecord = this._configRecord
    manager._installed = this._installed

    return manager
  }

  clear() {
    this._getInstance()?.clear()
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

  install(app: App, options: ManagerOptions & { property?: string } = {}) {
    const { property, ...others } = options

    this._mountedApp = app
    this._installed = true
    this.config({ ...this._configRecord, ...others })

    if (property || !app.config.globalProperties.$notice) {
      app.config.globalProperties[property || '$notice'] = this
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
        console.warn('[vexip-ui:Notice]: App missing, the plugin maybe not installed.')

        this._container = document.createElement('div')
        this._innerApp = createApp(Component)
        this._instance = this._innerApp.mount(this._container) as NoticeInstance
      } else {
        const vnode = createVNode(Component, null, null)

        this._container = document.createElement('div')
        vnode.appContext = this._mountedApp._context

        render(vnode, this._container)

        this._instance = proxyExposed<NoticeInstance>(vnode)
      }

      this._mountedEl = this._container.firstElementChild as HTMLElement
      ;(this._wrapper || document.body).appendChild(this._mountedEl)
    }

    return this._instance
  }

  private _open(
    type: null | NoticeType,
    title: FuzzyOptions,
    content?: string | number,
    _duration?: number,
  ) {
    if (!isClient) {
      return noop
    }

    let options: NoticeOptions

    if (isObject(title)) {
      options = title
    } else {
      if (typeof content === 'number') {
        options = { title, duration: content }
      } else if (!content) {
        options = { title, duration: _duration }
      } else {
        options = { title, content, duration: _duration }
      }
    }

    const key = options.key ?? getKey()
    const notice = this._getInstance()!

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

    const item: NoticeOptions = {
      ...this.defaults,
      ...options,
      key,
      type: type ?? options.type,
      onClose,
      onEnter,
      onLeave,
    }

    if (item.icon && typeof item.icon !== 'function') {
      item.icon = markRaw(item.icon)
    }

    notice.add(item)
    setDelayClose()

    function setDelayClose() {
      const duration = typeof item.duration === 'number' ? item.duration : 4000

      if (duration >= 500) {
        timer = setTimeout(() => {
          notice.remove(key)
        }, duration)
      }
    }

    return () => {
      clearTimeout(timer)
      notice.remove(key)
    }
  }
}

export const Notice = new NoticeManager()
