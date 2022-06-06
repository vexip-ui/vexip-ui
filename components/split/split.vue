<template>
  <div ref="wrapper" :class="className" @transitionend="removeTransition">
    <div
      :class="[`${prefix}__pane`, `${prefix}__pane--${props.vertical ? 'top' : 'left'}`]"
      :style="leftPaneStyle"
    >
      <slot name="left"></slot>
    </div>
    <div
      :class="[`${prefix}__pane`, `${prefix}__pane--${props.vertical ? 'bottom' : 'right'}`]"
      :style="rightPaneStyle"
    >
      <slot name="right"></slot>
    </div>
    <div :class="`${prefix}__trigger`" :style="triggerStyle">
      <div :class="`${prefix}__handler`" @mousedown="handleTriggerDown">
        <template v-if="props.canFull">
          <div
            :class="[`${prefix}__button`, `${prefix}__button--${props.vertical ? 'top' : 'left'}-full`]"
            @mousedown.stop
            @click.left="handleFull(-1)"
          >
            <Icon :icon="props.vertical ? ChevronDown : ChevronRight" :scale="0.6"></Icon>
          </div>
          <div
            :class="[
              `${prefix}__button`,
              `${prefix}__button--${props.vertical ? 'bottom' : 'right'}-full`
            ]"
            @mousedown.stop
            @click.left="handleFull(1)"
          >
            <Icon :icon="props.vertical ? ChevronUp : ChevronLeft" :scale="0.6"></Icon>
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
import { useProps, booleanProp } from '@vexip-ui/config'
import { throttle } from '@vexip-ui/utils'
import { ChevronUp, ChevronRight, ChevronDown, ChevronLeft } from '@vexip-ui/icons'

export default defineComponent({
  name: 'Split',
  components: {
    Icon
  },
  props: {
    value: Number,
    min: Number,
    max: Number,
    vertical: booleanProp,
    noTransition: booleanProp,
    lazy: booleanProp,
    canFull: booleanProp
  },
  emits: [
    'change',
    'full',
    'reset',
    'move',
    'move-start',
    'move-end',
    'update:value'
  ],
  setup(_props, { emit }) {
    const props = useProps('split', _props, {
      value: {
        default: 0.5,
        validator: (value: number) => value > 0 && value < 1,
        static: true
      },
      min: 0.1,
      max: 0.9,
      vertical: false,
      noTransition: false,
      lazy: false,
      canFull: false
    })

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
        [`${prefix}-vars`]: true,
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
              : `calc(${currentValue.value * 100}% - var(--vxp-split-handler-size) * 0.5)`
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
      emit('change', value)
      emit('update:value', value)

      if (guide.value) {
        guide.value.style[position.value[0]] = `${value * 100}%`
      }
    })
    watch(currentFull, value => {
      setTransition()

      if (value) {
        let type: 'top' | 'right' | 'bottom' | 'left'

        if (props.vertical) {
          type = value < 0 ? 'top' : 'bottom'
        } else {
          type = value < 0 ? 'left' : 'right'
        }

        emit('full', type)
      } else {
        emit('reset')
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

      emit('move', value)
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

      emit('move-start', currentValue.value)
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

      emit('move-end', currentValue.value)
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
      ChevronUp,
      ChevronRight,
      ChevronDown,
      ChevronLeft,

      props,
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
