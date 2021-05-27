<template>
  <div :class="className">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useConfiguredProps } from '@/common/config/install'

const props = useConfiguredProps('buttonGroup', {
  circle: {
    type: Boolean,
    default: false
  }
})

export default defineComponent({
  name: 'ButtonGroup',
  props,
  setup(props) {
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
