import Vue from 'vue'
import NoticeComponent from './notice.vue'
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

const placementWhiteList = [
  'top-right',
  'top-left',
  'bottom-right',
  'bottom-left'
]

const Construct = Vue.extend(NoticeComponent)

let count = 1

function getKey() {
  return `notice-${count++}`
}

export class NoticeManager {
  name: string
  defaults: { [x: string]: any }

  private _instance!: Vue

  constructor() {
    this.name = 'Notice'
    this.defaults = {
      marker: true,
      duration: 4000
    }
  }

  open(title: FuzzyOptions, content: FuzzyOptions, duration: number) {
    return this._open('', title, content, duration)
  }

  close(key: string | string) {
    if (isNull(key)) {
      this.clearAll()
    } else {
      this._getInstance().clear(key)
    }
  }

  info(title: FuzzyOptions, content: FuzzyOptions, duration: number) {
    return this._open('info', title, content, duration)
  }

  success(title: FuzzyOptions, content: FuzzyOptions, duration: number) {
    return this._open('success', title, content, duration)
  }

  warning(title: FuzzyOptions, content: FuzzyOptions, duration: number) {
    return this._open('warning', title, content, duration)
  }

  error(title: FuzzyOptions, content: FuzzyOptions, duration: number) {
    return this._open('error', title, content, duration)
  }

  config({ placement, ...others }: { [x: string]: any }) {
    const notice = this._getInstance()

    notice.placement = placementWhiteList.includes(placement) ? placement : placementWhiteList[0]
    this.defaults = { ...this.defaults, ...others }
  }

  clone() {
    return new NoticeManager()
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

  private _open(type: string, title: FuzzyOptions, content: FuzzyOptions, _duration: number) {
    let options: { [x: string]: any }

    if (typeof title === 'object') {
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

    const key = options.key || getKey()
    const notice = this._getInstance()
    const convenienceOptions = conveniences[type as keyof typeof conveniences] || {}

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
      timer = setTimeout(() => {
        notice.clear(key)
      }, duration)
    }

    return () => {
      clearTimeout(timer)
      notice.clear(key)
    }
  }
}

export default new NoticeManager()
