import Vue from 'vue'
import MessageComponent from './message.vue'
import { isNull } from '@/utils/common'

type FuzzyOptions = string | { [x: string]: any }

const conveniences = {
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

const placementWhiteList = ['top', 'bottom']

const Construct = Vue.extend(MessageComponent)

let count = 1

function getKey() {
  return `message-${count++}`
}

export class MessageManager {
  name: string
  defaults: { [x: string]: any }

  private _instance!: Vue

  constructor() {
    this.name = 'Message'
    this.defaults = {
      duration: 3000
    }
  }

  open(content: FuzzyOptions, duration: number) {
    return this._open('', content, duration)
  }

  close(key: string | number) {
    if (isNull(key)) {
      this.clearAll()
    } else {
      this._getInstance().clear(key)
    }
  }

  info(content: FuzzyOptions, duration: number) {
    return this._open('info', content, duration)
  }

  success(content: FuzzyOptions, duration: number) {
    return this._open('success', content, duration)
  }

  warning(content: FuzzyOptions, duration: number) {
    return this._open('warning', content, duration)
  }

  error(content: FuzzyOptions, duration: number) {
    return this._open('error', content, duration)
  }

  config({ placement, ...others }: { [x: string]: any }) {
    const message = this._getInstance()

    message.placement = placementWhiteList.includes(placement) ? placement : placementWhiteList[0]
    this.defaults = { ...this.defaults, ...others }
  }

  clone() {
    return new MessageManager()
  }

  clearAll() {
    this._getInstance().clearAll()
  }

  private _getInstance() {
    if (!this._instance) {
      this._instance = new Construct().$mount()
      document.body.appendChild(this._instance.$el)
    }

    return this._instance as any
  }

  private _open(type: string, content: FuzzyOptions, _duration: number) {
    const options = typeof content === 'string' ? { content, duration: _duration } : content

    const key = options.key || getKey()
    const message = this._getInstance()
    const convenienceOptions = conveniences[type as keyof typeof conveniences] ?? {}

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

    message.add(item)

    const duration = typeof item.duration === 'number' ? item.duration : 3000

    if (duration >= 500) {
      timer = window.setTimeout(() => {
        message.clear(key)
      }, duration)
    }

    return () => {
      clearTimeout(timer)
      message.clear(key)
    }
  }
}

export default new MessageManager()
