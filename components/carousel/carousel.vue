<script setup lang="ts">
import { Icon } from '@/components/icon'
import { Renderer } from '@/components/renderer'
import { ResizeObserver } from '@/components/resize-observer'

import { computed, onMounted, provide, reactive, ref, toRef, watch } from 'vue'

import { emitEvent, useHoverDelay, useIcons, useNameHelper, useProps } from '@vexip-ui/config'
import { useHover, useRtl, useSetTimeout } from '@vexip-ui/hooks'
import { debounceMinor } from '@vexip-ui/utils'
import { carouselProps } from './props'
import { CAROUSEL_STATE } from './symbol'

import type { CarouselSlots, CarouselState, ItemState } from './symbol'

defineOptions({ name: 'Carousel' })

const _props = defineProps(carouselProps)
const props = useProps('carousel', _props, {
  active: {
    default: 0,
    static: true,
  },
  viewSize: {
    default: 3,
    validator: value => value > 0,
  },
  vertical: false,
  disabled: false,
  loop: false,
  arrow: {
    default: 'outside',
    validator: value => ['outside', 'inside', 'none'].includes(value),
  },
  arrowTrigger: {
    default: 'hover',
    validator: value => ['hover', 'always'].includes(value),
  },
  autoplay: {
    default: false,
    validator: value => (typeof value === 'number' ? value > 500 : true),
  },
  pointer: {
    default: 'none',
    validator: value => ['outside', 'inside', 'none'].includes(value),
  },
  speed: 300,
  activeOffset: 0,
  height: null,
  ignoreHover: false,
  slots: () => ({}),
})

const emit = defineEmits(['update:active'])

defineSlots<CarouselSlots>()

const nh = useNameHelper('carousel')
const icons = useIcons()
const hoverDelay = useHoverDelay()
const { isRtl } = useRtl()
const itemStates = ref(new Set<ItemState>())
const currentActive = ref(0)
const isLocked = ref(false) // 用于控制阻断快速连点
const arrowActive = ref(props.arrowTrigger === 'always')

const listRect = reactive({
  width: 0,
  height: 0,
})
const trackRect = reactive({
  width: 0,
  height: 0,
  offset: 0,
})
const itemRect = reactive({
  width: 0,
  height: 0,
})

const { wrapper, isHover } = useHover()

const prev = ref<HTMLElement>()
const next = ref<HTMLElement>()

const isDisabled = computed(() => {
  return props.disabled || itemStates.value.size <= props.viewSize
})
const className = computed(() => {
  return {
    [nh.b()]: true,
    [nh.bs('vars')]: true,
    [nh.bm('inherit')]: props.inherit,
    [nh.bm('vertical')]: props.vertical,
    [nh.bm('disabled')]: isDisabled.value,
  }
})
const style = computed(() => {
  return {
    height:
      props.vertical && props.height
        ? `${props.height}${typeof props.height === 'number' ? 'px' : ''}`
        : undefined,
  }
})
const listStyle = computed(() => {
  return {
    width: listRect.width ? `${listRect.width}px` : undefined,
    height: listRect.height ? `${listRect.height}px` : undefined,
  }
})
const trackStyle = computed(() => {
  return {
    width: trackRect.width ? `${trackRect.width}px` : undefined,
    height: trackRect.height ? `${trackRect.height}px` : undefined,
    transform: trackRect.offset
      ? `translate${props.vertical ? 'Y' : 'X'}(${
        isRtl.value && !props.vertical ? `${-trackRect.offset}` : trackRect.offset
      }px) translateZ(0)`
      : undefined,
    transitionDuration: isLocked.value ? '0ms' : `${props.speed}ms`,
  }
})
const disabledPrev = computed(() => {
  return isDisabled.value || (!props.loop && currentActive.value <= 0)
})
const disabledNext = computed(() => {
  return (
    isDisabled.value ||
    (!props.loop && currentActive.value >= itemStates.value.size - props.viewSize)
  )
})
const arrowIcons = computed(() => {
  return props.vertical
    ? [icons.value.angleUp, icons.value.angleDown]
    : isRtl.value
      ? [icons.value.angleRight, icons.value.angleLeft]
      : [icons.value.angleLeft, icons.value.angleRight]
})

watch(
  () => props.active,
  value => {
    handleWheel(value - props.activeOffset)
  },
)
watch(isHover, value => {
  if (props.ignoreHover) return

  if (value) {
    handleMouseEnter()
  } else {
    handleMouseLeave()
  }
})
watch(() => props.viewSize, refresh)
watch(() => props.autoplay, setAutoplay)

const refreshLabels = debounceMinor(() => {
  Array.from(itemStates.value).forEach((item, index) => {
    item.label = index
  })
})
const updateItemRect = debounceMinor(() => {
  itemStates.value.forEach(state => {
    state.width = itemRect.width
    state.height = itemRect.height
  })
})
const updateListRect = debounceMinor(() => {
  trackRect.width = itemRect.width * itemStates.value.size
  trackRect.height = itemRect.height * itemStates.value.size
})

