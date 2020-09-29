const isNotTextNode = node => node.tag || (node.isComment && node.asyncFactory)

export default {
  name: 'Condition',
  functional: true,
  props: {
    name: {
      type: String,
      default: ''
    },
    tag: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const name = context.props.name

    if (typeof context.slots !== 'function') {
      return null
    }

    const slots = context.slots()
    const vnodes = slots.default.filter(isNotTextNode)

    let renderNode = slots[name]

    if (!vnodes.length && !renderNode) {
      return slots.default
    }

    while (vnodes.length) {
      const vnode = vnodes.shift()

      if (vnode.data && vnode.data.attrs) {
        vnode.data.attrs.slot = null
      }

      if (!renderNode && vnode.data && vnode.data.slot === name) {
        renderNode = vnode
      }

      if (vnode.children && vnode.children.length) {
        vnodes.push(...vnode.children.filter(isNotTextNode))
      }
    }

    if (renderNode) {
      return renderNode
    }

    return slots.default
  }
}
