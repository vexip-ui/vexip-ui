export default {
  functional: true,
  props: {
    renderer: {
      type: Function,
      required: true
    }
  },
  render(h, context) {
    return context.props.renderer(h, ...Object.values(context.data.attrs))
  }
}
