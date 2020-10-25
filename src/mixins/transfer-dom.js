import { isNull } from './../utils/common'

const homes = new Map()

function getTarget(node = document.body) {
  if (isNull(node) || node === true) {
    return document.body
  }

  return node instanceof Node
    ? node
    : document.querySelector(node) || document.body
}

function isTransfer(transfer) {
  return !isNull(transfer) && transfer !== false
}

export default {
  props: {
    transfer: {
      type: [Boolean, String],
      default: false
    }
  },
  mounted() {
    this._initTransferDom()
  },
  updated() {
    const el = this.$refs.transfer || this.$el

    if (!homes.has(el)) {
      this._initTransferDom()

      return
    }

    const transfer = this.transfer
    const { parentNode, home, hasMoveOut, prop } = homes.get(el)

    // transfer 没有变化，无需更新
    if (transfer === prop) return

    if (!hasMoveOut && isTransfer(transfer)) {
      parentNode.replaceChild(home, el)
      getTarget(transfer).appendChild(el)

      homes.set(el, Object.assign({}, homes.get(el), { hasMoveOut: true }))
    } else if (hasMoveOut && !isTransfer(transfer)) {
      parentNode.replaceChild(el, home)

      homes.set(el, Object.assign({}, homes.get(el), { hasMoveOut: false }))
    } else if (isTransfer(transfer)) {
      getTarget(transfer).appendChild(el)
    }
  },
  destroyed() {
    const el = this.$refs.transfer || this.$el

    if (!homes.has(el)) return

    const { parentNode, hasMoveOut } = homes.get(el)

    if (hasMoveOut) {
      parentNode.appendChild(el)
    }

    homes.delete(el)
  },
  methods: {
    _initTransferDom() {
      const transfer = this.transfer
      const el = this.$refs.transfer || this.$el
      const parentNode = el.parentNode

      if (!parentNode) return

      const home = document.createComment('')

      let hasMoveOut = false

      if (isTransfer(transfer)) {
        parentNode.replaceChild(home, el)
        getTarget(transfer).appendChild(el)

        hasMoveOut = true
      }

      if (!homes.has(el)) {
        homes.set(el, { parentNode, home, hasMoveOut, prop: transfer })
      }
    }
  }
}
