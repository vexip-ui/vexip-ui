import '@/style/notice.scss'

import { createApp } from 'vue'
import Component from './notice.vue'
import { isNull, isObject } from '@/common/utils/common'
import { toNumber } from '@/common/utils/number'
import { destroyObject } from '@/common/utils/destroy-object'

import '@/common/icons/info-circle'
import '@/common/icons/check-circle'
import '@/common/icons/exclamation-circle'
import '@/common/icons/times-circle'

import type { App } from 'vue'
import type { Key, NoticeType, NoticePlacement, NoticeOptions, NoticeInstance } from './symbol'

type FuzzyOptions = string | NoticeOptions
type ManagerOptions = { marker?: boolean, duration?: number, placement?: NoticePlacement } & Record<
  string,
  unknown
>

interface AipMethod {
  (options: NoticeOptions): () => void,
  (title: string, duration?: number): () => void,
  (title: string, content: string, duration?: number): () => void
}

const conveniences: Record<NoticeType, { icon: string }> = {
  info: {
    icon: 'info-circle'
  },
  success: {
    icon: 'check-circle'
  },
  warning: {
    icon: 'exclamation-circle'
  },
  error: {
    icon: 'times-circle'
  }
}

const placementWhiteList: NoticePlacement[] = [
  'top-right',
  'top-left',
  'bottom-right',
  'bottom-left'
]

let count = 1

function getKey() {
  return `notice-${count++}`
}

export class NoticeManager {
  name: string
  defaults: Record<string, unknown>

  open: AipMethod
  info: AipMethod
  success: AipMethod
  warning: AipMethod
  error: AipMethod

  private _instance!: NoticeInstance
  private _container: App | null

  constructor(options: ManagerOptions = {}) {
    options = {
      ...options,
      marker: !!options.marker,
      duration: options.duration ? toNumber(options.duration) : 4000
    }

    this._container = null
    this.name = 'Notice'
    this.defaults = {}

    this.config(options)

    this.open = (title: FuzzyOptions, content?: string | number, duration?: number) => {
      return this._open(null, title, content, duration)
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

  close(key: Key) {
    if (isNull(key)) {
      this.clear()
    } else {
      this._getInstance().remove(key)
    }
  }

  config({ placement, ...others }: { placement?: NoticePlacement, [x: string]: unknown }) {
    if (placement) {
      this._getInstance().placement = placementWhiteList.includes(placement)
        ? placement
        : placementWhiteList[0]
    }

    this.defaults = { ...this.defaults, ...others }
  }

  clone() {
    return new NoticeManager(this.defaults)
  }

  clear() {
    this._getInstance().clear()
  }

  destroy() {
    this._container && this._container.unmount()
    destroyObject(this)
  }

  isDestroyed() {
    return false
  }

  install(app: App, options: ManagerOptions & { property?: string } = {}) {
    const { property, ...others } = options

    this.config(others)
    app.config.globalProperties[property || '$notice'] = this
  }

  private _getInstance() {
    if (!this._instance) {
      const container = document.createElement('div')
      // 使用 createVNode 和 render 手动控制可以有效降低开销
      // 然而使用上述方式创建的组件无法被 devTool 正确加载
      // 因此选择开销更大的 createApp 以保证 devTool 的正常运行
      const innerApp = createApp(Component)

      this._instance = innerApp.mount(container) as NoticeInstance
      this._container = innerApp

      document.body.appendChild(container.firstElementChild!)
    }

    return this._instance
  }

  private _open(
    type: null | NoticeType,
    title: FuzzyOptions,
    content?: string | number,
    _duration?: number
  ) {
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
    const notice = this._getInstance()
    const convenienceOptions = type ? conveniences[type] ?? {} : {}

    let timer: number

    const userCloseFn = options.onClose
    const onClose = () => {
      clearTimeout(timer)

      if (typeof userCloseFn === 'function') {
        return userCloseFn()
      }
    }

    const item = Object.assign({}, this.defaults, convenienceOptions, options, {
      key,
      type,
      onClose
    })

    notice.add(item)

    const duration = typeof item.duration === 'number' ? item.duration : 4000

    if (duration >= 500) {
      timer = window.setTimeout(() => {
        notice.remove(key)
      }, duration)
    }

    return () => {
      clearTimeout(timer)
      notice.remove(key)
    }
  }
}

export const Notice = new NoticeManager()
