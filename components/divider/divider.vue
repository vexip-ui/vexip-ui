<template>
  <div :class="className" role="separator">
    <span v-if="!props.vertical && hasText" :class="nh.be('text')">
      <slot></slot>
    </span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import { useNameHelper, useProps } from '@vexip-ui/config'
import { dividerProps } from './props'

export default defineComponent({
  name: 'Divider',
  props: dividerProps,
  setup(_props, { slots }) {
    const props = useProps('divider', _props, {
      vertical: false,
      textPosition: {
        default: 'center',
        validator: value => ['center', 'left', 'right'].includes(value)
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
          [nh.bm('inherit')]: props.inherit,
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
