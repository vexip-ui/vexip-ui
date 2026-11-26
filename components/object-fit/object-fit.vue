<script setup lang="ts">
import { vResize } from '@/directives/resize'

import { computed, ref, watch } from 'vue'

import { useNameHelper, useProps } from '@vexip-ui/config'
import { objectFitProps } from './props'
import { type Key, type Position, parse } from './position-parser'

import type { ResizeInfo } from '@/common/hooks/src/resize'

defineOptions({
  name: 'ObjectFit',
})

const _props = defineProps(objectFitProps)
const props = useProps('objectFit', _props, {
  width: 0,
  height: 0,
  fit: 'none',
  scaleDisabled: false,
})

const nh = useNameHelper('object-fit')

const aspectRatio = computed(() => props.width / props.height)
const container = ref<HTMLElement>()
const wrapperWidth = ref(0)
const wrapperHeight = ref(0)
const innerWidth = ref(0)
const innerHeight = ref(0)
const defaultPosition = {
  alignItems: 'center',
  justifyContent: 'center',
}

// Define valid position value mapping
const positionMap = {
  top: 'flex-start',
  right: 'flex-end',
  bottom: 'flex-end',
  left: 'flex-start',
  center: 'center',
}

const pos = ref<Position>()
watch(
  () => props.position,
  value => {
    pos.value = parse(value)
  },
  { immediate: true },
)

const positionStyle = computed(() => {
  let alignItems = positionMap['left']
  let justifyContent = positionMap['top']
  let transform
  if (pos.value?.type === 'single') {
    if (typeof pos.value.x === 'string') {
      justifyContent = positionMap[pos.value.x as Key]
      alignItems = 'center'
    } else {
      if (pos.value.x?.type === 'length') {
        transform = `translateX(${pos.value.x.value + pos.value.x.unit})`
      } else if (pos.value.x?.type === 'percent') {
        const left = (pos.value.x.value / 100) * (wrapperWidth.value - innerWidth.value)
        if (props.fit === 'none' || left <= 0) {
          transform = `translateX(${left + 'px'})`
        }
        alignItems = 'center'
      } else {
        return defaultPosition
      }
    }
  } else if (pos.value?.type === 'double') {
    let transformY, transformX
    if (typeof pos.value.x === 'string') {
      justifyContent = positionMap[pos.value.x as Key]
    } else {
      if (pos.value.x?.type === 'length') {
        transformX = `${pos.value.x.value + pos.value.x.unit}`
      } else {
        if (pos.value.x?.type === 'percent') {
          const left = (pos.value.x.value / 100) * (wrapperWidth.value - innerWidth.value)
          if (props.fit === 'none' || left >= 0) {
            transformX = `${left + 'px'}`
          }
        } else {
          return defaultPosition
        }
      }
    }

    if (typeof pos.value.y === 'string') {
      alignItems = positionMap[pos.value.y as Key]
    } else {
      if (pos.value.y?.type === 'length') {
        transformY = `${pos.value.y.value + pos.value.y.unit}`
      } else if (pos.value.y?.type === 'percent') {
        const top = (pos.value.y.value / 100) * (wrapperHeight.value - innerHeight.value)
        if (props.fit === 'none' || top >= 0) {
          transformY = `${top + 'px'}`
        }
      } else {
        return defaultPosition
      }
    }
    if (transformX && transformY) {
      transform = `translate(${transformX},${transformY})`
    } else if (transformX) {
      transform = `translateX(${transformX})`
    } else if (transformY) {
      transform = `translateY(${transformY})`
    }
  } else if (pos.value?.type === 'edge') {
    const { x, y } = pos.value

    /* ---------- Horizontal ---------- */
    const justifyContent = x.key === 'left' ? 'flex-start' : 'flex-end'
    let offsetX = 0
    if (x.offset.type === 'length') {
      offsetX = x.key === 'left' ? x.offset.value : -x.offset.value
    } else {
      const base = (x.offset.value / 100) * wrapperWidth.value
      offsetX = x.key === 'left' ? base : -base
    }

    /* ---------- Vertical ---------- */
    const alignItems = y.key === 'top' ? 'flex-start' : 'flex-end'
    let offsetY = 0
    if (y.offset.type === 'length') {
      offsetY = y.key === 'top' ? y.offset.value : -y.offset.value
    } else {
      const base = (y.offset.value / 100) * wrapperHeight.value
      offsetY = y.key === 'top' ? base : -base
    }

    return {
      alignItems,
      justifyContent,
      transform: `translate(${offsetX}px, ${offsetY}px)`,
    }
  }
  return {
    alignItems,
    justifyContent,
    transform,
  }
})

