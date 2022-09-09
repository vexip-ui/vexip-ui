<template>
  <div
    ref="wrapper"
    :class="{
      [nh.b()]: true,
      [nh.bs('vars')]: true,
      [nh.bm('no-marker')]: !props.marker
    }"
  >
    <ul :class="nh.be('list')">
      <slot>
        <AnchorLink
          v-for="link in props.options"
          :key="link.to"
          :to="link.to"
          :title="link.title"
          :children="link.children"
        >
          {{ link.label }}
        </AnchorLink>
      </slot>
    </ul>
    <transition appear :name="props.markerTransition">
      <div
        v-if="props.marker && currentActive"
        :class="nh.be('marker')"
        :style="{ top: `${markerTop}px` }"
      >
        <slot name="marker">
          <div :class="nh.be('pointer')"></div>
        </slot>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  watch,
  provide,
  onMounted,
  onBeforeUnmount,
  nextTick,
  getCurrentInstance,
  isVNode
} from 'vue'
import { AnchorLink } from '@/components/anchor-link'
import { useNameHelper, useProps, booleanProp, eventProp, emitEvent } from '@vexip-ui/config'
import { animateScrollTo } from './helper'
import { ANCHOR_STATE } from './symbol'

import type { PropType, ComponentInternalInstance } from 'vue'
import type { NativeScroll } from '@/components/native-scroll'
import type { Scroll } from '@/components/scroll'
import type { AnchorLinkOptions, AnchorLinkState, AnchorState } from './symbol'

type ScrollType = InstanceType<typeof Scroll | typeof NativeScroll>

