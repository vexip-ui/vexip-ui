import Icon from 'vue-awesome/components/Icon'

Icon.name = 'Icon'

const { prefix } = require('../../style/basis/variable')

export default {
  name: 'Icon',
  functional: true,
  render(h, context) {
    const className = [`${prefix}-icon`]

    if (context.data.class) {
      className.push(context.data.class)
    }

    return h(
      Icon,
      {
        ...context.data,
        class: className
      },
      context.children
    )
  },
  register: Icon.register
}
