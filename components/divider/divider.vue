<template>
  <div :class="className">
    <span v-if="!vertical && hasText" :class="`${prefix}__text`">
      <slot></slot>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useConfiguredProps } from '@/common/config/install'

export type DividerTextPosition = 'center' | 'left' | 'right'

const props = useConfiguredProps('divider', {
  vertical: {
    type: Boolean,
    default: false
  },
  textPosition: {
    default: 'center' as DividerTextPosition,
    validator(value: DividerTextPosition) {
      return ['center', 'left', 'right'].includes(value)
    }
  },
  // 字体增大加粗
  primary: {
    type: Boolean,
    default: false
  },
  dashed: {
    type: Boolean,
    default: false
  }
})

export default defineComponent({
  name: 'Divider',
  props,
  setup(props, { slots }) {
    const prefix = 'vxp-divider'

    const hasText = computed(() => {
      return !!slots.default
    })
    const className = computed(() => {
      return [
        prefix,
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
      prefix,

      hasText,
      className
    }
  }
})
</script>
