<template>
  <div ref="wrapper" :class="className">
    <ul :class="`${prefix}__list`">
      <slot></slot>
    </ul>
    <div v-if="!props.card" :class="`${prefix}__track`" :style="markerStyle">
      <slot name="marker">
        <div :class="`${prefix}__marker`"></div>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, watch, provide } from 'vue'
import { useProps, booleanProp } from '@vexip-ui/config'
import { useDisplay } from '@vexip-ui/mixins'
import { isNull, debounceMinor } from '@vexip-ui/utils'
import { TAB_NAV_STATE } from './symbol'

import type { ItemState } from './symbol'

export default defineComponent({
  name: 'TabNav',
  props: {
    active: [String, Number],
    card: booleanProp
  },
  emits: ['change', 'update:active'],
  setup(_props, { emit }) {
    const props = useProps('tabNav', _props, {
      active: {
        default: null,
        static: true
      },
      card: false
    })

    const prefix = ' vxp-tab-nav'
    const currentActive = ref(props.active)
    const markerLeft = ref(0)
    const markerWidth = ref(0)
    const itemStates = new Set<ItemState>()

    const wrapper = useDisplay(updateMarkerPosition)

    const className = computed(() => {
      return {
        [prefix]: true,
        [`${prefix}-vars`]: true,
        [`${prefix}--card`]: props.card
      }
    })
    const markerStyle = computed(() => {
      return {
        left: `${markerLeft.value}px`,
        width: `${markerWidth.value}px`
      }
    })

    const refreshLabels = debounceMinor(() => {
      Array.from(itemStates).forEach((item, index) => {
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
      emit('change', value)
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
      prefix,

      className,
      markerStyle,

      wrapper
    }
  }
})
</script>
