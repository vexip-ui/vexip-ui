<template>
  <div :class="className">
    <span v-if="!props.vertical && hasText" :class="`${prefix}__text`">
      <slot></slot>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useProps, booleanProp } from '@vexip-ui/config'

import type { PropType } from 'vue'

export type DividerTextPosition = 'center' | 'left' | 'right'

export default defineComponent({
  name: 'Divider',
  props: {
    vertical: booleanProp,
    textPosition: String as PropType<DividerTextPosition>,
    // 字体增大加粗
    primary: booleanProp,
    dashed: booleanProp
  },
  setup(_props, { slots }) {
    const props = useProps('divider', _props, {
      vertical: false,
      textPosition: {
        default: 'center' as DividerTextPosition,
        validator: (value: DividerTextPosition) => ['center', 'left', 'right'].includes(value)
      },
      primary: false,
      dashed: false
    })

    const prefix = 'vxp-divider'

    const hasText = computed(() => {
      return !!slots.default
    })
    const className = computed(() => {
      return [
        prefix,
        `${prefix}-vars`,
        `${prefix}--${props.vertical ? 'vertical' : 'horizontal'}`,
        {
          [`${prefix}--primary`]: !props.vertical && props.primary,
          [`${prefix}--dashed`]: props.dashed,
          [`${prefix}--with-text`]: !props.vertical && hasText.value,
          [`${prefix}--with-text-${props.textPosition}`]:
            !props.vertical && hasText.value && props.textPosition !== 'center'
        }
      ]
    })

    return {
      props,
      prefix,

      hasText,
      className
    }
  }
})
</script>
