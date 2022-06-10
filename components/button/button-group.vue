<template>
  <div :class="className">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, provide } from 'vue'
import { useProps, booleanProp, sizeProp, createSizeProp } from '@vexip-ui/config'
import { GROUP_STATE, buttonTypes } from './symbol'

import type { PropType } from 'vue'
import type { ButtonType } from './symbol'

export default defineComponent({
  name: 'ButtonGroup',
  props: {
    size: sizeProp,
    type: String as PropType<ButtonType>,
    circle: booleanProp
  },
  setup(_props) {
    const props = useProps('buttonGroup', _props, {
      size: createSizeProp(),
      type: {
        default: 'default' as ButtonType,
        validator: (value: ButtonType) => buttonTypes.includes(value)
      },
      circle: false
    })

    const prefix = 'vxp-button-group'

    const className = computed(() => {
      return {
        [prefix]: true,
        [`${prefix}--circle`]: props.circle
      }
    })

    provide(GROUP_STATE, props)

    return {
      className
    }
  }
})
</script>
