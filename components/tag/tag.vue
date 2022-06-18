<template>
  <div :class="className" :style="style" @click="$emit('click', $event)">
    <span>
      <slot></slot>
    </span>
    <div v-if="props.closable" :class="nh.be('close')" @click.left.stop="handleClose">
      <Icon :scale="0.8">
        <Xmark></Xmark>
      </Icon>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { Icon } from '@/components/icon'
import { useNameHelper, useProps, createSizeProp, booleanProp, sizeProp } from '@vexip-ui/config'
import { Xmark } from '@vexip-ui/icons'
import { parseColorToRgba, adjustAlpha } from '@vexip-ui/utils'

import type { PropType } from 'vue'
import type { TagType } from './symbol'

const tagTypes = Object.freeze<TagType>([
  'default',
  'primary',
  'info',
  'success',
  'error',
  'warning',
  'lime',
  'pink',
  'magenta',
  'tomato',
  'orange',
  'cyan',
  'navy',
  'gold',
  'purple'
])

export default defineComponent({
  name: 'Tag',
  components: {
    Icon,
    Xmark
  },
  props: {
    size: sizeProp,
    type: String as PropType<TagType>,
    border: booleanProp,
    closable: booleanProp,
    color: String,
    simple: booleanProp,
    circle: booleanProp
  },
  emits: ['click', 'close'],
  setup(_props, { emit }) {
    const props = useProps('tag', _props, {
      size: createSizeProp(),
      type: {
        default: 'default',
        validator: (value: TagType) => tagTypes.includes(value)
      },
      border: false,
      closable: false,
      simple: false,
      circle: false
    })

    const nh = useNameHelper('tag')

    const className = computed(() => {
      return {
        [nh.b()]: true,
        [nh.bs('vars')]: true,
        [nh.bm(props.size)]: props.size !== 'default',
        [nh.bm(props.type)]: props.type,
        [nh.bm('border')]: props.border,
        [nh.bm('simple')]: props.simple,
        [nh.bm('circle')]: props.circle
      }
    })
    const style = computed(() => {
      if (props.color) {
        const baseColor = parseColorToRgba(props.color)
        const base = baseColor.toString()

        return nh.cvm({
          color: 'var(--vxp-color-white)',
          'bg-color': base,
          'b-color': base,
          'close-color': 'var(--vxp-color-white)',
          ...(props.simple || props.border
            ? {
                color: base,
                'close-color': base
              }
            : {}),
          ...(props.simple
            ? {
                'bg-color': adjustAlpha(baseColor, 0.2).toString()
              }
            : {})
        })
      }

      return {}
    })

    function handleClose() {
      if (props.closable) {
        emit('close')
      }
    }

    return {
      props,
      nh,

      className,
      style,

      handleClose
    }
  }
})
</script>
