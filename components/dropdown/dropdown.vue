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
      :class="[`${prefix}__trigger`, currentVisible ? `${prefix}__trigger--active` : '']"
      @click="handleTriggerClick"
    >
      <slot></slot>
    </div>
    <DropdownDrop>
      <Portal :to="transferTo">
        <transition :name="props.transitionName" :appear="props.appear">
          <div
            v-show="currentVisible"
            ref="popper"
            :class="[`${prefix}__popper`, `${prefix}-vars`, isNested ? `${prefix}__popper--nested` : null, props.dropClass]"
            @mouseenter="handleTriggerEnter"
            @mouseleave="handleTriggerLeave"
          >
            <slot name="drop"></slot>
          </div>
        </transition>
      </Portal>
    </DropdownDrop>
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
import DropdownDrop from './dropdown-drop'
import { useClickOutside, placementWhileList, usePopper, useTriggerHandler } from '@vexip-ui/mixins'
import { useProps, booleanProp } from '@vexip-ui/config'
import { useLabel } from './mixins'
import { SELECT_HANDLER, DROP_SELECT_HANDLER } from './symbol'

import type { PropType } from 'vue'
import type { Placement } from '@vexip-ui/mixins'

export type DropdownTrigger = 'hover' | 'click' | 'custom'
type ClassType = string | Record<string, boolean>

export default defineComponent({
  name: 'Dropdown',
  components: {
    DropdownDrop,
    Portal
  },
  props: {
    visible: booleanProp,
    placement: String as PropType<Placement>,
    outsideClose: booleanProp,
    trigger: String as PropType<DropdownTrigger>,
    label: [String, Number],
    transitionName: String,
    transfer: [Boolean, String],
    dropClass: [String, Object] as PropType<ClassType>,
    appear: booleanProp
  },
  emits: ['toggle', 'select', 'click-outside', 'outside-close', 'update:visible'],
  setup(_props, { emit }) {
    const props = useProps('dropdown', _props, {
      visible: {
        default: false,
        static: true
      },
      placement: {
        default: 'bottom',
        validator: (value: Placement) => placementWhileList.includes(value)
      },
      outsideClose: true,
      trigger: {
        default: 'hover' as DropdownTrigger,
        validator: (value: DropdownTrigger) => ['hover', 'click', 'custom'].includes(value)
      },
      label: {
        default: null,
        static: true
      },
      transitionName: 'vxp-drop',
      transfer: false,
      dropClass: null,
      appear: false
    })

    const parentSelectHandler = inject(DROP_SELECT_HANDLER, null)

    const prefix = 'vxp-dropdown'
    const isNested = typeof parentSelectHandler === 'function'
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
      isDrop: true,
      offset: isNested ? [-5, 0] : undefined
    })
    const currentLabel = useLabel(label, reference)
    const { handleTriggerEnter, handleTriggerLeave, handleTriggerClick } = useTriggerHandler(
      trigger,
      currentVisible
    )

    const className = computed(() => {
      return {
        [prefix]: true,
        [`${prefix}-vars`]: true,
        [`${prefix}--visible`]: currentVisible.value
      }
    })

    provide(SELECT_HANDLER, handleSelect)
    provide(DROP_SELECT_HANDLER, null) // 覆盖上一级的 provide

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

      emit('toggle', value)
      emit('update:visible', value)
    })

    onMounted(() => {
      nextTick(() => {
        setPlacement(props.placement)
      })
    })

    function handleClickOutside() {
      emit('click-outside')

      if (props.outsideClose && props.trigger !== 'custom' && currentVisible.value) {
        currentVisible.value = false

        emit('outside-close')
      }
    }

    function handleSelect(sonLabel: string | number) {
      if (trigger.value !== 'custom') {
        currentVisible.value = false
        emit('select', sonLabel)
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
      props,
      prefix,
      isNested,
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
