<template>
  <div
    ref="wrapper"
    :class="className"
    @mouseenter="handleTriggerEnter"
    @mouseleave="handleTriggerLeave"
    @clickoutside="handleClickOutside"
  >
    <div
      ref="reference"
      :class="[`${prefix}__trigger`, currentVisible ? `${prefix}__trigger--selected` : '']"
      @click="handleTriggerClick"
    >
      <slot></slot>
    </div>
    <Portal :to="transferTo">
      <transition :name="transitionName">
        <div
          v-show="currentVisible"
          ref="popper"
          :class="`${prefix}__popper`"
          @mouseenter="handleTriggerEnter"
          @mouseleave="handleTriggerLeave"
        >
          <slot name="drop"></slot>
        </div>
      </transition>
    </Portal>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  toRef,
  computed,
  watch,
  onMounted,
  nextTick,
  inject,
  provide
} from 'vue'

import { Portal } from '@/components/portal'

import { useClickOutside } from '@/common/mixins/clickoutside'
import { placementWhileList, usePopper } from '@/common/mixins/popper'
import { useTriggerHandler } from '@/common/mixins/trigger-handler'
import { useConfiguredProps } from '@/common/config/install'
import { noop } from '@/common/utils/common'
import { useLabel } from './mixins'
import { SELECT_HANDLER } from './symbol'

import type { PropType } from 'vue'
import type { Placement } from '@popperjs/core'

export type DropdownTrigger = 'hover' | 'click' | 'custom'

const props = useConfiguredProps('dropdown', {
  visible: {
    type: Boolean,
    default: false
  },
  placement: {
    type: String as PropType<Placement>,
    default: 'bottom',
    validator: (value: Placement) => {
      return placementWhileList.includes(value)
    }
  },
  outsideClose: {
    type: Boolean,
    default: true
  },
  trigger: {
    default: 'hover' as DropdownTrigger,
    validator: (value: DropdownTrigger) => {
      return ['hover', 'click', 'custom'].includes(value)
    }
  },
  label: {
    type: [String, Number],
    default: null
  },
  transitionName: {
    type: String,
    default: 'vxp-drop'
  },
  transfer: {
    type: [Boolean, String],
    default: true
  }
})

export default defineComponent({
  name: 'Dropdown',
  components: {
    Portal
  },
  props,
  emits: ['on-toggle', 'on-select', 'on-click-outside', 'on-outside-close'],
  setup(props, { emit }) {
    const parentSelectHandler = inject(SELECT_HANDLER, noop)

    const prefix = 'vxp-dropdown'
    const trigger = toRef(props, 'trigger')
    const label = toRef(props, 'label')
    const placement = ref(props.placement)
    const currentVisible = ref(props.visible)
    const transfer = toRef(props, 'transfer')

    const wrapper = useClickOutside()
    const { reference, popper, transferTo, updatePopper } = usePopper({
      placement,
      transfer,
      wrapper,
      isDrop: true
    })
    const currentLabel = useLabel(label, reference)
    const { handleTriggerEnter, handleTriggerLeave, handleTriggerClick } = useTriggerHandler(
      trigger,
      currentVisible
    )

    const className = computed(() => {
      return {
        [prefix]: true,
        [`${prefix}--visible`]: currentVisible.value
      }
    })

    provide(SELECT_HANDLER, handleSelect)

    watch(
      () => props.visible,
      value => {
        currentVisible.value = value
      }
    )

    watch(
      () => props.placement,
      value => {
        setPlacement(value)
      }
    )

    watch(currentVisible, value => {
      if (value) {
        updatePopper()
      }

      emit('on-toggle', value)
    })

    onMounted(() => {
      nextTick(() => {
        setPlacement(props.placement)
      })
    })

    function handleClickOutside() {
      emit('on-click-outside')

      if (props.outsideClose && props.trigger !== 'custom' && currentVisible.value) {
        currentVisible.value = false

        emit('on-outside-close')
      }
    }

    function handleSelect(sonLabel: string | number) {
      if (trigger.value !== 'custom') {
        currentVisible.value = false
        emit('on-select', sonLabel)
      }

      if (typeof parentSelectHandler === 'function') {
        parentSelectHandler(`${currentLabel.value}-${sonLabel}`)
      }
    }

    function setPlacement(value: Placement) {
      const [xPlacement] = value.split('-')

      if (
        typeof parentSelectHandler === 'function' &&
        xPlacement !== 'right' &&
        xPlacement !== 'left'
      ) {
        placement.value = 'right-start'
      } else {
        placement.value = value
      }
    }

    return {
      prefix: prefix,
      currentVisible,
      transferTo,

      wrapper,
      reference,
      popper,

      className,

      handleTriggerEnter,
      handleTriggerLeave,
      handleTriggerClick,
      handleClickOutside
    }
  }
})
</script>
