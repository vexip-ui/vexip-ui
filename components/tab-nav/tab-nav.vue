<template>
  <div ref="wrapper" :class="className" tabindex="-1">
    <ul :class="nh.be('list')" role="tablist">
      <slot></slot>
    </ul>
    <div v-if="!props.card" :class="nh.be('track')" :style="markerStyle">
      <slot name="marker">
        <div :class="nh.be('marker')"></div>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, watch, provide } from 'vue'
import { useNameHelper, useProps, booleanProp, eventProp, emitEvent } from '@vexip-ui/config'
import { useDisplay } from '@vexip-ui/mixins'
import { isNull, debounceMinor } from '@vexip-ui/utils'
import { TAB_NAV_STATE } from './symbol'

import type { ItemState } from './symbol'

export default defineComponent({
  name: 'TabNav',
  props: {
    active: [String, Number],
    card: booleanProp,
    onChange: eventProp<(active: string | number) => void>()
  },
  emits: ['update:active'],
  setup(_props, { emit }) {
    const props = useProps('tabNav', _props, {
      active: {
        default: null,
        static: true
      },
      card: false
    })

    const nh = useNameHelper('tab-nav')
    const currentActive = ref(props.active)
    const markerLeft = ref(0)
    const markerWidth = ref(0)
    const itemStates = new Set<ItemState>()

    const wrapper = useDisplay(updateMarkerPosition)

    const className = computed(() => {
      return {
        [nh.b()]: true,
        [nh.bs('vars')]: true,
        [nh.bm('card')]: props.card
      }
    })
    const markerStyle = computed(() => {
      return {
        left: `${markerLeft.value}px`,
        width: `${markerWidth.value}px`
      }
    })

    const refreshLabels = debounceMinor(() => {
      const total = itemStates.size

      Array.from(itemStates).forEach((item, index) => {
        item.index = index + 1
        item.total = total

        if (isNull(item.label)) {
          item.label = index + 1
        }
      })

      if (itemStates.size >= 1 && isActiveEmpty()) {
        currentActive.value = Array.from(itemStates)[0].label
      }
    })

    provide(
      TAB_NAV_STATE,
      reactive({
        currentActive,
        handleActive,
        increaseItem,
        decreaseItem,
        refreshLabels
      })
    )

    watch(
      () => props.active,
      value => {
        currentActive.value = value
      }
    )
    watch(currentActive, value => {
      updateMarkerPosition()
      emitEvent(props.onChange, value)
      emit('update:active', value)
    })

    function isActiveEmpty() {
      return isNull(currentActive.value) || currentActive.value === ''
    }

    function increaseItem(item: ItemState) {
      itemStates.add(item)
      refreshLabels()
    }

    function decreaseItem(item: ItemState) {
      itemStates.delete(item)
      refreshLabels()
    }

    function handleActive(label: string | number) {
      currentActive.value = label
    }

    function updateMarkerPosition() {
      const activeItem = Array.from(itemStates).find(item => item.label === currentActive.value)

      if (activeItem?.el) {
        markerLeft.value = activeItem.el.offsetLeft
        markerWidth.value = activeItem.el.offsetWidth
      } else {
        markerLeft.value = 0
        markerWidth.value = 0
      }
    }

    return {
      props,
      nh,

      className,
      markerStyle,

      wrapper
    }
  }
})
</script>
