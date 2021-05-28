<template>
  <div ref="wrapper" :class="className" @transitionend="removeTransition">
    <div
      :class="[`${prefix}__pane`, `${prefix}__pane--${vertical ? 'top' : 'left'}`]"
      :style="leftPaneStyle"
    >
      <slot :name="position[0]"></slot>
    </div>
    <div
      :class="[`${prefix}__pane`, `${prefix}__pane--${vertical ? 'bottom' : 'right'}`]"
      :style="rightPaneStyle"
    >
      <slot :name="position[1]"></slot>
    </div>
    <div :class="`${prefix}__trigger`" :style="triggerStyle">
      <div :class="`${prefix}__handle`" @mousedown="handleTriggerDown">
        <template v-if="canFull">
          <div
            :class="[`${prefix}__button`, `${prefix}__button--${vertical ? 'top' : 'left'}-full`]"
            @mousedown.stop
            @click.left="handleFull(-1)"
          >
            <Icon :name="`chevron-${vertical ? 'down' : 'right'}`" :scale="0.6"></Icon>
          </div>
          <div
            :class="[
              `${prefix}__button`,
              `${prefix}__button--${vertical ? 'bottom' : 'right'}-full`
            ]"
            @mousedown.stop
            @click.left="handleFull(1)"
          >
            <Icon :name="`chevron-${vertical ? 'up' : 'left'}`" :scale="0.6"></Icon>
          </div>
        </template>
        <template v-else>
          <slot name="handler">
            <span v-for="n in 6" :key="n" :class="`${prefix}__pointer`"></span>
          </slot>
        </template>
      </div>
    </div>
    <div ref="guide" :class="`${prefix}__guide`"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'
import { Icon } from '@/components/icon'
import { useConfiguredProps } from '@/common/config/install'
import { throttle } from '@/common/utils/performance'

import '@/common/icons/chevron-up'
import '@/common/icons/chevron-right'
import '@/common/icons/chevron-down'
import '@/common/icons/chevron-left'

const props = useConfiguredProps('split', {
  value: {
    type: Number,
    default: 0.5,
    validator: (value: number) => {
      return value > 0 && value < 1
    }
  },
  min: {
    type: Number,
    default: 0.1
  },
  max: {
    type: Number,
    default: 0.9
  },
  vertical: {
    type: Boolean,
    default: false
  },
  noTransition: {
    type: Boolean,
    default: false
  },
  lazy: {
    type: Boolean,
    default: false
  },
  canFull: {
    type: Boolean,
    default: false
  }
})

