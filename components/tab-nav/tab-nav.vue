<template>
  <div ref="wrapper" :class="className" tabindex="-1">
    <ul :class="nh.be('list')" role="tablist">
      <ResizeObserver :on-resize="updateMarkerPosition">
        <li :class="[nh.be('extra'), nh.bem('extra', 'prefix')]">
          <div v-if="$slots.prefix" :class="nh.be('prefix')">
            <slot name="prefix"></slot>
          </div>
        </li>
      </ResizeObserver>
      <slot>
        <TabNavItem
          v-for="item in items"
          :key="item.label"
          :label="item.label"
          :icon="item.icon"
          :disabled="item.disabled"
          :closable="item.closable"
          @toggle="item.onToggle"
        >
          {{ item.content || item.label }}
        </TabNavItem>
      </slot>
      <li v-if="props.showAdd || $slots.add" :class="nh.be('item')" role="none">
        <div :class="nh.be('pad')"></div>
        <button :class="nh.be('add')" @click="handleAdd">
          <slot name="add">
            <Icon :scale="1.2">
              <Plus></Plus>
            </Icon>
          </slot>
        </button>
      </li>
      <ResizeObserver :on-resize="updateMarkerPosition">
        <li :class="[nh.be('extra'), nh.bem('extra', 'suffix')]">
          <div v-if="$slots.suffix" :class="nh.be('suffix')">
            <slot name="suffix"></slot>
          </div>
        </li>
      </ResizeObserver>
    </ul>
    <div v-if="!props.card" :class="nh.be('track')" :style="markerStyle">
      <slot name="marker">
        <div :class="nh.be('marker')"></div>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRef, computed, watch, onMounted, provide } from 'vue'
import { Icon } from '@/components/icon'
import { ResizeObserver } from '@/components/resize-observer'
import { TabNavItem } from '@/components/tab-nav-item'
import { useNameHelper, useProps, emitEvent } from '@vexip-ui/config'
import { Plus } from '@vexip-ui/icons'
import { useDisplay } from '@vexip-ui/hooks'
import { isNull, debounceMinor } from '@vexip-ui/utils'
import { tabNavProps } from './props'
import { TAB_NAV_STATE } from './symbol'

import type { ItemState } from './symbol'

type ChangeListener = (label: string | number) => void

const trackStyleMap = {
  top: ['left', 'width'],
  right: ['top', 'height'],
  bottom: ['left', 'width'],
  left: ['top', 'height']
} as const

export default defineComponent({
  name: 'TabNav',
  components: {
    Icon,
    ResizeObserver,
    TabNavItem,
    Plus
  },
  props: tabNavProps,
  emits: ['update:active'],
  setup(_props, { emit }) {
    const props = useProps('tabNav', _props, {
      active: {
        default: null,
        static: true
      },
      card: false,
      options: {
        default: () => [],
        static: true
      },
      align: 'left',
      placement: 'top',
      closable: false,
      showAdd: false
    })

    const nh = useNameHelper('tab-nav')
    const currentActive = ref(props.active)
    const markerPosition = ref(0)
    const markerSize = ref(0)
    const itemStates = new Set<ItemState>()

    const wrapper = useDisplay(updateMarkerPosition)

    const className = computed(() => {
      return {
        [nh.b()]: true,
        [nh.bs('vars')]: true,
        [nh.bm('inherit')]: props.inherit,
        [nh.bm(`align-${props.align}`)]: true,
        [nh.bm(props.placement)]: true,
        [nh.bm('card')]: props.card
      }
    })
    const markerStyle = computed(() => {
      const [position, length] = trackStyleMap[props.placement]

      return {
        [position]: `${markerPosition.value}px`,
        [length]: `${markerSize.value}px`
      }
    })
    const items = computed(() => {
      return props.options.map(item => {
        if (typeof item === 'string' || typeof item === 'number') {
          return { label: item }
        }

        return item
      })
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
        closable: toRef(props, 'closable'),
        increaseItem,
        decreaseItem,
        handleActive,
        handleClose,
        refreshLabels
      })
    )

    watch(
      () => props.active,
      value => {
        currentActive.value = value
      }
    )
    watch(
      () => props.placement,
      () => {
        requestAnimationFrame(updateMarkerPosition)
      }
    )

    onMounted(updateMarkerPosition)

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

      updateMarkerPosition()
      emitEvent(props.onChange as ChangeListener, label)
      emit('update:active', label)
    }

    function handleAdd() {
      emitEvent(props.onAdd)
    }

    function handleClose(label: string | number) {
      emitEvent(props.onClose as ChangeListener, label)

      requestAnimationFrame(updateMarkerPosition)
    }

    function updateMarkerPosition() {
      const activeItem = Array.from(itemStates).find(item => item.label === currentActive.value)

      if (activeItem?.el) {
        if (props.placement === 'top' || props.placement === 'bottom') {
          markerPosition.value = activeItem.el.offsetLeft
          markerSize.value = activeItem.el.offsetWidth
        } else {
          markerPosition.value = activeItem.el.offsetTop
          markerSize.value = activeItem.el.offsetHeight
        }
      } else {
        markerPosition.value = 0
        markerSize.value = 0
      }
    }

    return {
      props,
      nh,

      className,
      markerStyle,
      items,

      wrapper,

      updateMarkerPosition,
      handleAdd
    }
  }
})
</script>
