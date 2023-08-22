<script setup lang="ts">
import {
  computed,
  getCurrentInstance,
  onBeforeUnmount,
  onMounted,
  ref,
  shallowRef,
  watch,
  watchEffect
} from 'vue'

import { emitEvent, useNameHelper, useProps } from '@vexip-ui/config'
import { affixProps } from './props'
import { callIfFunc, isClient, isElement } from '@vexip-ui/utils'
import { clearLastScroller, handleLastScroller } from './helpers'

import type { NativeScrollExposed } from '@/components/native-scroll'
import type { ScrollExposed } from '@/components/scroll'

import type { CSSProperties, ComponentInternalInstance } from 'vue'

type ScrollType = NativeScrollExposed & ScrollExposed

const _props = defineProps(affixProps)
const props = useProps('affix', _props, {
  offset: 0,
  zIndex: 100,
  position: 'top',
  target: null
})

const nh = useNameHelper('affix')

const instance = getCurrentInstance()!

const wrapper = shallowRef<HTMLElement>()
const target = shallowRef<HTMLElement>()
const container = shallowRef<Window | HTMLElement>()

let isRawViewer = false
let scroller: ScrollType | null = null

const fixed = ref(false)
const affixHeight = ref(0)
const affixWidth = ref(0)
const scrollTop = ref(0)
const clientHeight = ref(0)
const transform = ref(0)

const affixStyle = computed<CSSProperties>(() => {
  return {
    height: fixed.value ? `${affixHeight.value}px` : '',
    width: fixed.value ? `${affixWidth.value}px` : ''
  }
})
const fixedStyle = computed<CSSProperties>(() => {
  if (!fixed.value) return {}

  let _top = props.offset
  let _bottom = props.offset

  if (isElement(container.value)) {
    if (props.target && props.position === 'top') {
      _top += transform.value
    } else {
      _bottom += transform.value
    }
  }

  return {
    height: `${affixHeight.value}px`,
    width: `${affixWidth.value}px`,
    top: props.position === 'top' ? `${_top}px` : '',
    bottom: props.position === 'bottom' ? `${_bottom}px` : '',
    zIndex: props.zIndex
  }
})

watchEffect(update)
watch(fixed, fixed => {
  emitEvent(props.onChange, fixed)
})

defineExpose({ update })

onMounted(() => {
  if (props.target) {
    const _target: unknown = callIfFunc(props.target)

    if (typeof _target === 'string') {
      target.value = document.querySelector<HTMLElement>(_target) ?? undefined

      if (!target.value) {
        throw new Error(`[vexip-ui:Affix] target not exists: ${props.target}`)
      }
    } else {
      target.value = _target as any
    }
  } else {
    target.value = document.documentElement
  }

  updateContainer()
})

onBeforeUnmount(() => {
  removeListener()
})

function update() {
  if (!wrapper.value || !target.value || !container.value) return

  const wrapperRect = wrapper.value.getBoundingClientRect()
  const targetRect = target.value.getBoundingClientRect()

  affixHeight.value = wrapperRect.height
  affixWidth.value = wrapperRect.width
  scrollTop.value =
    container.value === window
      ? document.documentElement.scrollTop
      : (container.value as unknown as ScrollType).scrollY || 0
  scrollTop.value = document.documentElement.scrollTop
  clientHeight.value = document.documentElement.clientHeight

  if (props.position === 'top') {
    if (props.target) {
      transform.value = targetRect.top
      fixed.value = wrapperRect.top < targetRect.top + props.offset
    } else {
      fixed.value = props.offset > wrapperRect.top
    }
  } else {
    if (props.target) {
      transform.value = clientHeight.value - targetRect.bottom
      fixed.value = targetRect.bottom < props.offset + wrapperRect.bottom
    } else {
      fixed.value = clientHeight.value - props.offset < wrapperRect.bottom
    }
  }
}

function handleContainerScroll() {
  handleLastScroller(target)
  update()

  emitEvent(props.onScroll, {
    scrollTop: scrollTop.value,
    fixed: fixed.value
  })
}

function updateContainer() {
  removeListener()

  if (!isClient) return

  if (props.target) {
    container.value = target.value!
    container.value.addEventListener('scroll', handleContainerScroll)
  } else {
    let _container: ComponentInternalInstance | null = instance.parent!
    const refName = 'scroll'

    while (_container) {
      const name = _container.type?.name

      if (name === 'Scroll' || name === 'NativeScroll') {
        const { exposeProxy, exposed, proxy } = _container
        const _scroller = new Proxy({} as any, {
          get(_, key) {
            return (proxy as any)?.[key] ?? (exposeProxy as any)?.[key] ?? (exposed as any)?.[key]
          }
        })
        const scrollerEl = _scroller?.$el as HTMLElement

        if (!scrollerEl.getAttribute('class')?.includes('vxp-native-scroll--horizontal')) {
          scroller = _scroller
          break
        }
      }

      const refTemp = _container.refs?.[refName]

      if (refTemp) {
        if (isElement(refTemp)) {
          isRawViewer = true
          container.value = refTemp as HTMLElement
        } else {
          scroller = refTemp as ScrollType
        }

        break
      }

      _container = _container.parent
    }

    if (scroller) {
      scroller.addScrollListener(handleContainerScroll)
      container.value = scroller.$el
    } else if (!container.value) {
      isRawViewer = true
      container.value = window
    }

    if (isRawViewer && container.value) {
      container.value.addEventListener('scroll', handleContainerScroll)
    }
  }
}

function removeListener() {
  if (scroller) {
    scroller.removeScrollListener(handleContainerScroll)
    scroller = null
  }

  if (container.value) {
    container.value.removeEventListener('scroll', handleContainerScroll)
    container.value = undefined
  }

  clearLastScroller(target)
}
</script>

<template>
  <div ref="wrapper" :class="nh.b()" :style="affixStyle">
    <div :class="{ [nh.bm('fixed')]: fixed }" :style="fixedStyle">
      <slot></slot>
    </div>
  </div>
</template>
