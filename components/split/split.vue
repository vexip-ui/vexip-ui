<template>
  <div ref="wrapper" :class="className" @transitionend="removeTransition">
    <div
      :class="[nh.be('panel'), nh.bem('panel', props.vertical ? 'top' : 'left')]"
      :style="leftPaneStyle"
    >
      <slot name="left"></slot>
    </div>
    <div
      :class="[nh.be('panel'), nh.bem('panel', props.vertical ? 'bottom' : 'right')]"
      :style="rightPaneStyle"
    >
      <slot name="right"></slot>
    </div>
    <div :class="nh.be('trigger')" :style="triggerStyle">
      <div ref="handler" :class="nh.be('handler')">
        <template v-if="props.canFull">
          <button
            :class="[nh.be('button'), nh.bem('button', `${props.vertical ? 'top' : 'left'}-full`)]"
            @pointerdown.stop
            @click.left="handleFull(-1)"
          >
            <Icon :icon="fullIcons[0]" :scale="0.6"></Icon>
          </button>
          <button
            :class="[
              nh.be('button'),
              nh.bem('button', `${props.vertical ? 'bottom' : 'right'}-full`)
            ]"
            @pointerdown.stop
            @click.left="handleFull(1)"
          >
            <Icon :icon="fullIcons[1]" :scale="0.6"></Icon>
          </button>
        </template>
        <template v-else>
          <slot name="handler">
            <span v-for="n in 6" :key="n" :class="nh.be('pointer')"></span>
          </slot>
        </template>
      </div>
    </div>
    <div ref="guide" :class="nh.be('guide')"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'
import { Icon } from '@/components/icon'
import { useNameHelper, useProps, emitEvent } from '@vexip-ui/config'
import { useMoving } from '@vexip-ui/hooks'
import { ChevronUp, ChevronRight, ChevronDown, ChevronLeft } from '@vexip-ui/icons'
import { splitProps } from './props'

export default defineComponent({
  name: 'Split',
  components: {
    Icon
  },
  props: splitProps,
  emits: ['update:value'],
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

    const nh = useNameHelper('split')
    const currentValue = ref(props.value)
    const currentFull = ref<0 | 1 | -1>(0)
    const transition = ref(false)

    const wrapper = ref<HTMLElement>()
    const guide = ref<HTMLElement>()

    const { target: handler, moving } = useMoving({
      lazy: true,
      capture: false,
      onStart: (state, event) => {
        if (currentFull.value || !wrapper.value || event.button > 0) {
          return false
        }

        const { min, max, vertical, lazy } = props
        const outer = wrapper.value[offset.value]
        const computedMin = min <= 1 ? min : min / outer
        const computedMax = max <= 1 ? max : max / outer

        state.outer = outer
        state.min = computedMin
        state.max = computedMax
        state.vertical = vertical
        state.splitLazy = lazy
        state.start = currentValue.value * outer
        state.target = currentValue.value

        if (lazy && guide.value) {
          guide.value.style[position.value[0]] = `${currentValue.value * 100}`
          guide.value.style.display = 'block'
        }

        emitEvent(props.onMoveStart, currentValue.value)
      },
      onMove: state => {
        const outer = state.outer as number
        const min = state.min as number
        const max = state.max as number
        const delta = state.vertical ? state.deltaY : state.deltaX
        const start = state.start as number
        const value = Math.min(Math.max(min, (start + delta) / outer), max)

        if (state.splitLazy) {
          if (guide.value) {
            guide.value.style[position.value[0]] = `${value * 100}%`
          }

          state.target = value
        } else {
          currentValue.value = value
        }

        emitEvent(props.onMove, value)
      },
      onEnd: state => {
        if (guide.value) {
          guide.value.style.display = ''
        }

        const target = state.target as number

        if (state.splitLazy) {
          if (Math.abs(target - currentValue.value) > 0.01) {
            setTransition()
          }

          currentValue.value = target
        }

        emitEvent(props.onMoveEnd, currentValue.value)
      }
    })

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
        [nh.b()]: true,
        [nh.bs('vars')]: true,
        [nh.bm(props.vertical ? 'vertical' : 'horizontal')]: true,
        [nh.bm('moving')]: moving.value,
        [nh.bm(`${fullType}-full`)]: !!fullType,
        [nh.bm('transition')]: transition.value
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
              : `calc(${currentValue.value * 100}% - var(${nh.cv('handler-size')}) * 0.5)`
      }
    })
    const fullIcons = computed(() => {
      return props.vertical ? [ChevronDown, ChevronUp] : [ChevronRight, ChevronLeft]
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
      emitEvent(props.onChange, value)
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

        emitEvent(props.onFull, type)
      } else {
        emitEvent(props.onReset)
      }
    })

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
      props,
      nh,

      className,
      position,
      leftPaneStyle,
      rightPaneStyle,
      triggerStyle,
      fullIcons,

      wrapper,
      guide,
      handler,

      removeTransition,
      handleFull
    }
  }
})
</script>
