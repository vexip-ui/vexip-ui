<script setup lang="ts">
import { computed } from 'vue'

import { useNameHelper, useProps } from '@vexip-ui/config'
import { toCssSize } from '@vexip-ui/utils'
import { dividerProps } from './props'

defineOptions({ name: 'Divider' })

const _props = defineProps(dividerProps)
const props = useProps('divider', _props, {
  vertical: false,
  textPosition: {
    default: 'center',
    validator: value => ['center', 'left', 'right'].includes(value),
  },
  primary: false,
  dashed: false,
  margin: null,
})

const slots = defineSlots<{ default: () => any }>()

const nh = useNameHelper('divider')

const hasText = computed(() => !!slots.default)
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
        !props.vertical && hasText.value && props.textPosition !== 'center',
    },
  ]
})
const margin = computed(() => toCssSize(props.margin))
const style = computed(() => {
  if (!margin.value) return {}

  return props.vertical
    ? {
        marginRight: margin.value,
        marginLeft: margin.value,
      }
    : {
        marginTop: margin.value,
        marginBottom: margin.value,
      }
})
</script>

<template>
  <div :class="className" role="separator" :style="style">
    <span v-if="!props.vertical && hasText" :class="nh.be('text')">
      <slot></slot>
    </span>
  </div>
</template>
