<template>
  <div :class="className">
    <span v-if="!props.vertical && hasText" :class="nh.be('text')">
      <slot></slot>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useNameHelper, useProps, booleanProp } from '@vexip-ui/config'

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

    const nh = useNameHelper('divider')

    const hasText = computed(() => {
      return !!slots.default
    })
    const className = computed(() => {
      return [
        nh.b(),
        nh.bs('vars'),
        nh.bm(props.vertical ? 'vertical' : 'horizontal'),
        {
          [nh.bm('primary')]: !props.vertical && props.primary,
          [nh.bm('dashed')]: props.dashed,
          [nh.bm('with-text')]: !props.vertical && hasText.value,
          [nh.bm(`with-text-${props.textPosition}`)]:
            !props.vertical && hasText.value && props.textPosition !== 'center'
        }
      ]
    })

    return {
      props,
      nh,

      hasText,
      className
    }
  }
})
</script>
