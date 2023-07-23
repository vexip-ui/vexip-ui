<template>
  <div :class="[nh.b(), nh.bm(props.placement), props.inherit && nh.bm('inherit')]">
    <div :class="nh.be('header')">
      <TabNav
        inherit
        :active="currentActive"
        :card="props.card"
        :align="props.align"
        :placement="props.placement"
        :closable="props.closable"
        :show-add="props.showAdd"
        @change="handleActive"
        @add="handleAdd"
        @close="handleClose"
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
          :closable="item.closable"
        >
          <template v-if="isFunction(item.labelRenderer)">
            <Renderer
              :renderer="item.labelRenderer"
              :data="{ label: item.label, disabled: item.disabled }"
            ></Renderer>
          </template>
          <template v-else>
            {{ item.name || item.label }}
          </template>
        </TabNavItem>
        <template v-if="$slots.suffix" #suffix>
          <slot name="suffix"></slot>
        </template>
        <template v-if="$slots.add">
          <slot name="add"></slot>
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
import { Renderer } from '@/components/renderer'
import { TabNav } from '@/components/tab-nav'
import { TabNavItem } from '@/components/tab-nav-item'

import { computed, defineComponent, onMounted, provide, reactive, ref, watch } from 'vue'

import { emitEvent, useNameHelper, useProps } from '@vexip-ui/config'
import { debounceMinor, isFunction, isNull } from '@vexip-ui/utils'
import { tabsProps } from './props'
import { TABS_STATE } from './symbol'

import type { ItemState } from './symbol'

type ChangeEvent = (label: string | number) => void

export default defineComponent({
  name: 'Tabs',
  components: {
    Renderer,
    TabNav,
    TabNavItem
  },
  props: tabsProps,
  emits: ['update:active'],
  setup(_props, { emit }) {
    const props = useProps('tabs', _props, {
      active: {
        default: null,
        static: true
      },
      card: false,
      align: 'left',
      placement: 'top',
      closable: false,
      showAdd: false
    })

    const currentActive = ref(props.active)
    const currentIndex = ref(0)
    const itemStates = reactive(new Set<ItemState>())
    const isTransition = ref(false)

    const mainStyle = computed(() => {
      return {
        transform: `translateX(-${currentIndex.value}00%) translateZ(0)`
      }
    })
    const itemList = computed(() => Array.from(itemStates))

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
      const index = itemList.value.findIndex(item => item.label === currentActive.value)

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

    onMounted(computeIndex)

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

      computeIndex()
      emit('update:active', label)
      emitEvent(props.onChange as ChangeEvent, label)
    }

    function handleAdd() {
      emitEvent(props.onAdd)
    }

    function handleClose(label: string | number) {
      emitEvent(props.onClose as ChangeEvent, label)
    }

    return {
      props,
      nh: useNameHelper('tabs'),
      currentActive,
      isTransition,

      mainStyle,
      itemList,

      isFunction,
      handleActive,
      handleAdd,
      handleClose
    }
  }
})
</script>
