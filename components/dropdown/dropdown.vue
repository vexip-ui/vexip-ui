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
      <Popper
        ref="popper"
        :class="[
          nh.be('popper'),
          nh.bs('vars'),
          isNested ? nh.bem('popper', 'nested') : null,
          props.dropClass
        ]"
        :visible="currentVisible"
        :alive="isAlive || popperAlive"
        :to="transferTo"
        :transition="props.transitionName"
        :appear="props.appear"
        @mouseenter="handleTriggerEnter"
        @mouseleave="handleTriggerLeave"
        @after-enter="popperAlive = true"
        @after-leave="popperAlive = false"
      >
        <slot name="drop"></slot>
      </Popper>
    </DropdownDrop>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  toRef,
  computed,
  watch,
  onMounted,
  nextTick,
  inject,
  provide
} from 'vue'
import { Popper } from '@/components/popper'
import { useClickOutside, placementWhileList, usePopper, useSetTimeout } from '@vexip-ui/hooks'
import { useNameHelper, useProps, emitEvent } from '@vexip-ui/config'
import DropdownDrop from './dropdown-drop'
import { dropdownProps } from './props'
import { useLabel } from './hooks'
import { SELECT_HANDLER, DROPDOWN_STATE } from './symbol'

import type { PopperExposed } from '@/components/popper'
import type { Placement } from '@vexip-ui/hooks'

export default defineComponent({
  name: 'Dropdown',
  components: {
    DropdownDrop,
    Popper
  },
  props: dropdownProps,
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
      meta: null,
      alive: false
    })

    const parentState = inject(DROPDOWN_STATE, null)

    const isNested = !!parentState
    const label = toRef(props, 'label')
    const placement = ref(props.placement)
    const currentVisible = ref(props.visible)
    const transfer = toRef(props, 'transfer')
    const popperAlive = ref(false)

    const wrapper = useClickOutside(handleClickOutside)
    const popper = ref<PopperExposed>()
    const { reference, transferTo, updatePopper } = usePopper({
      placement,
      transfer,
      wrapper,
      popper: computed(() => popper.value?.wrapper),
      isDrop: true,
      offset: isNested ? [-5, 0] : undefined
    })
    const currentLabel = useLabel(label, reference)

    const className = computed(() => {
      return {
        [nh.b()]: true,
        [nh.bs('vars')]: true,
        [nh.bm('inherit')]: props.inherit,
        [nh.bm('visible')]: currentVisible.value
      }
    })
    const isAlive = computed(() => parentState?.alive || props.alive)

    provide(SELECT_HANDLER, null)
    provide(
      DROPDOWN_STATE,
      reactive({
        alive: isAlive,
        handleSelect,
        handleTriggerEnter,
        handleTriggerLeave
      })
    )

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
      popperAlive,

      className,
      isAlive,

      wrapper,
      reference,
      popper,

      handleTriggerEnter,
      handleTriggerLeave,
      handleTriggerClick
    }
  }
})
</script>
