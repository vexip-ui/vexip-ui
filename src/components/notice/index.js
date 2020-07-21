import Vue from 'vue'
import Notice from './notice'

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

const Construct = Vue.extend(Notice)

let count = 1

function getKey() {
  return `notice-${count++}`
}

class NoticeManager {
  constructor() {
    this.name = 'Notice'
    this.defaultDuration = 4000
  }

  _getInstance() {
    if (!this._instance) {
      this._instance = new Construct().$mount()
      document.body.appendChild(this._instance.$el)
    }

    return this._instance
  }

  _open(type, options) {
    if (typeof options === 'string') {
      options = { content: options }
    }

    const key = options.key || getKey()
    const notice = this._getInstance()
    const convenienceOptions = conveniences[type] || {}

    let timer

    const userCloseFn = options.onClose
    const onClose = () => {
      clearTimeout(timer)

      if (typeof userCloseFn === 'function') {
        return userCloseFn()
      }
    }

    const item = Object.assign({}, convenienceOptions, options, {
      key,
      type,
      onClose
    })

    notice.add(item)

    const duration =
      typeof item.duration === 'number' ? item.duration : this.defaultDuration

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

  open(options) {
    return this._open('', options)
  }

  close(key) {
    const notice = this._getInstance()

    return notice.clear(key)
  }

  info(options) {
    return this._open('info', options)
  }

  success(options) {
    return this._open('success', options)
  }

  warning(options) {
    return this._open('warning', options)
  }

  error(options) {
    return this._open('error', options)
  }

  config({ placement }) {
    if (!placementWhiteList.includes(placement)) {
      return false
    }

    const notice = this._getInstance()

    notice.placement = placement

    return true
  }

  // destroy () {
  //   const notice = this._getInstance()

  //   notice.$destroy()
  //   this._instance = null
  // }

  clone() {
    return new NoticeManager()
  }

  clearAll() {
    this._getInstance().clearAll()
  }
}

export default new NoticeManager()
