<template>
  <div
    ref="wrapper"
    :class="className"
    :style="style"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div :class="`${prefix}__list`" :style="listStyle" @transitionend.self="handleAfterMove">
      <slot></slot>
    </div>
    <div
      v-if="arrow !== 'none'"
      ref="prev"
      :class="[`${prefix}__arrow--${arrow}`, `${prefix}__arrow--prev`]"
    >
      <span
        :class="[`${prefix}__handler`, disabledPrev ? `${prefix}__handler--disabled` : '']"
        @click="handlePrev"
      >
        <slot name="prev-arrow" :disabled="disabledPrev">
          <span :class="handleInnerClass">
            <Icon :name="`arrow-${arrowIcons[0]}`" :scale="1.5"></Icon>
          </span>
        </slot>
      </span>
    </div>
    <div
      v-if="arrow !== 'none'"
      ref="next"
      :class="[`${prefix}__arrow--${arrow}`, `${prefix}__arrow--next`]"
    >
      <span
        :class="[`${prefix}__handler`, disabledNext ? `${prefix}__handler--disabled` : '']"
        @click="handleNext"
      >
        <slot name="next-arrow" :disabled="disabledNext">
          <span :class="handleInnerClass">
            <Icon :name="`arrow-${arrowIcons[1]}`" :scale="1.5"></Icon>
          </span>
        </slot>
      </span>
    </div>
    <div v-if="pointer !== 'none'" :class="`${prefix}__pointers--${pointer}`">
      <div
        v-for="index in itemStates.size"
        :key="index"
        :class="[
          `${prefix}__pointer`,
          index - 1 === currentActive ? `${prefix}__pointer--active` : ''
        ]"
        @click="handleWheel(index - 1)"
      >
        <slot name="pointer" :active="index - 1 === currentActive">
          <span :class="`${prefix}__pointer-inner`"></span>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  computed,
  watch,
  provide,
  onMounted,
  nextTick,
  toRef
} from 'vue'
import { Icon } from '@/components/icon'
import { useConfiguredProps } from '@/common/config/install'
import { debounceMinor } from '@/common/utils/performance'
import { CAROUSEL_STATE } from './symbol'

import '@/common/icons/arrow-up'
import '@/common/icons/arrow-right'
import '@/common/icons/arrow-down'
import '@/common/icons/arrow-left'

import type { ArrowType, ArrowTrigger, PointerType, ItemState, CarouselState } from './symbol'

const props = useConfiguredProps('carousel', {
  viewSize: {
    type: Number,
    default: 3
  },
  vertical: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loop: {
    type: Boolean,
    default: false
  },
  arrow: {
    default: 'outside' as ArrowType,
    validator: (value: ArrowType) => {
      return ['outside', 'inside', 'none'].includes(value)
    }
  },
  arrowTrigger: {
    default: 'hover' as ArrowTrigger,
    validator: (value: ArrowTrigger) => {
      return ['hover', 'always'].includes(value)
    }
  },
  autoplay: {
    type: [Boolean, Number],
    default: false,
    validator(value: boolean | number) {
      return typeof value === 'number' ? value > 500 : true
    }
  },
  pointer: {
    default: 'none' as PointerType,
    validator: (value: PointerType) => {
      return ['outside', 'inside', 'none'].includes(value)
    }
  },
  speed: {
    type: Number,
    default: 300
  },
  active: {
    type: Number,
    default: 0
  },
  activeOffset: {
    type: Number,
    default: 0
  },
  height: {
    type: [Number, String],
    default: null
  }
})

