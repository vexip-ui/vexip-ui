<template>
  <div :class="nh.b()">
    <div :class="nh.be('header')">
      <TabNav
        :active="currentActive"
        :card="props.card"
        :align="props.align"
        @change="handleActive"
      >
        <template v-if="$slots.prefix" #prefix>
          <slot name="prefix"></slot>
        </template>
        <TabNavItem
          v-for="(item, index) in itemList"
          :key="index"
          :label="item.label"
          :icon="item.icon"
          :disabled="item.disabled"
        >
          <template v-if="isFunction(item.labelRenderer)">
            <Renderer
              :renderer="item.labelRenderer"
              :data="{ label: item.label, disabled: item.disabled }"
            ></Renderer>
          </template>
          <template v-else>
            {{ item.label }}
          </template>
        </TabNavItem>
        <template v-if="$slots.suffix" #suffix>
          <slot name="suffix"></slot>
        </template>
      </TabNav>
    </div>
    <div
      :class="{
        [nh.be('main')]: true,
        [nh.bem('main', 'transition')]: isTransition
      }"
      @transitionend="isTransition = false"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, watch, provide, onMounted } from 'vue'
import { Renderer } from '@/components/renderer'
import { TabNav } from '@/components/tab-nav'
import { TabNavItem } from '@/components/tab-nav-item'
import { useNameHelper, useProps, booleanProp, eventProp, emitEvent } from '@vexip-ui/config'
import { isNull, isFunction, debounceMinor } from '@vexip-ui/utils'
import { TABS_STATE } from './symbol'

import type { PropType } from 'vue'
import type { TabNavAlign } from '@/components/tab-nav'
import type { ItemState } from './symbol'

export default defineComponent({
  name: 'Tabs',
  components: {
    Renderer,
    TabNav,
    TabNavItem
  },
  props: {
    card: booleanProp,
    active: [String, Number],
    align: String as PropType<TabNavAlign>,
    onChange: eventProp<(active: string | number) => void>()
  },
  emits: ['update:active'],
  setup(_props, { emit }) {
    const props = useProps('tabs', _props, {
      card: false,
      active: {
        default: null,
        static: true
      }
    })

    const currentActive = ref(props.active)
    const currentIndex = ref(0)
    const itemStates = ref(new Set<ItemState>())
    const isTransition = ref(false)

    const mainStyle = computed(() => {
      return {
        transform: `translateX(-${currentIndex.value}00%) translateZ(0)`
      }
    })
    const itemList = computed(() => {
      return Array.from(itemStates.value)
    })

    const refreshLabels = debounceMinor(() => {
      itemList.value.forEach((item, index) => {
        if (isNull(item.label)) {
          item.label = index + 1
        }
      })

      if (itemList.value.length >= 1 && isActiveEmpty()) {
        currentActive.value = itemList.value[0].label
      }
    })
    const computeIndex = debounceMinor(() => {
      const index = Array.from(itemStates.value).findIndex(
        item => item.label === currentActive.value
      )

      if (~index) {
        currentIndex.value = index
      }
    })

    provide(
      TABS_STATE,
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
    // watch(currentIndex, () => {
    //   isTransition.value = true
    // })

    onMounted(computeIndex)

    function isActiveEmpty() {
      return isNull(currentActive.value) || currentActive.value === ''
    }

    function increaseItem(item: ItemState) {
      itemStates.value.add(item)
      refreshLabels()
    }

    function decreaseItem(item: ItemState) {
      itemStates.value.delete(item)
      refreshLabels()
    }

    function handleActive(label: string | number) {
      currentActive.value = label

      computeIndex()
      emitEvent(props.onChange, label)
      emit('update:active', label)
    }

    return {
      props,
      nh: useNameHelper('tabs'),
      currentActive,
      isTransition,

      mainStyle,
      itemList,

      isFunction,
      handleActive
    }
  }
})
</script>
