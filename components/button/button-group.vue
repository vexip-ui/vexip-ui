<template>
  <div :class="className" role="group">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, provide } from 'vue'
import { useNameHelper, useProps } from '@vexip-ui/config'
import { buttonGroupProps } from './props'
import { GROUP_STATE, buttonTypes } from './symbol'

import type { ButtonType } from './symbol'

export default defineComponent({
  name: 'ButtonGroup',
  props: buttonGroupProps,
  setup(_props) {
    const props = useProps('buttonGroup', _props, {
      size: null,
      type: {
        default: 'default' as ButtonType,
        validator: (value: ButtonType) => buttonTypes.includes(value)
      },
      circle: false
    })

    const nh = useNameHelper('button-group')

    const className = computed(() => {
      return {
        [nh.b()]: true,
        [nh.bm('inherit')]: props.inherit,
        [nh.bm('circle')]: props.circle
      }
    })

    provide(GROUP_STATE, props)

    return {
      className
    }
  }
})
</script>
