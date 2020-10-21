import Vue from 'vue'
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

  open(options = {}) {
    if (typeof options === 'string') {
      options = { content: options }
    }

    const {
      content,
      confirmType,
      confirmText,
      cancelText,
      onConfirm,
      onCancel
    } = { ...this.defaults, ...options }
    const confirm = this._getInstance()

    confirm.content = content
    confirm.confirmType = confirmType || 'primary'
    confirm.confirmText = confirmText || '确认'
    confirm.cancelText = cancelText || '取消'

    confirm.top = window.innerHeight / 2 - 200
    confirm.left = (window.innerWidth - confirm.width) / 2
    confirm.visible = true

    return new Promise(resolve => {
      confirm.onConfirm = () => {
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
