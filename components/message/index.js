import Vue from 'vue'
import Message from './message'

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

  _open(type, options) {
    if (typeof options === 'string') {
      options = { content: options }
    }

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

  open(options) {
    return this._open('', options)
  }

  close(key) {
    const message = this._getInstance()

    return message.clear(key)
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

    const message = this._getInstance()

    message.placement = placement

    return true
  }

  // destroy () {
  //   const message = this._getInstance()

  //   message.$destroy()
  //   this._instance = null
  // }

  clone() {
    return new MessageManager()
  }

  clearAll() {
    this._getInstance().clearAll()
  }
}

export default new MessageManager()
