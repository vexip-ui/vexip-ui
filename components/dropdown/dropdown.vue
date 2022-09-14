<template>
  <div
    ref="wrapper"
    :class="className"
    @mouseenter="handleTriggerEnter"
    @mouseleave="handleTriggerLeave"
  >
    <div
      ref="reference"
      :class="[nh.be('trigger'), currentVisible ? nh.bem('trigger', 'active') : '']"
      @click="handleTriggerClick"
      @keydown.enter.prevent="handleTriggerClick"
      @keydown.space.prevent="handleTriggerClick"
    >
      <slot></slot>
    </div>
    <DropdownDrop>
      <Portal :to="transferTo">
        <transition :name="props.transitionName" :appear="props.appear">
          <div
            v-show="currentVisible"
            ref="popper"
            :class="[
              nh.be('popper'),
              nh.bs('vars'),
              isNested ? nh.bem('popper', 'nested') : null,
              props.dropClass
            ]"
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
import { useClickOutside, placementWhileList, usePopper, useSetTimeout } from '@vexip-ui/hooks'
import {
  useNameHelper,
  useProps,
  booleanProp,
  booleanStringProp,
  classProp,
  eventProp,
  emitEvent
} from '@vexip-ui/config'
import { useLabel } from './hooks'
import { SELECT_HANDLER, DROPDOWN_STATE } from './symbol'

import type { PropType } from 'vue'
import type { Placement } from '@vexip-ui/hooks'

export type DropdownTrigger = 'hover' | 'click' | 'custom'

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
    transfer: booleanStringProp,
    dropClass: classProp,
    appear: booleanProp,
    meta: Object as PropType<Record<string, any>>,
    onToggle: eventProp<(visible: boolean) => void>(),
    onSelect: eventProp<(labels: (string | number)[], metas: Array<Record<string, any>>) => void>(),
    onClickOutside: eventProp(),
    onOutsideClose: eventProp()
  },
  emits: ['update:visible'],
  setup(_props, { emit }) {
    const nh = useNameHelper('dropdown')
    const props = useProps('dropdown', _props, {
      visible: {
        default: false,
        static: true
      },
      placement: {
        default: 'bottom',
        validator: value => placementWhileList.includes(value)
      },
      outsideClose: true,
      trigger: {
        default: 'hover',
        validator: value => ['hover', 'click', 'custom'].includes(value)
      },
      label: {
        default: null,
        static: true
      },
      transitionName: () => nh.ns('drop'),
      transfer: false,
      dropClass: null,
      appear: false,
      meta: null
    })

    const parentState = inject(DROPDOWN_STATE, null)

    const isNested = !!parentState
    const label = toRef(props, 'label')
    const placement = ref(props.placement)
    const currentVisible = ref(props.visible)
    const transfer = toRef(props, 'transfer')

    const wrapper = useClickOutside(handleClickOutside)
    const { reference, popper, transferTo, updatePopper } = usePopper({
      placement,
      transfer,
      wrapper,
      isDrop: true,
      offset: isNested ? [-5, 0] : undefined
    })
    const currentLabel = useLabel(label, reference)

    const className = computed(() => {
      return {
        [nh.b()]: true,
        [nh.bs('vars')]: true,
        [nh.bm('visible')]: currentVisible.value
      }
    })

    provide(SELECT_HANDLER, null)
    provide(DROPDOWN_STATE, {
      handleSelect,
      handleTriggerEnter,
      handleTriggerLeave
    })

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

      emitEvent(props.onToggle, value)
      emit('update:visible', value)
    })

    onMounted(() => {
      nextTick(() => {
        setPlacement(props.placement)
      })
    })

    function handleClickOutside() {
      emitEvent(props.onClickOutside)

      if (props.outsideClose && props.trigger !== 'custom' && currentVisible.value) {
        currentVisible.value = false
        emitEvent(props.onOutsideClose)
      }
    }

    function handleSelect(labels: (string | number)[], metas: Array<Record<string, any>>) {
      if (props.trigger !== 'custom') {
        currentVisible.value = false
        emitEvent(props.onSelect, labels, metas)
      }

      if (typeof parentState?.handleSelect === 'function') {
        parentState.handleSelect([currentLabel.value!, ...labels], [props.meta || {}, ...metas])
      }
    }

    function setPlacement(value: Placement) {
      const [xPlacement] = value.split('-')

      if (isNested && xPlacement !== 'right' && xPlacement !== 'left') {
        placement.value = 'right-start'
      } else {
        placement.value = value
      }
    }

    const { timer } = useSetTimeout()

    function handleTriggerEnter() {
      if (props.trigger === 'hover') {
        clearTimeout(timer.hover)

        if (typeof parentState?.handleTriggerEnter === 'function') {
          parentState.handleTriggerEnter()
        }

        timer.hover = setTimeout(() => {
          currentVisible.value = true
        }, 250)
      }
    }

    function handleTriggerLeave() {
      if (props.trigger === 'hover') {
        clearTimeout(timer.hover)

        if (typeof parentState?.handleTriggerLeave === 'function') {
          parentState.handleTriggerLeave()
        }

        timer.hover = setTimeout(() => {
          currentVisible.value = false
        }, 250)
      }
    }

    function handleTriggerClick() {
      if (props.trigger === 'click') {
        currentVisible.value = !currentVisible.value
      }
    }

    return {
      props,
      nh,
      isNested,
      currentVisible,
      transferTo,

      wrapper,
      reference,
      popper,

      className,

      handleTriggerEnter,
      handleTriggerLeave,
      handleTriggerClick
    }
  }
})
</script>
