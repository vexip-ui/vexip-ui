<template>
  <div ref="wrapper" :class="nh.b()" :style="affixStyle">
    <div :class="{ [nh.bm('fixed')]: fixed }" :style="fixedStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { isElement } from '@/common/utils'

import {
  computed,
  defineComponent,
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

import type { NativeScrollExposed } from '../native-scroll'
import type { Scroll } from '@/components/scroll'

import type { CSSProperties, ComponentInternalInstance } from 'vue'

type ScrollType = NativeScrollExposed & InstanceType<typeof Scroll>

export default defineComponent({
  name: 'Affix',
  props: affixProps,
  emits: [],
  setup(_props, { expose }) {
    const props = useProps('affix', _props, {
      offset: 0,
      zIndex: 100,
      target: '',
      position: 'top'
    })

    const nh = useNameHelper('affix')

    const wrapper = shallowRef<HTMLDivElement>()
    const target = shallowRef<HTMLElement>()
    const instance = getCurrentInstance()!

    let isRawViewer = false
    let container: Window | HTMLElement | null = null
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

      const offset = props.offset ? `${props.offset}px` : 0
      const _transform = transform.value ? `translateY(${transform.value}px)` : ''

      return {
        height: `${affixHeight.value}px`,
        width: `${affixWidth.value}px`,
        top: props.position === 'top' ? offset : '',
        bottom: props.position === 'bottom' ? offset : '',
        transform: _transform,
        zIndex: props.zIndex
      }
    })

    function update() {
      if (!wrapper.value || !target.value || !container) return

      const wrapperRect = wrapper.value.getBoundingClientRect()
      const targetRect = target.value.getBoundingClientRect()
      affixHeight.value = wrapperRect.height
      affixWidth.value = wrapperRect.width
      scrollTop.value =
        container instanceof Window
          ? document.documentElement.scrollTop
          : (container as unknown as ScrollType).scrollY || 0
      scrollTop.value = document.documentElement.scrollTop
      clientHeight.value = document.documentElement.clientHeight

      if (props.position === 'top') {
        if (props.target) {
          const difference = targetRect.bottom - props.offset - affixHeight.value
          fixed.value = props.offset > wrapperRect.top && targetRect.bottom > 0
          transform.value = difference < 0 ? difference : 0
        } else {
          fixed.value = props.offset > wrapperRect.top
        }
      } else {
        if (props.target) {
          const difference = clientHeight.value - targetRect.top - props.offset - affixHeight.value
          fixed.value =
            clientHeight.value - props.offset < wrapperRect.bottom &&
            clientHeight.value > targetRect.top
          transform.value = difference < 0 ? -difference : 0
        } else {
          fixed.value = clientHeight.value - props.offset < wrapperRect.bottom
        }
      }
    }

    function handleContainerScroll() {
      update()

      emitEvent(props.onScroll, {
        scrollTop: scrollTop.value,
        fixed: fixed.value
      })
    }

    function updateContainer() {
      let _container: ComponentInternalInstance | null = instance.parent!
      const refName = 'scroll'

      while (_container) {
        const name = _container.type?.name

        if (name === 'Scroll' || name === 'NativeScroll') {
          const { exposeProxy, exposed, proxy } = _container

          scroller = new Proxy({} as any, {
            get(_, key) {
              return (proxy as any)?.[key] ?? (exposeProxy as any)?.[key] ?? (exposed as any)?.[key]
            }
          })

          break
        }

        const refTemp = _container.refs?.[refName]

        if (refTemp) {
          if (isElement(refTemp)) {
            isRawViewer = true
            container = refTemp as HTMLElement
          } else {
            scroller = refTemp as ScrollType
          }

          break
        }

        _container = _container.parent
      }

      if (scroller) {
        scroller.addScrollListener(handleContainerScroll)
        container = scroller.$el
      } else if (!container) {
        isRawViewer = true
        container = window
      }

      if (isRawViewer && container) {
        container.addEventListener('scroll', handleContainerScroll)
      }
    }

    function removeListener() {
      if (scroller) {
        scroller.removeScrollListener(handleContainerScroll)
        scroller = null
      }

      if (container) {
        container.removeEventListener('scroll', handleContainerScroll)
      }
    }

    watchEffect(update)
    watch(fixed, fixed => {
      emitEvent(props.onChange, fixed)
    })

    onMounted(() => {
      if (props.target) {
        target.value = document.querySelector<HTMLElement>(props.target) ?? undefined
        if (!target.value) {
          throw new Error(`Affix prop target is not existed: ${props.target}`)
        }
      } else {
        target.value = document.documentElement
      }

      updateContainer()
    })

    onBeforeUnmount(() => {
      removeListener()
    })

    expose({
      update
    })

    return {
      props,
      nh,
      wrapper,

      fixed,
      affixStyle,
      fixedStyle
    }
  }
})
</script>
