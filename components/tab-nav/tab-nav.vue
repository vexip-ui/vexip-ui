<template>
  <div ref="wrapper" :class="className" tabindex="-1">
    <ResizeObserver :on-resize="updateMarkerPosition">
      <div :class="[nh.be('extra'), nh.bem('extra', 'prefix')]">
        <div v-if="$slots.prefix" :class="nh.be('prefix')">
          <slot name="prefix"></slot>
        </div>
      </div>
    </ResizeObserver>
    <Scroll
      ref="scroll"
      :class="nh.be('scroll')"
      :mode="scrollMode"
      :delta-x="40"
      :delta-y="40"
      scroll-tag="ul"
      :scroll-class="nh.be('list')"
      :scroll-attrs="{ role: 'tablist' }"
    >
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
        <button type="button" :class="nh.be('add')" @click="handleAdd">
          <slot name="add">
            <Icon v-bind="icons.plus" :scale="(icons.plus.scale || 1) * 1.2"></Icon>
          </slot>
        </button>
      </li>
      <div
        v-if="!props.card"
        :class="nh.be('track')"
        role="none"
        :style="markerStyle"
      >
        <slot name="marker">
          <div :class="nh.be('marker')"></div>
        </slot>
      </div>
    </Scroll>
    <ResizeObserver :on-resize="updateMarkerPosition">
      <div :class="[nh.be('extra'), nh.bem('extra', 'suffix')]">
        <div v-if="$slots.suffix" :class="nh.be('suffix')">
          <slot name="suffix"></slot>
        </div>
      </div>
    </ResizeObserver>
  </div>
</template>

<script lang="ts">
import { Icon } from '@/components/icon'
import { ResizeObserver } from '@/components/resize-observer'
import { Scroll } from '@/components/scroll'
import { TabNavItem } from '@/components/tab-nav-item'

import { computed, defineComponent, onMounted, provide, reactive, ref, toRef, watch } from 'vue'

import { emitEvent, useIcons, useNameHelper, useProps } from '@vexip-ui/config'
import { useDisplay } from '@vexip-ui/hooks'
import { debounceMinor, isNull } from '@vexip-ui/utils'
import { tabNavProps } from './props'
import { TAB_NAV_STATE } from './symbol'

import type { ChangeEvent, ItemState } from './symbol'

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
    Scroll,
    TabNavItem
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
    const scroll = ref<InstanceType<typeof Scroll>>()

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
    const scrollMode = computed(() => {
      return props.placement === 'top' || props.placement === 'bottom'
        ? 'horizontal-exact'
        : 'vertical'
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
        updateMarkerPosition()
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
      emit('update:active', label)
      emitEvent(props.onChange as ChangeEvent, label)
    }

    function handleAdd() {
      emitEvent(props.onAdd)
    }

    function handleClose(label: string | number) {
      emitEvent(props.onClose as ChangeEvent, label)

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
      icons: useIcons(),

      className,
      markerStyle,
      items,
      scrollMode,

      wrapper,
      scroll,

      updateMarkerPosition,
      handleAdd
    }
  }
})
</script>