export default defineComponent({
  name: 'Carousel',
  components: {
    Icon
  },
  props,
  emits: ['on-will-change', 'on-change', 'on-prev', 'on-next', 'update:active'],
  setup(props, { emit }) {
    const prefix = 'vxp-carousel'
    const itemStates = ref(new Set<ItemState>())
    const currentActive = ref(props.active)
    const isLocked = ref(false) // 用于控制阻断快速连点
    const transition = ref(false) // 用于控制阻断快速连点
    const arrowActive = ref(props.arrowTrigger === 'always')

    const listRect = reactive({
      width: 0,
      height: 0,
      offset: 0
    })
    const itemRect = reactive({
      width: 0,
      height: 0
    })

    const wrapper = ref<HTMLElement | null>(null)
    const prev = ref<HTMLElement | null>(null)
    const next = ref<HTMLElement | null>(null)

    const isDisabled = computed(() => {
      return props.disabled || itemStates.value.size <= props.viewSize
    })
    const className = computed(() => {
      return {
        [prefix]: true,
        [`${prefix}--vertical`]: props.vertical,
        [`${prefix}--disabled`]: isDisabled.value
      }
    })
    const style = computed(() => {
      return {
        height:
          props.vertical && props.height
            ? `${props.height}${typeof props.height === 'number' ? 'px' : ''}`
            : null
      }
    })
    const listStyle = computed(() => {
      return {
        width: listRect.width ? `${listRect.width}px` : null,
        height: listRect.height ? `${listRect.height}px` : null,
        transform: listRect.offset
          ? `translate${props.vertical ? 'Y' : 'X'}(${listRect.offset}px)`
          : null,
        transitionDuration: isLocked.value ? '0ms' : null
      }
    })
    const disabledPrev = computed(() => {
      return isDisabled.value || (!props.loop && currentActive.value <= 0)
    })
    const disabledNext = computed(() => {
      return isDisabled.value || (!props.loop && currentActive.value >= itemStates.value.size - 1)
    })
    const arrowIcons = computed(() => {
      return props.vertical ? ['up', 'down'] : ['left', 'right']
    })
    const handleInnerClass = computed(() => {
      return [
        `${prefix}__handle-inner`,
        {
          [`${prefix}__handle-inner--show`]: arrowActive.value
        }
      ]
    })

    watch(
      () => props.active,
      value => {
        handleWheel(value)
      }
    )
    watch(currentActive, value => {
      emit('on-change', value)
      emit('update:active', value)
    })

    const refreshLabels = debounceMinor(() => {
      Array.from(itemStates.value).forEach((item, index) => {
        item.label = index + 1
      })
    })
    const updateItemRect = debounceMinor(() => {
      itemStates.value.forEach(state => {
        state.width = itemRect.width
        state.height = itemRect.height
      })
    })
    const updateListRect = debounceMinor(() => {
      listRect.width = itemRect.width * itemStates.value.size
      listRect.height = itemRect.height * itemStates.value.size
    })

    provide<CarouselState>(
      CAROUSEL_STATE,
      reactive({
        vertical: toRef(props, 'vertical'),
        currentActive,
        increaseItem,
        decreaseItem
      })
    )

    onMounted(() => {
      computeItemRect()
    })

    function increaseItem(item: ItemState) {
      itemStates.value.add(item)
      refreshLabels()
      updateItemRect()
      updateListRect()
    }

    function decreaseItem(item: ItemState) {
      itemStates.value.delete(item)
      refreshLabels()
      updateListRect()
    }

    function computeItemRect() {
      if (!wrapper.value) return

      let prevFix = 0
      let nextFix = 0

      if (props.arrow === 'outside') {
        if (props.vertical) {
          prevFix = prev.value ? prev.value.offsetHeight : 0
          nextFix = next.value ? next.value.offsetHeight : 0
        } else {
          prevFix = prev.value ? prev.value.offsetWidth : 0
          nextFix = next.value ? next.value.offsetWidth : 0
        }
      }

      if (props.vertical) {
        itemRect.width = 0
        itemRect.height = wrapper.value.offsetHeight - prevFix - nextFix
      } else {
        itemRect.width = wrapper.value.offsetWidth - prevFix - nextFix
        itemRect.height = 0
      }

      updateItemRect()
      updateListRect()
    }

    function handlePrev() {
      if (isDisabled.value || transition.value) return

      if (currentActive.value === 0) {
        if (!props.loop) return

        const itemList = Array.from(itemStates.value)
        const lastItem = itemList[itemList.length - 1]

        lastItem.offset = -itemList.length * itemRect.width
        listRect.offset = itemRect.width
        transition.value = true
        currentActive.value = itemList.length - 1
      } else {
        currentActive.value -= 1
        transition.value = true
        listRect.offset = -currentActive.value * itemRect.width
      }
    }

    function handleNext() {
      if (isDisabled.value || transition.value) return

      if (currentActive.value === itemStates.value.size - 1) {
        if (!props.loop) return

        const itemList = Array.from(itemStates.value)
        const firstItem = itemList[0]

        firstItem.offset = itemList.length * itemRect.width
        listRect.offset = -itemList.length * itemRect.width
        transition.value = true
        currentActive.value = 0
      } else {
        currentActive.value += 1
        transition.value = true
        listRect.offset = -currentActive.value * itemRect.width
      }
    }

    function handleWheel(active: number) {
      if (isDisabled.value || transition.value || active === currentActive.value) return

      const itemCount = itemStates.value.size
      const targetActive = (active % itemCount) + (active < 0 ? itemCount : 0)

      currentActive.value = targetActive
      transition.value = true
      listRect.offset = -targetActive * itemRect.width
    }

    function handleAfterMove() {
      itemStates.value.forEach(state => {
        state.offset = 0
      })

      isLocked.value = true

      nextTick(() => {
        listRect.offset = -currentActive.value * itemRect.width

        setTimeout(() => {
          isLocked.value = false
          transition.value = false
        }, 0)
      })
    }

    let playTimer: number
    let hoverTimer: number

    function setAutoplay() {
      window.clearInterval(playTimer)

      if (!props.autoplay) return

      let waiting = 4000

      if (typeof props.autoplay === 'number') {
        waiting = props.autoplay
      }

      playTimer = window.setInterval(() => {
        if (!props.loop && disabledNext.value) {
          handleWheel(0)
        } else {
          handleNext()
        }
      }, waiting)
    }

    function handleMouseEnter() {
      if (props.autoplay) {
        window.clearTimeout(hoverTimer)

        hoverTimer = window.setTimeout(() => {
          window.clearInterval(playTimer)
        }, 250)
      }

      if (props.arrowTrigger === 'hover' && props.arrow === 'inside') {
        arrowActive.value = true
      }
    }

    function handleMouseLeave() {
      if (props.autoplay) {
        window.clearTimeout(hoverTimer)

        hoverTimer = window.setTimeout(() => {
          setAutoplay()
        }, 250)
      }

      if (props.arrowTrigger === 'hover') {
        arrowActive.value = false
      }
    }

    return {
      prefix,
      itemStates,
      currentActive,

      className,
      style,
      listStyle,
      disabledPrev,
      disabledNext,
      arrowIcons,
      handleInnerClass,

      wrapper,
      prev,
      next,

      handlePrev,
      handleNext,
      handleWheel,
      handleAfterMove,
      handleMouseEnter,
      handleMouseLeave
    }
  }
})
</script>
