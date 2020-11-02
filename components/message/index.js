import Vue from 'vue'
import Message from './message'
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

const placementWhiteList = ['top', 'bottom']

const Construct = Vue.extend(Message)

let count = 1

function getKey() {
  return `message-${count++}`
}

class MessageManager {
  constructor() {
    this.name = 'Message'
    this.defaults = {
      duration: 3000
    }
  }

  _getInstance() {
    if (!this._instance) {
      this._instance = new Construct().$mount()
      document.body.appendChild(this._instance.$el)
    }

    return this._instance
  }

  _open(type, content, _duration) {
    const options = typeof content === 'string' ? { content, duration: _duration } : content

    const key = options.key || getKey()
    const message = this._getInstance()
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

    message.add(item)

    const duration = typeof item.duration === 'number' ? item.duration : 3000

    if (duration >= 500) {
      timer = setTimeout(() => {
        message.clear(key)
      }, duration)
    }

    return () => {
      clearTimeout(timer)
      message.clear(key)
    }
  }

  open(content, duration) {
    return this._open('', content, duration)
  }

  close(key) {
    if (isNull(key)) {
      this.clearAll()
    } else {
      this._getInstance().clear(key)
    }
  }

  info(content, duration) {
    return this._open('info', content, duration)
  }

  success(content, duration) {
    return this._open('success', content, duration)
  }

  warning(content, duration) {
    return this._open('warning', content, duration)
  }

  error(content, duration) {
    return this._open('error', content, duration)
  }

  config({ placement, ...others }) {
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
}

export default new MessageManager()
