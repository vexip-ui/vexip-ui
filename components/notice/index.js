import Vue from 'vue'
import Notice from './notice'
import { isNull } from '../../src/utils/common'

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
    this.defaults = {
      marker: true,
      duration: 4000
    }
  }

  _getInstance() {
    if (!this._instance) {
      this._instance = new Construct().$mount()
      document.body.appendChild(this._instance.$el)
    }

    return this._instance
  }

  _open(type, title, content, _duration) {
    let options

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
    const convenienceOptions = conveniences[type] || {}

    let timer

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

  open(title, content, duration) {
    return this._open('', title, content, duration)
  }

  close(key) {
    if (isNull(key)) {
      this.clearAll()
    } else {
      this._getInstance().clear(key)
    }
  }

  info(title, content, duration) {
    return this._open('info', title, content, duration)
  }

  success(title, content, duration) {
    return this._open('success', title, content, duration)
  }

  warning(title, content, duration) {
    return this._open('warning', title, content, duration)
  }

  error(title, content, duration) {
    return this._open('error', title, content, duration)
  }

  config({ placement, ...others }) {
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
}

export default new NoticeManager()
