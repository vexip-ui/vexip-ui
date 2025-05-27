<script setup lang="ts">
import { AnchorLink } from '@/components/anchor-link'
import { Renderer } from '@/components/renderer'

import {
  getCurrentInstance,
  isVNode,
  nextTick,
  onBeforeUnmount,
  onMounted,
  provide,
  reactive,
  ref,
  watch,
} from 'vue'

import { emitEvent, useNameHelper, useProps } from '@vexip-ui/config'
import { proxyExposed } from '@vexip-ui/hooks'
import { isClient, isElement } from '@vexip-ui/utils'
import { anchorProps } from './props'
import { animateScrollTo } from './helper'
import { ANCHOR_STATE } from './symbol'

import type { ComponentInternalInstance } from 'vue'
import type { NativeScrollExposed } from '@/components/native-scroll'
import type { Scroll } from '@/components/scroll'
import type { AnchorLinkState, AnchorSlots, AnchorState } from './symbol'

type ScrollType = NativeScrollExposed & InstanceType<typeof Scroll>

defineOptions({ name: 'Anchor' })

const nh = useNameHelper('anchor')

const _props = defineProps(anchorProps)
const props = useProps('anchor', _props, {
  active: {
    default: '',
    static: true,
  },
  viewer: {
    default: null,
    static: true,
  },
  offset: 8,
  marker: false,
  scrollDuration: 500,
  markerTransition: () => nh.ns('fade'),
  options: {
    default: () => [],
    static: true,
  },
  bindHash: false,
  forceActive: false,
  slots: () => ({}),
})

const emit = defineEmits(['update:active'])

defineSlots<AnchorSlots>()

const currentActive = ref(props.active)
const animating = ref(false)
const markerTop = ref(0)
const linkStates = new Set<AnchorLinkState>()

const wrapper = ref<HTMLElement>()

let timer: ReturnType<typeof setTimeout>

let isRawViewer = false
let container: Window | HTMLElement | null = null
let scroller: ScrollType | null = null
let prevScrollTop = 0

if (isClient && !currentActive.value && props.bindHash) {
  currentActive.value = decodeURIComponent(location.hash)
}

provide<AnchorState>(
  ANCHOR_STATE,
  reactive({
    currentActive,
    increaseLink,
    decreaseLink,
    handleActive,
  }),
)

watch(
  () => props.active,
  value => {
    currentActive.value = value
  },
)
watch(() => props.viewer, updateContainer)

onMounted(() => {
  updateContainer()
  computeMarkerPosition()
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
  isClient &&
    nextTick(() => {
      const viewer: unknown = props.viewer

      prevScrollTop = 0

      let _container: Window | Node | ComponentInternalInstance | null = null
      let refName = 'scroll'

      if (typeof viewer === 'string') {
        if (viewer.startsWith('ref:')) {
          refName = viewer.substring(4)
          refName = refName || 'scroll'
        } else if (['window', 'document', 'html'].includes(viewer)) {
          _container = window
        } else if (viewer === 'body') {
          _container = document.body
        } else if (viewer === 'root') {
          _container = instance.root
        } else {
          _container = document.querySelector(viewer)
        }
      } else if (typeof viewer === 'function') {
        _container = viewer()
      } else if (isElement(viewer)) {
        _container = viewer
      }

      if (_container === window || isElement(_container)) {
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
            scroller = proxyExposed({ component: _container } as any)

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

function getContainerEl() {
  if (!container) return null

  return container === window ? document.documentElement : (container as HTMLElement)
}

function computeCurrentLink(scrollTop: number) {
  if (!linkStates.size || !container) return

  const containerTop = getContainerEl()!.offsetTop
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
        offset: element.offsetTop,
      })
    }
  })

  offsetList.sort((prev, next) => prev.offset - next.offset)
  offsetList.push({
    link: '',
    offset: Infinity,
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

  prevScrollTop = scrollTop

  if (currentActive.value !== currentLink) {
    currentActive.value = currentLink
    emit('update:active', currentLink)
    emitEvent(props.onChange, currentLink)
  }
}

function handleContainerScroll(event: Event) {
  if (animating.value) return

  const scrollTop = isRawViewer
    ? (
        (event.target === window || event.target === document
          ? document.documentElement
          : event.target) as HTMLElement
      ).scrollTop
    : (event as MouseEvent).clientY

  computeCurrentLink(scrollTop)
  computeMarkerPosition()
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
  if (
    (!props.forceActive && link === currentActive.value) ||
    !link.startsWith('#') ||
    link.length < 2
  ) {
    return
  }

  const element = document.querySelector(link) as HTMLElement | null

  if (!element) return

  clearTimeout(timer)

  animating.value = true

  const elementTop = element.offsetTop
  const duration = Math.max(props.scrollDuration, 0)

  if (isRawViewer && container) {
    const containerEl = getContainerEl()!
    // const from = containerEl.scrollTop
    const to = Math.min(
      elementTop - containerEl.offsetTop - props.offset,
      containerEl.scrollHeight - containerEl.clientHeight,
    )

    animateScrollTo(containerEl, prevScrollTop, to, duration, () => {
      timer = setTimeout(() => {
        animating.value = false
      }, 10)
    })
    computeCurrentLink(to)
    computeMarkerPosition()
  } else if (scroller) {
    const [min, max] = scroller.getYScrollLimit()
    const clientY = Math.max(Math.min(elementTop - props.offset, max), min)

    scroller.scrollTo(0, clientY, duration).then(() => {
      timer = setTimeout(() => {
        animating.value = false
      }, duration + 10)
    })

    computeCurrentLink(clientY)
    computeMarkerPosition()
  } else {
    animating.value = false
  }

  if (isClient && props.bindHash && location) {
    location.hash = encodeURIComponent(currentActive.value.replace(/^#/, ''))
  }
}

function computeMarkerPosition() {
  const currentLink = Array.from(linkStates).find(
    state => state.to && state.to === currentActive.value,
  )

  if (currentLink?.el) {
    const linkRect = currentLink.el.getBoundingClientRect()
    const wrapperTop = wrapper.value?.getBoundingClientRect().top ?? 0

    markerTop.value = linkRect.top - wrapperTop + linkRect.height / 2 + 0.5
  }
}
</script>

<template>
  <div
    ref="wrapper"
    :class="{
      [nh.b()]: true,
      [nh.bs('vars')]: true,
      [nh.bm('inherit')]: props.inherit,
      [nh.bm('no-marker')]: !props.marker
    }"
  >
    <ul :class="nh.be('list')">
      <slot>
        <Renderer :renderer="props.slots.default">
          <AnchorLink
            v-for="link in props.options"
            :key="link.to"
            :to="link.to"
            :title="link.title"
            :children="link.children"
          >
            {{ link.label }}
          </AnchorLink>
        </Renderer>
      </slot>
    </ul>
    <Transition appear :name="props.markerTransition">
      <div
        v-if="props.marker && currentActive"
        :class="nh.be('marker')"
        :style="{ top: `${markerTop}px` }"
      >
        <slot name="marker">
          <Renderer :renderer="props.slots.marker">
            <div :class="nh.be('pointer')"></div>
          </Renderer>
        </slot>
      </div>
    </Transition>
  </div>
</template>
