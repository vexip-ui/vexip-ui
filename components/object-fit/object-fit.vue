<script setup lang="ts">
import { vResize } from '@/directives/resize'

import { computed, ref, watch } from 'vue'

import { useNameHelper, useProps } from '@vexip-ui/config'
import { objectFitProps } from './props'
import PositionParser from './PositionParser'

import type { ResizeInfo } from '@/common/hooks/src/resize'

defineOptions({
  name: 'ObjectFit',
})

const _props = defineProps(objectFitProps)
const props = useProps('objectFit', _props, {
  width: 0,
  height: 0,
  fit: 'none',
  isScale: false,
})

const nh = useNameHelper('object-fit')

const aspectRatio = computed(() => props.width / props.height)
const container = ref<HTMLElement>()
const innerWidth = ref(0)
const innerHeight = ref(0)
const defaultPosition = {
  alignItems: 'center',
  justifyContent: 'center',
}

// 定义有效的定位值映射
const positionMap = {
  top: 'flex-start',
  right: 'flex-end',
  bottom: 'flex-end',
  left: 'flex-start',
  center: 'center',
}

const positionStyle = computed(() => {
  // 字符串定位处理
  const pos = PositionParser.parse(props.position)

  let alignItems = positionMap['left']
  let justifyContent = positionMap['top']
  let transform
  if (pos.type === 'single') {
    if (typeof pos.x === 'string') {
      justifyContent = positionMap[pos.x]
      alignItems = 'center'
    } else {
      if (pos.x?.type === 'length') {
        transform = `translateX(${pos.x.value + pos.x.unit})`
      } else {
        if (pos.x?.type === 'percent') {
          // TODO:
          console.log('pos single x', pos)
          return defaultPosition
        } else {
          return defaultPosition
        }
      }
    }
  } else if (pos.type === 'double') {
    let transformY, transformX
    if (typeof pos.x === 'string') {
      justifyContent = positionMap[pos.x]
    } else {
      if (pos.x?.type === 'length') {
        transformX = `${pos.x.value + pos.x.unit}`
      } else {
        if (pos.x?.type === 'percent') {
          // TODO:
          console.log('pos double x', pos)
          return defaultPosition
        } else {
          return defaultPosition
        }
      }
    }

    if (typeof pos.y === 'string') {
      alignItems = positionMap[pos.y]
    } else {
      if (pos.y?.type === 'length') {
        transformY = `${pos.y.value + pos.y.unit}`
      } else {
        if (pos.y?.type === 'percent') {
          console.log('pos double y', pos)
          // TODO:
          return defaultPosition
        } else {
          return defaultPosition
        }
      }
    }
    // 拼接transform
    if (transformX && transformY) {
      transform = `translate(${transformX},${transformY})`
    } else if (transformX) {
      transform = `translateX(${transformX})`
    } else if (transformY) {
      transform = `translateY(${transformY})`
    }
  } else if (pos.type === 'edge') {
    return defaultPosition
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
  if (props.isScale) {
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
    const contentWidth = contentBoxSize.inlineSize
    const contentHeight = contentBoxSize.blockSize
    switch (props.fit) {
      case 'contain': {
        // 1根据容器宽度计算inner高度
        let width = contentWidth
        let height = width / aspectRatio.value
        if (height <= contentHeight) {
          innerHeight.value = height
          innerWidth.value = width
          return
        }
        // 2根据容器高度计算inner宽度
        height = contentHeight
        width = height * aspectRatio.value
        if (width < contentWidth) {
          innerHeight.value = height
          innerWidth.value = width
          return
        }
        break
      }
      case 'cover': {
        // 1根据容器宽度计算inner高度
        let width = contentWidth
        let height = width / aspectRatio.value
        if (height <= contentHeight) {
          innerHeight.value = contentHeight
          innerWidth.value = contentHeight * aspectRatio.value
          return
        }
        // 2根据容器高度计算inner宽度
        height = contentHeight
        width = height * aspectRatio.value
        if (width < contentWidth) {
          innerHeight.value = contentWidth * (1 / aspectRatio.value)
          innerWidth.value = contentWidth
          return
        }
        break
      }
      case 'fill': {
        innerWidth.value = contentWidth
        innerHeight.value = contentHeight
        break
      }
      case 'scale-down': {
        // 1根据容器宽度计算inner高度
        let width = contentWidth
        let height = width / aspectRatio.value
        if (height <= contentHeight) {
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
        height = contentHeight
        width = height * aspectRatio.value
        if (width < contentWidth) {
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
        // 默认模式
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
  currentWidth: innerWidth,
  currentHeight: innerHeight,
  scaleX,
  scaleY,
})
</script>

<template>
  <div
    ref="container"
    v-resize="resizeObserverCallBack"
    :class="nh.b()"
    :style="positionStyle"
  >
    <div :class="nh.be('inner')" :style="innerStyle">
      <div :class="nh.be('scale')" :style="scaleStyle">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
