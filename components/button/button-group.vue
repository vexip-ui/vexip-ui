<template>
  <div :class="className">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useProps, booleanProp } from '@vexip-ui/config'

export default defineComponent({
  name: 'ButtonGroup',
  props: {
    circle: booleanProp
  },
  setup(_props) {
    const props = useProps('buttonGroup', _props, {
      circle: false
    })

    const prefix = 'vxp-button-group'

    const className = computed(() => {
      return {
        [prefix]: true,
        [`${prefix}--circle`]: props.circle
      }
    })

    return {
      className
    }
  }
})
</script>
