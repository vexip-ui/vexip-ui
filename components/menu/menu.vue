<template>
  <ul ref="wrapper" :class="className">
    <slot></slot>
  </ul>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  computed,
  watch,
  onMounted,
  nextTick,
  provide,
  toRef
} from 'vue'
import { useConfiguredProps } from '@vexip-ui/config'
import { MENU_STATE } from './symbol'

import type { TooltipTheme } from '@/components/tooltip'
import type { MenuMarkerType, MenuGroupType, MenuTheme, MenuItemState, MenuState } from './symbol'

const props = useConfiguredProps('menu', {
  active: {
    type: String,
    default: null
  },
  accordion: {
    type: Boolean,
    default: false
  },
  markerType: {
    default: 'right' as MenuMarkerType,
    validator: (value: MenuMarkerType) => {
      return ['top', 'right', 'bottom', 'left', 'none'].includes(value)
    }
  },
  reduced: {
    type: Boolean,
    default: false
  },
  horizontal: {
    type: Boolean,
    default: false
  },
  groupType: {
    default: 'collapse' as MenuGroupType,
    validator: (value: MenuGroupType) => {
      return ['collapse', 'dropdown'].includes(value)
    }
  },
  theme: {
    default: 'light' as MenuTheme,
    validator: (value: MenuTheme) => {
      return ['light', 'dark'].includes(value)
    }
  },
  tooltipTheme: {
    default: 'dark' as TooltipTheme,
    validator: (value: TooltipTheme) => {
      return ['light', 'dark'].includes(value)
    }
  }
})

export default defineComponent({
  name: 'Menu',
  props,
  emits: ['on-select', 'on-expand', 'on-reduce', 'update:active'],
  setup(props, { emit }) {
    const prefix = 'vxp-menu'
    const menuItemSet = new Set<MenuItemState>()
    const currentActive = ref(props.active)
    const isReduced = ref(false)

    const wrapper = ref<HTMLElement | null>(null)

    const className = computed(() => {
      let computedMarkerType

      if (props.horizontal && (props.markerType === 'left' || props.markerType === 'right')) {
        computedMarkerType = 'bottom'
      } else if (
        !props.horizontal &&
        (props.markerType === 'top' || props.markerType === 'bottom')
      ) {
        computedMarkerType = 'right'
      } else {
        computedMarkerType = props.markerType ?? (props.horizontal ? 'bottom' : 'right')
      }

      return [
        prefix,
        `${prefix}-vars`,
        `${prefix}--${props.theme}`,
        `${prefix}--marker-${computedMarkerType}`,
        {
          [`${prefix}--reduced`]: isReduced.value,
          [`${prefix}--dropdown`]: props.groupType === 'dropdown',
          [`${prefix}--horizontal`]: props.horizontal
        }
      ]
    })

    provide<MenuState>(
      MENU_STATE,
      reactive({
        horizontal: toRef(props, 'horizontal'),
        accordion: toRef(props, 'accordion'),
        groupType: toRef(props, 'groupType'),
        theme: toRef(props, 'theme'),
        tooltipTheme: toRef(props, 'tooltipTheme'),
        currentActive,
        isReduced,
        handleSelect,
        handleExpand,
        increaseItem,
        decreaseItem
      })
    )

    watch(
      () => props.active,
      value => {
        if (value !== currentActive.value) {
          handleSelect(value)
        }
      }
    )
    watch(
      () => props.reduced,
      value => {
        if (props.horizontal) return

        if (value) {
          handleMenuReduce()
        } else {
          handleMenuExpand()
        }
      }
    )

    onMounted(() => {
      nextTick(() => {
        if (!props.horizontal && props.reduced) handleMenuReduce()
      })
    })

    function increaseItem(state: MenuItemState) {
      menuItemSet.add(state)
    }

    function decreaseItem(state: MenuItemState) {
      menuItemSet.delete(state)
    }

    function handleSelect(label: string) {
      if (currentActive.value !== label) {
        currentActive.value = label

        emit('on-select', label)
        emit('update:active', label)
      }
    }

    function handleExpand(label: string, expanded: boolean) {
      if (expanded) {
        emit('on-expand', label)
      } else {
        emit('on-reduce', label)
      }
    }

    function handleMenuReduce() {
      let firstExpandedItem: MenuItemState | null = null

      for (const item of menuItemSet) {
        if (!firstExpandedItem && item.groupExpanded) {
          firstExpandedItem = item
        }

        item.toggleGroupExpanded(false)
      }

      const handler = () => {
        isReduced.value = true
      }

      if (firstExpandedItem?.el) {
        const el = firstExpandedItem.el
        const callback = () => {
          nextTick(handler)
          el.removeEventListener('transitionend', callback)
        }

        el.addEventListener('transitionend', callback)
      } else {
        handler()
      }
    }

    function handleMenuExpand() {
      isReduced.value = false

      if (wrapper.value) {
        const el = wrapper.value
        const callback = () => {
          const selectedItem = Array.from(menuItemSet).find(
            item => item.label === currentActive.value
          )

          if (selectedItem) {
            let parent = selectedItem.parentState

            while (parent) {
              parent.groupExpanded = true
              parent = parent.parentState
            }
          }

          el.removeEventListener('transitionend', callback)
        }

        el.addEventListener('transitionend', callback)
      }
    }

    return {
      className,

      wrapper
    }
  }
})
</script>