export default defineComponent({
  name: 'Anchor',
  components: {
    AnchorLink
  },
  props: {
    active: String,
    viewer: [String, Object, Function] as PropType<unknown>,
    offset: Number,
    marker: booleanProp,
    scrollDuration: Number,
    markerTransition: String,
    options: Array as PropType<AnchorLinkOptions[]>,
    bindHash: booleanProp,
    onChange: eventProp<(value: string) => void>()
  },
  emits: ['update:active'],
  setup(_props, { emit }) {
    const nh = useNameHelper('anchor')
    const props = useProps('anchor', _props, {
      active: {
        default: '',
        static: true
      },
      viewer: {
        default: null,
        static: true
      },
      offset: 8,
      marker: false,
      scrollDuration: 500,
      markerTransition: () => nh.ns('fade'),
      options: {
        default: () => [],
        static: true
      },
      bindHash: false
    })

    const currentActive = ref(props.active)
    const animating = ref(false)
    const markerTop = ref(0)
    const linkStates = new Set<AnchorLinkState>()

    const wrapper = ref<HTMLElement | null>(null)

    let timer: ReturnType<typeof setTimeout>

    let isRawViewer = false
    let container: HTMLElement | null = null
    let scroller: ScrollType | null = null

    if (!currentActive.value && props.bindHash) {
      currentActive.value = decodeURIComponent(location.hash)
    }

    provide<AnchorState>(
      ANCHOR_STATE,
      reactive({
        currentActive,
        increaseLink,
        decreaseLink,
        handleActive
      })
    )

    watch(
      () => props.active,
      value => {
        currentActive.value = value
      }
    )
    watch(currentActive, value => {
      emitEvent(props.onChange, value)
      emit('update:active', value)
    })
    watch(() => props.viewer, updateContainer)

    onMounted(() => {
      updateContainer()
      computeMarkerPoisiton()
    })

    onBeforeUnmount(() => {
      removeListener()
      clearTimeout(timer)
    })

    function increaseLink(state: AnchorLinkState) {
      linkStates.add(state)
      state.active = currentActive.value === state.to
    }

    function decreaseLink(state: AnchorLinkState) {
      linkStates.delete(state)
    }

    const instance = getCurrentInstance()!

    function updateContainer() {
      removeListener()
      nextTick(() => {
        const viewer: unknown = props.viewer

        let _container: Element | ComponentInternalInstance | null = null
        let refName = 'scroll'

        if (typeof viewer === 'string') {
          if (viewer.startsWith('ref:')) {
            refName = viewer.substring(4)
            refName = refName || 'scroll'
          } else if (['window', 'document', 'body'].includes(viewer)) {
            _container = document.body
          } else if (viewer === 'root') {
            _container = instance.root
          } else {
            _container = document.querySelector(viewer)
          }
        } else if (typeof viewer === 'function') {
          _container = viewer()
        } else if (viewer instanceof Element) {
          _container = viewer
        }

        if (_container instanceof Element) {
          isRawViewer = true
        } else {
          isRawViewer = false
          // container = this.$parent
        }

        if (!isRawViewer) {
          // ComponentInternalInstance
          _container = _container as ComponentInternalInstance
          _container = isVNode(_container?.vnode) ? _container : instance.parent

          while (_container) {
            const name = _container.type?.name

            if (name === 'Scroll' || name === 'NativeScroll') {
              scroller = _container.proxy as any as ScrollType
              break
            }

            const refTemp = _container.refs?.[refName]

            if (refTemp) {
              if (refTemp instanceof Element) {
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
            container = instance.parent?.proxy?.$el as HTMLElement
          }

          if (isRawViewer && container) {
            container.addEventListener('scroll', handleContainerScroll)
          }
        } else {
          container = _container as HTMLElement
          container.addEventListener('scroll', handleContainerScroll)
        }
      })
    }

    function computeCurrentLink(scrollTop: number) {
      if (!linkStates.size || !container) return

      const containerTop = container.offsetTop
      const offsetList: { link: string, offset: number }[] = []

      let offset = scrollTop + props.offset

      if (isRawViewer) {
        offset += containerTop
      }

      linkStates.forEach(state => {
        const id = state.to

        if (!id.startsWith('#')) return

        const element = document.querySelector(id) as HTMLElement | null

        if (element) {
          offsetList.push({
            link: id,
            offset: element.offsetTop
          })
        }
      })

      offsetList.sort((prev, next) => prev.offset - next.offset)
      offsetList.push({
        link: '',
        offset: Infinity
      })

      let currentLink = ''

      for (let i = 0, len = offsetList.length - 1; i < len; ++i) {
        const current = offsetList[i]
        const next = offsetList[i + 1]

        if (current.offset <= offset && next.offset > offset) {
          currentLink = current.link

          break
        }
      }

      currentActive.value = currentLink
    }

    function handleContainerScroll(event: Event) {
      if (animating.value) return

      const scrollTop = isRawViewer
        ? (event.target as HTMLElement).scrollTop
        : (event as MouseEvent).clientY

      computeCurrentLink(scrollTop)
      computeMarkerPoisiton()
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

    function handleActive(link: string) {
      if (link === currentActive.value || !link.startsWith('#') || link.length < 2) {
        return
      }

      const element = document.querySelector(link) as HTMLElement | null

      if (!element) return

      clearTimeout(timer)

      animating.value = true

      const elementTop = element.offsetTop
      const duration = Math.max(props.scrollDuration, 0)

      if (isRawViewer && container) {
        const from = container.scrollTop
        const to = Math.min(
          elementTop - container.offsetTop - props.offset,
          container.scrollHeight - container.offsetHeight
        )

        animateScrollTo(container, from, to, duration, () => {
          timer = setTimeout(() => {
            animating.value = false
          }, 10)
        })
        computeCurrentLink(to)
        computeMarkerPoisiton()
      } else if (scroller) {
        const [min, max] = scroller.getYScrollLimit()
        const clientY = Math.max(Math.min(elementTop - props.offset, max), min)

        scroller.scrollTo(0, clientY, duration)

        timer = setTimeout(() => {
          animating.value = false
        }, duration + 10)

        computeCurrentLink(clientY)
        computeMarkerPoisiton()
      } else {
        animating.value = false
      }

      if (props.bindHash && location) {
        location.hash = encodeURIComponent(currentActive.value.replace(/^#/, ''))
      }
    }

    function computeMarkerPoisiton() {
      const currentLink = Array.from(linkStates).find(
        state => state.to && state.to === currentActive.value
      )

      if (currentLink?.el) {
        const linkRect = currentLink.el.getBoundingClientRect()
        const wrapperTop = wrapper.value?.getBoundingClientRect().top ?? 0

        markerTop.value = linkRect.top - wrapperTop + linkRect.height / 2 + 0.5
      }
    }

    return {
      props,
      nh,

      currentActive,
      markerTop,

      wrapper
    }
  }
})
</script>