const scaleX = computed(() => {
  return innerWidth.value / props.width
})

const scaleY = computed(() => {
  return innerHeight.value / props.height
})

const innerStyle = computed(() => {
  return {
    width: `${innerWidth.value}px`,
    height: `${innerHeight.value}px`,
  }
})

const scaleStyle = computed(() => {
  if (!props.scaleDisabled) {
    return {
      width: `${(1 / scaleX.value) * 100}%`,
      height: `${(1 / scaleY.value) * 100}%`,
      transform: `scale(${scaleX.value},${scaleY.value})`,
    }
  } else {
    return {
      width: '100%',
      height: '100%',
      transform: 'scale(1,1)',
    }
  }
})

const resizeObserverCallBack = (entry: ResizeInfo) => {
  if (entry) {
    // Firefox implements `contentBoxSize` as a single content rect, rather than an array
    const contentBoxSize: ResizeObserverSize = (
      Array.isArray(entry.contentBoxSize) ? entry.contentBoxSize[0] : entry.contentBoxSize
    ) as ResizeObserverSize
    wrapperWidth.value = contentBoxSize.inlineSize
    wrapperHeight.value = contentBoxSize.blockSize
    switch (props.fit) {
      case 'contain': {
        // 1根据容器宽度计算inner高度
        let width = wrapperWidth.value
        let height = width / aspectRatio.value
        if (height <= wrapperHeight.value) {
          innerHeight.value = height
          innerWidth.value = width
          return
        }
        // 2根据容器高度计算inner宽度
        height = wrapperHeight.value
        width = height * aspectRatio.value
        if (width < wrapperWidth.value) {
          innerHeight.value = height
          innerWidth.value = width
          return
        }
        break
      }
      case 'cover': {
        // 1根据容器宽度计算inner高度
        let width = wrapperWidth.value
        let height = width / aspectRatio.value
        if (height <= wrapperHeight.value) {
          innerHeight.value = wrapperHeight.value
          innerWidth.value = wrapperHeight.value * aspectRatio.value
          return
        }
        // 2根据容器高度计算inner宽度
        height = wrapperHeight.value
        width = height * aspectRatio.value
        if (width < wrapperWidth.value) {
          innerHeight.value = wrapperWidth.value * (1 / aspectRatio.value)
          innerWidth.value = wrapperWidth.value
          return
        }
        break
      }
      case 'fill': {
        innerWidth.value = wrapperWidth.value
        innerHeight.value = wrapperHeight.value
        break
      }
      case 'scale-down': {
        // 1根据容器宽度计算inner高度
        let width = wrapperWidth.value
        let height = width / aspectRatio.value
        if (height <= wrapperHeight.value) {
          if (height < props.height) {
            innerHeight.value = height
            innerWidth.value = width
          } else {
            innerHeight.value = props.height
            innerWidth.value = props.width
          }
          return
        }
        // 2根据容器高度计算inner宽度
        height = wrapperHeight.value
        width = height * aspectRatio.value
        if (width < wrapperWidth.value) {
          if (width < props.width) {
            innerHeight.value = height
            innerWidth.value = width
          } else {
            innerHeight.value = props.height
            innerWidth.value = props.width
          }
          return
        }
        break
      }
      default: {
        // Default mode
        innerWidth.value = props.width
        innerHeight.value = props.height
        break
      }
    }
  }
}

const init = () => {
  if (container.value) {
    const rect = container.value.getBoundingClientRect()
    const mockEntry: ResizeInfo = {
      contentBoxSize: {
        inlineSize: rect.width,
        blockSize: rect.height,
      },
    } as unknown as ResizeInfo
    resizeObserverCallBack(mockEntry)
  }
}

watch(
  () => props.fit,
  () => {
    init()
  },
)

defineExpose({
  innerWidth,
  innerHeight,
  wrapperWidth,
  wrapperHeight,
  scaleX,
  scaleY,
})
</script>

<template>
  <div ref="container" v-resize="resizeObserverCallBack" :class="nh.b()">
    <div :class="nh.be('offset')" :style="positionStyle">
      <div :class="nh.be('inner')" :style="innerStyle">
        <div :class="nh.be('scale')" :style="scaleStyle">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
