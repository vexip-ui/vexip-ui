<template>
  <div :class="className" :style="style" @click="$emit('click', $event)">
    <span>
      <slot></slot>
    </span>
    <div v-if="props.closable" :class="`${prefix}__close`" @click.left.stop="handleClose">
      <Icon :scale="0.8">
        <Xmark></Xmark>
      </Icon>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { Icon } from '@/components/icon'
import { useProps, createSizeProp, booleanProp, sizeProp } from '@vexip-ui/config'
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

    const prefix = 'vxp-tag'

    const className = computed(() => {
      return {
        [prefix]: true,
        [`${prefix}-vars`]: true,
        [`${prefix}--${props.size}`]: props.size !== 'default',
        [`${prefix}--${props.type}`]: props.type,
        [`${prefix}--border`]: props.border,
        [`${prefix}--simple`]: props.simple,
        [`${prefix}--circle`]: props.circle
      }
    })
    const style = computed(() => {
      if (props.color) {
        const baseColor = parseColorToRgba(props.color)
        const base = baseColor.toString()

        return createVars({
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

    function createVars(originVars: Record<string, string>) {
      const vars: Record<string, string> = {}

      Object.keys(originVars).forEach(name => {
        vars[`--${prefix}-${name}`] = originVars[name]
      })

      return vars
    }

    function handleClose() {
      if (props.closable) {
        emit('close')
      }
    }

    return {
      props,
      prefix,

      className,
      style,

      handleClose
    }
  }
})
</script>
