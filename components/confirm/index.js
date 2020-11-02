import Vue from 'vue'
import { isPromise } from '../../src/utils/common'
import Confirm from './confirm'

const Construct = Vue.extend(Confirm)

class ConfirmManager {
  constructor() {
    this.name = 'Confirm'
    this.defaults = {
      confirmType: 'primary',
      confirmText: '确认',
      cancelText: '取消'
    }

    this._getInstance()
  }

  _getInstance() {
    if (!this._instance) {
      this._instance = new Construct().$mount()
      document.body.appendChild(this._instance.$el)
    }

    return this._instance
  }

  open(options = {}, type) {
    if (typeof options === 'string') {
      options = { content: options, confirmType: type }
    }

    const {
      content,
      confirmType,
      confirmText,
      cancelText,
      icon,
      iconColor,
      style,
      parseHtml,
      renderer,
      beforeConfirm,
      onConfirm,
      onCancel
    } = { ...this.defaults, ...options }
    const confirm = this._getInstance()

    confirm.content = content
    confirm.style = style
    confirm.iconColor = iconColor
    confirm.parseHtml = parseHtml

    confirm.confirmType = confirmType || 'primary'
    confirm.confirmText = confirmText || '确认'
    confirm.cancelText = cancelText || '取消'
    confirm.icon = icon || 'question-circle'
    confirm.renderer = typeof renderer === 'function' ? renderer : null

    confirm.top = window.innerHeight / 2 - 200
    confirm.left = (window.innerWidth - confirm.width) / 2
    confirm.visible = true

    return new Promise(resolve => {
      confirm.onConfirm = async () => {
        if (typeof beforeConfirm === 'function') {
          let result = beforeConfirm()

          if (isPromise(result)) {
            result = await result
          }

          if (result === false) return false
        }

        resolve(true)

        if (typeof onConfirm === 'function') {
          onConfirm()
        }
      }

      confirm.onCancel = () => {
        resolve(false)

        if (typeof onCancel === 'function') {
          onCancel()
        }
      }
    })
  }
}

export default new ConfirmManager()
