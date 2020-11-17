<template>
  <div :class="prefix">
    <slot></slot>
  </div>
</template>

<script>
import { useConfigurableProps } from '../../src/config/properties'

const { prefix } = require('../../src/style/basis/variable')

const props = useConfigurableProps({
  circle: {
    type: Boolean,
    default: false
  }
})

export default {
  name: 'ButtonGroup',
  props,
  data() {
    return {
      prefix: `${prefix}-button-group`
    }
  },
  computed: {
    className() {
      const { prefix, circle } = this

      return {
        [prefix]: true,
        [`${prefix}--circle`]: circle
      }
    }
  }
}
</script>
