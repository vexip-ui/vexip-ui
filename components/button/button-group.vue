<template>
  <div :class="className" role="group">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, provide, reactive, toRef } from 'vue'

import { useNameHelper, useProps } from '@vexip-ui/config'
import { debounceMinor } from '@vexip-ui/utils'
import { buttonGroupProps } from './props'
import { GROUP_STATE, buttonTypes } from './symbol'

import type { ButtonState, ButtonType } from './symbol'

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
    const itemStates = reactive(new Set<ButtonState>())
    const size = toRef(props, 'size')
    const type = toRef(props, 'type')

    const className = computed(() => {
      return {
        [nh.b()]: true,
        [nh.bm('inherit')]: props.inherit,
        [nh.bm('circle')]: props.circle
      }
    })
    const itemList = computed(() => Array.from(itemStates))

    const refreshIndexes = debounceMinor(() => {
      for (let i = 0, len = itemList.value.length; i < len; ++i) {
        const item = itemList.value[i]

        item.index = i + 1
        item.isLast = i === len - 1
      }
    })

    provide(
      GROUP_STATE,
      reactive({
        size,
        type,
        increaseItem,
        decreaseItem,
        refreshIndexes
      })
    )

    function increaseItem(item: ButtonState) {
      itemStates.add(item)
      refreshIndexes()
    }

    function decreaseItem(item: ButtonState) {
      itemStates.delete(item)
      refreshIndexes()
    }

    return {
      className
    }
  }
})
</script>
