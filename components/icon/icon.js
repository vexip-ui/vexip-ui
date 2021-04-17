import Icon from 'vue-awesome/components/Icon.vue'
import { config } from '@/config/properties'

Icon.name = 'Icon'

const prefix = config.defaults.prefixCls

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