provide<CarouselState>(
  CAROUSEL_STATE,
  reactive({
    vertical: toRef(props, 'vertical'),
    increaseItem,
    decreaseItem,
    isItemActive,
    handleSelect,
  }),
)

// 初始化时不使用过渡效果
let inTransition = false
let shouldReset = false

isLocked.value = true

onMounted(() => {
  computeItemRect()
  handleWheel(props.active - props.activeOffset)
  handleAfterMove()

  setTimeout(() => {
    isLocked.value = false
    inTransition = false

    setAutoplay()
  }, 0)
})

defineExpose({
  itemStates,
  currentActive,
  arrowActive,
  wrapper,
  prev,
  next,
  refresh,
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

function isItemActive(label: number) {
  return (currentActive.value + props.activeOffset) % itemStates.value.size === label
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
    listRect.width = 0
    listRect.height = wrapper.value.offsetHeight - prevFix - nextFix

    itemRect.width = 0
    itemRect.height = listRect.height / props.viewSize
  } else {
    listRect.width = wrapper.value.offsetWidth - prevFix - nextFix
    listRect.height = 0

    itemRect.width = listRect.width / props.viewSize
    itemRect.height = 0
  }
}

function refresh() {
  computeItemRect()
  updateItemRect()
  updateListRect()

  if (trackRect.offset > 0) {
    handlePrev(0)
  } else {
    handleNext(0)
  }

  setTimeout(() => {
    isLocked.value = false
    inTransition = false
  }, 0)
}

function emitChangeEvent() {
  const active = (currentActive.value + props.activeOffset) % itemStates.value.size

  emit('update:active', active)
  emitEvent(props.onChange, active)
}

function handlePrev(amount = 1) {
  if (isDisabled.value || inTransition) return

  const itemLength = props.vertical ? itemRect.height : itemRect.width
  const itemList = Array.from(itemStates.value)
  const itemCount = itemList.length
  const targetIndex = (currentActive.value - amount + itemCount) % itemCount
  const prevActive = currentActive.value

  if (targetIndex >= itemCount - props.viewSize) {
    if (!props.loop) return

    if (trackRect.offset < 0) {
      if (amount < currentActive.value) {
        trackRect.offset = -targetIndex * itemLength
      } else {
        trackRect.offset = itemLength * (itemCount - targetIndex)

        for (let i = targetIndex; i < itemCount; ++i) {
          itemList[i].offset = -itemCount * itemLength
        }
      }
    } else {
      for (let i = 0; i < itemCount; ++i) {
        itemList[i].offset =
          i < targetIndex
            ? 0
            : (isRtl.value && !props.vertical ? itemCount : -itemCount) * itemLength
      }

      trackRect.offset = itemLength * (itemCount - targetIndex)
    }

    currentActive.value = targetIndex
  } else {
    currentActive.value = targetIndex
    trackRect.offset = -currentActive.value * itemLength
  }

  shouldReset = currentActive.value <= itemCount - props.viewSize
  inTransition = true

  currentActive.value !== prevActive && emitChangeEvent()
}

function handleNext(amount = 1) {
  if (isDisabled.value || inTransition) return

  const itemLength = props.vertical ? itemRect.height : itemRect.width
  const itemList = Array.from(itemStates.value)
  const itemCount = itemList.length
  const targetIndex = currentActive.value + amount
  const prevActive = currentActive.value

  if (targetIndex > itemStates.value.size - props.viewSize) {
    if (!props.loop) return

    if (trackRect.offset > 0) {
      trackRect.offset = itemLength * (itemCount - targetIndex)
    } else {
      const anchorIndex = targetIndex + props.viewSize - itemCount

      for (let i = 0, len = itemList.length; i < len; ++i) {
        itemList[i].offset =
          i < anchorIndex
            ? (isRtl.value && !props.vertical ? -itemCount : itemCount) * itemLength
            : 0
      }

      trackRect.offset = -targetIndex * itemLength
    }

    currentActive.value = targetIndex % itemCount
  } else {
    currentActive.value = targetIndex
    trackRect.offset = -currentActive.value * itemLength
  }

  shouldReset = currentActive.value <= itemCount - props.viewSize
  inTransition = true

  currentActive.value !== prevActive && emitChangeEvent()
}

function handleWheel(active: number) {
  if (isDisabled.value || inTransition || active === currentActive.value) return

  const itemCount = itemStates.value.size

  active = (active % itemCount) + (active < 0 ? itemCount : 0)

  if (props.loop) {
    let forward: number
    let back: number

    if (active > currentActive.value) {
      forward = active - currentActive.value
      back = itemCount - active + currentActive.value
    } else {
      forward = itemCount - currentActive.value + active
      back = currentActive.value - active
    }

    if (forward < back) {
      handleNext(forward)
    } else if (forward > back) {
      handlePrev(back)
    } else {
      if (trackRect.offset > 0) {
        handlePrev(forward)
      } else {
        handleNext(forward)
      }
    }
  } else {
    if (active < currentActive.value) {
      handlePrev(currentActive.value - active)
    } else {
      handleNext(active - currentActive.value)
    }
  }
}

function handleAfterMove() {
  if (!shouldReset) {
    inTransition = false
  } else {
    itemStates.value.forEach(state => {
      state.offset = 0
    })

    shouldReset = false
    isLocked.value = true

    requestAnimationFrame(() => {
      trackRect.offset = -currentActive.value * (props.vertical ? itemRect.height : itemRect.width)

      requestAnimationFrame(() => {
        isLocked.value = false
        inTransition = false
      })
    })
  }
}

function handlePrevClick() {
  handlePrev(1)
  emitEvent(props.onPrev, (currentActive.value + props.activeOffset) % itemStates.value.size)
}

function handleNextClick() {
  handleNext(1)
  emitEvent(props.onNext, (currentActive.value + props.activeOffset) % itemStates.value.size)
}

function handleSelect(label: number) {
  emitEvent(props.onSelect, label)
}

const { timer } = useSetTimeout()

function setAutoplay() {
  clearInterval(timer.play)

  if (!props.autoplay) return

  let waiting = 4000

  if (typeof props.autoplay === 'number') {
    waiting = props.autoplay
  }

  timer.play = window.setInterval(() => {
    if (!props.loop && disabledNext.value) {
      handleWheel(0)
    } else {
      handleNext()
    }
  }, waiting)
}

function handleMouseEnter() {
  if (props.autoplay) {
    clearTimeout(timer.hover)

    timer.hover = setTimeout(() => {
      clearInterval(timer.play)
    }, hoverDelay.value)
  }

  if (props.arrowTrigger === 'hover' && props.arrow === 'inside') {
    arrowActive.value = true
  }
}

function handleMouseLeave() {
  if (props.autoplay) {
    clearTimeout(timer.hover)

    timer.hover = setTimeout(() => {
      setAutoplay()
    }, hoverDelay.value)
  }

  if (props.arrowTrigger === 'hover') {
    arrowActive.value = false
  }
}

function isPointerDisabled(index: number) {
  if (props.loop) return false

  return !(
    index >= props.activeOffset - 1 && index < itemStates.value.size - props.activeOffset - 1
  )
}
</script>

<template>
  <div
    ref="wrapper"
    :class="className"
    role="list"
    :style="style"
  >
    <ResizeObserver @resize="refresh">
      <div
        :style="{
          position: 'relative',
          display: 'flex',
          flexDirection: props.vertical ? 'column' : 'row',
          width: '100%'
        }"
      >
        <div
          v-if="props.arrow !== 'none'"
          ref="prev"
          :class="[
            nh.bem('arrow', props.arrow),
            nh.bem('arrow', 'prev'),
            arrowActive ? nh.bem('arrow', 'show') : ''
          ]"
        >
          <div
            :class="{
              [nh.be('handler')]: true,
              [nh.bem('handler', 'disabled')]: disabledPrev
            }"
            @click="handlePrevClick"
          >
            <slot name="prevArrow" :disabled="disabledPrev">
              <Renderer :renderer="props.slots.prevArrow" :data="{ disabled: disabledPrev }">
                <Icon v-bind="arrowIcons[0]" :scale="+(arrowIcons[0].scale || 1) * 1.5"></Icon>
              </Renderer>
            </slot>
          </div>
        </div>
        <div :class="nh.be('list')" :style="listStyle">
          <div :class="nh.be('track')" :style="trackStyle" @transitionend.self="handleAfterMove">
            <slot> <Renderer :renderer="props.slots.default"></Renderer>> </slot>
          </div>
        </div>
        <div
          v-if="props.arrow !== 'none'"
          ref="next"
          :class="[
            nh.bem('arrow', props.arrow),
            nh.bem('arrow', 'next'),
            arrowActive ? nh.bem('arrow', 'show') : ''
          ]"
        >
          <div
            :class="{
              [nh.be('handler')]: true,
              [nh.bem('handler', 'disabled')]: disabledNext
            }"
            @click="handleNextClick"
          >
            <slot name="nextArrow" :disabled="disabledNext">
              <Renderer :renderer="props.slots.nextArrow" :data="{ disabled: disabledNext }">
                <Icon v-bind="arrowIcons[1]" :scale="+(arrowIcons[1].scale || 1) * 1.5"></Icon>
              </Renderer>
            </slot>
          </div>
        </div>
      </div>
    </ResizeObserver>
    <div v-if="props.pointer !== 'none'" :class="nh.bem('pointers', props.pointer)">
      <div
        v-for="index in itemStates.size"
        :key="index"
        :class="{
          [nh.be('pointer')]: true,
          [nh.bem('pointer', 'active')]:
            index - 1 === (currentActive + props.activeOffset) % itemStates.size,
          [nh.bem('pointer', 'disabled')]: isPointerDisabled(index - props.activeOffset - 1)
        }"
        @click="handleWheel(index - props.activeOffset - 1)"
      >
        <slot
          name="pointer"
          :active="index - 1 === (currentActive + props.activeOffset) % itemStates.size"
        >
          <Renderer
            :renderer="props.slots.pointer"
            :data="{ active: index - 1 === (currentActive + props.activeOffset) % itemStates.size }"
          >
            <span :class="nh.be('pointer-inner')"></span>
          </Renderer>
        </slot>
      </div>
    </div>
  </div>
</template>