export default defineComponent({
  name: 'Split',
  components: {
    Icon
  },
  props,
  emits: [
    'on-change',
    'on-full',
    'on-reset',
    'on-move',
    'on-move-start',
    'on-move-end',
    'update:value'
  ],
  setup(props, { emit }) {
    const prefix = 'vxp-split'
    const currentValue = ref(props.value)
    const moving = ref(false)
    const currentFull = ref<0 | 1 | -1>(0)
    const transition = ref(false)

    const wrapper = ref<HTMLElement | null>(null)
    const guide = ref<HTMLElement | null>(null)

    const className = computed(() => {
      let fullType = ''

      if (currentFull.value) {
        if (props.vertical) {
          fullType = currentFull.value < 0 ? 'top' : 'bottom'
        } else {
          fullType = currentFull.value < 0 ? 'left' : 'right'
        }
      }

      return {
        [prefix]: true,
        [`${prefix}--${props.vertical ? 'vertical' : 'horizontal'}`]: true,
        [`${prefix}--moving`]: moving.value,
        [`${prefix}--${fullType}-full`]: !!fullType,
        [`${prefix}--transition`]: transition.value
      }
    })
    const offset = computed(() => {
      return props.vertical ? 'offsetHeight' : 'offsetWidth'
    })
    const position = computed<['top', 'bottom'] | ['left', 'right']>(() => {
      return props.vertical ? ['top', 'bottom'] : ['left', 'right']
    })
    const leftPaneStyle = computed(() => {
      return {
        [position.value[1]]:
          currentFull.value < 0
            ? '0'
            : currentFull.value > 0
              ? '100%'
              : `${(1 - currentValue.value) * 100}%`
      }
    })
    const rightPaneStyle = computed(() => {
      return {
        [position.value[0]]:
          currentFull.value < 0
            ? '100%'
            : currentFull.value > 0
              ? '0'
              : `${currentValue.value * 100}%`
      }
    })
    const triggerStyle = computed(() => {
      return {
        [position.value[0]]:
          currentFull.value < 0
            ? '100%'
            : currentFull.value > 0
              ? '0'
              : `calc(${currentValue.value * 100}% - 3px)`
      }
    })

    watch(
      () => props.value,
      value => {
        if (value.toFixed(5) !== currentValue.value.toFixed(5)) {
          currentValue.value = value
          setTransition()
        }
      }
    )
    watch(currentValue, value => {
      emit('on-change', value)
      emit('update:value', value)

      if (guide.value) {
        guide.value.style[position.value[0]] = `${value * 100}%`
      }
    })
    watch(currentFull, value => {
      setTransition()

      if (value) {
        let type

        if (props.vertical) {
          type = value < 0 ? 'top' : 'bottom'
        } else {
          type = value < 0 ? 'left' : 'right'
        }

        emit('on-full', type)
      } else {
        emit('on-reset')
      }
    })

    let moveState: {
      outer: number,
      origin: number,
      direction: 'pageY' | 'pageX',
      start: number,
      min: number,
      max: number,
      lazy: boolean,
      target: number
    } | null = null

    const computeTriggerMove = throttle(event => {
      if (!moveState) return

      const { outer, origin, direction, start, min, max, lazy } = moveState
      const offset = event[direction] - origin
      const value = Math.min(Math.max(min, (start + offset) / outer), max)

      if (lazy) {
        if (guide.value) {
          guide.value.style[position.value[0]] = `${value * 100}%`
        }

        moveState.target = value
      } else {
        currentValue.value = value
      }

      emit('on-move', value)
    })

    function handleTriggerDown(event: MouseEvent) {
      event.preventDefault()
      event.stopPropagation()

      if (currentFull.value || !wrapper.value) {
        return false
      }

      moving.value = true

      const { min, max, vertical, lazy } = props

      const outer = wrapper.value[offset.value]
      const computedMin = min <= 1 ? min : min / outer
      const computedMax = max <= 1 ? max : max / outer
      const direction = vertical ? 'pageY' : 'pageX'
      // const style = vertical ? 'top' : 'left'

      moveState = {
        outer,
        direction,
        lazy,
        min: computedMin,
        max: computedMax,
        origin: event[direction],
        start: currentValue.value * outer,
        target: currentValue.value
      }

      if (props.lazy && guide.value) {
        guide.value.style[position.value[0]] = `${currentValue.value * 100}`
        guide.value.style.display = 'block'
      }

      document.addEventListener('mousemove', handleTriggerMove)
      document.addEventListener('mouseup', handleTriggerUp)

      emit('on-move-start', currentValue.value)
    }

    function handleTriggerMove(event: MouseEvent) {
      event.preventDefault()
      event.stopPropagation()

      computeTriggerMove(event)
    }

    function handleTriggerUp() {
      document.removeEventListener('mousemove', handleTriggerMove)
      document.removeEventListener('mouseup', handleTriggerUp)

      moving.value = false

      if (guide.value) {
        guide.value.style.display = ''
      }

      if (props.lazy && moveState) {
        if (Math.abs(moveState.target - currentValue.value) > 0.01) {
          setTransition()
        }

        currentValue.value = moveState.target
      }

      emit('on-move-end', currentValue.value)
    }

    function setTransition() {
      transition.value = !props.noTransition && !moving.value
    }

    function removeTransition() {
      transition.value = false
    }

    function handleFull(type: 1 | -1) {
      if (!props.canFull) {
        return
      }

      if (currentFull.value) {
        currentFull.value = 0
      } else {
        currentFull.value = type
      }
    }

    return {
      prefix,

      className,
      position,
      leftPaneStyle,
      rightPaneStyle,
      triggerStyle,

      wrapper,
      guide,

      handleTriggerDown,
      removeTransition,
      handleFull
    }
  }
})
</script>
