<script setup lang="ts">
import { Divider } from '@/components/divider'
import { Icon } from '@/components/icon'
import { Renderer } from '@/components/renderer'

import { computed, h, nextTick, onMounted, reactive, ref, toRef } from 'vue'

import { emitEvent, useIcons, useLocale, useNameHelper, useProps } from '@vexip-ui/config'
import { useFullScreen, useModifier, useMoving, useSetTimeout } from '@vexip-ui/hooks'
import { boundRange, callIfFunc, toCssSize, toFixed } from '@vexip-ui/utils'
import { viewerProps } from './props'
import { InternalActionName, viewerDefaultActionLayout } from './symbol'

import type { ViewerActionLayout, ViewerState, ViewerToolbarAction } from './symbol'

defineOptions({ name: 'Viewer' })

const _props = defineProps(viewerProps)
const props = useProps('viewer', _props, {
  locale: null,
  width: '100%',
  height: '100%',
  moveDisabled: false,
  zoomDisabled: false,
  zoomDelta: 0.15,
  zoomMin: 0.1,
  zoomMax: Infinity,
  rotateDisabled: false,
  rotateDelta: 90,
  flipDisabled: false,
  fullDisabled: false,
  toolbarPlacement: 'bottom',
  actions: () => [],
  toolbarFade: false,
  noTransition: false,
  centerScale: false,
  actionLayout: () => []
})

defineSlots<{
  default: (params: { state: ViewerState }) => any,
  [action: `action-${string}`]: (params: { state: ViewerState }) => any
}>()

const nh = useNameHelper('viewer')
const locale = useLocale('viewer', toRef(props, 'locale'))
const icons = useIcons()

const { timer } = useSetTimeout()
const toolbarActive = ref(false)

const zoom = ref(1)
const rotate = ref(0)
const flipX = ref(false)
const flipY = ref(false)

const viewer = ref<HTMLElement>()
const transition = ref<HTMLElement>()

const { supported: fullSupported, full, enter: enterFull, exit: exitFull } = useFullScreen(viewer)
const {
  target: container,
  x: currentLeft,
  y: currentTop,
  moving
} = useMoving({
  onStart: (_, event) => {
    if (props.moveDisabled || event.button > 0) {
      return false
    }

    emitEvent(props.onMoveStart, getState())
  },
  onMove: () => {
    emitEvent(props.onMoveStart, getState())
  },
  onEnd: () => {
    emitEvent(props.onMoveStart, getState())
  }
})

const state = reactive({
  zoom,
  rotate,
  flipX,
  flipY,
  full,
  moving,
  x: currentLeft,
  y: currentTop
}) as ViewerState

const zoomOrigin = {
  x: 0,
  y: 0
}

useModifier({
  target: viewer,
  passive: false,
  onKeyDown: (event, modifier) => {
    if (moving.value) return

    if (modifier.up || modifier.down || modifier.left || modifier.right) {
      event.preventDefault()

      const current = modifier.up || modifier.down ? currentTop : currentLeft
      const step = modifier.up || modifier.left ? -10 : 10

      current.value += event.ctrlKey ? 5 * step : step

      modifier.resetAll()
    }
  }
})

function getState() {
  return state
}

function getActionProp<
  K extends Exclude<keyof ViewerToolbarAction, 'name' | 'icon' | 'iconRenderer' | 'process'>
>(action: ViewerToolbarAction, prop: K) {
  return callIfFunc(action[prop] as any, state) as Exclude<
    ViewerToolbarAction[K],
    (...args: any) => any
  >
}

function getActionClass(name: string) {
  return nh.be(name)
}

const internalActions: ViewerToolbarAction[] = [
  {
    name: InternalActionName.RotateRight,
    process: () => handleRotate(props.rotateDelta),
    iconRenderer: () => h(Icon, icons.value.rotateRight),
    class: getActionClass(InternalActionName.RotateRight),
    title: () => locale.value.rotateRight,
    hidden: () => props.rotateDisabled
  },
  {
    name: InternalActionName.RotateLeft,
    process: () => handleRotate(-1 * props.rotateDelta),
    iconRenderer: () => h(Icon, icons.value.rotateLeft),
    class: getActionClass(InternalActionName.RotateLeft),
    title: () => locale.value.rotateLeft,
    hidden: () => props.rotateDisabled
  },
  {
    name: InternalActionName.FlipX,
    process: () => toggleFlipX(),
    iconRenderer: () => h(Icon, icons.value.flipX),
    class: getActionClass(InternalActionName.FlipX),
    title: () => locale.value.flipHorizontal,
    hidden: () => props.flipDisabled
  },
  {
    name: InternalActionName.FlipY,
    process: () => toggleFlipY(),
    iconRenderer: () => h(Icon, icons.value.flipY),
    class: getActionClass(InternalActionName.FlipY),
    title: () => locale.value.flipVertical,
    hidden: () => props.flipDisabled
  },
  {
    name: InternalActionName.ZoomIn,
    process: () => handleZoom(props.zoomDelta),
    iconRenderer: () => h(Icon, icons.value.zoomIn),
    class: getActionClass(InternalActionName.ZoomIn),
    title: () => locale.value.zoomIn,
    hidden: () => props.zoomDisabled
  },
  {
    name: InternalActionName.ZoomOut,
    process: () => handleZoom(-1 * props.zoomDelta),
    iconRenderer: () => h(Icon, icons.value.zoonOut),
    class: getActionClass(InternalActionName.ZoomOut),
    title: () => locale.value.zoomOut,
    hidden: () => props.zoomDisabled
  },
  {
    name: InternalActionName.FullScreen,
    process: () => toggleFull(!full.value),
    iconRenderer: () => h(Icon, full.value ? icons.value.resetScreen : icons.value.fullScreen),
    class: getActionClass(InternalActionName.FullScreen),
    title: () => (full.value ? locale.value.fullScreenExit : locale.value.fullScreen),
    hidden: () => props.fullDisabled
  },
  {
    name: InternalActionName.Reset,
    process: () => handleReset(),
    iconRenderer: () => h(Icon, icons.value.refresh),
    class: getActionClass(InternalActionName.Reset),
    title: () => locale.value.reset
  }
]

const className = computed(() => {
  return {
    [nh.b()]: true,
    [nh.bs('vars')]: true,
    [nh.bm('inherit')]: props.inherit,
    [nh.bm('draggable')]: !props.moveDisabled,
    [nh.bm('resizable')]: !props.zoomDisabled,
    [nh.bm('full')]: full.value,
    [nh.bm('moving')]: moving.value,
    [nh.bm('static')]: props.noTransition
  }
})
const style = computed(() => {
  return {
    width: toCssSize(props.width),
    height: toCssSize(props.height)
  }
})
const toolbarVertical = computed(() => {
  const [layout] = props.toolbarPlacement.split('-')

  return layout === 'left' || layout === 'right'
})
const toolbarFade = computed(() => {
  return typeof props.toolbarFade === 'number' ? props.toolbarFade : props.toolbarFade ? 1500 : 0
})
const toolbarClass = computed(() => {
  return {
    [nh.be('toolbar')]: true,
    [nh.bem('toolbar', 'active')]: toolbarFade.value < 300 || toolbarActive.value,
    [nh.bem('toolbar', props.toolbarPlacement)]: true,
    [nh.bem('toolbar', 'vertical')]: toolbarVertical.value
  }
})
const contentStyle = computed(() => {
  return {
    transform: `translate3d(${currentLeft.value}px, ${currentTop.value}px, 0) scale(${zoom.value})`
  }
})
const transitionStyle = computed(() => {
  return {
    transform: `scaleX(${flipX.value ? -1 : 1}) scaleY(${flipY.value ? -1 : 1}) rotate(${
      rotate.value
    }deg)`
  }
})
const allActions = computed(() => {
  const map = new Map<string, ViewerToolbarAction>()
  const actions: ViewerToolbarAction[][] = []

  internalActions.concat(props.actions).forEach(action => {
    if (action.name) {
      map.set(action.name, action)
    }
  })

  let layout: ViewerActionLayout

  if (!props.actionLayout?.length) {
    layout = [...viewerDefaultActionLayout]

    if (props.actions.length) {
      layout.push(props.actions.map(action => action.name))
    }
  } else {
    layout = props.actionLayout
  }

  for (const names of layout) {
    const group = names.map(name => map.get(name)!).filter(Boolean)

    group.length && actions.push(group)
  }

  return actions
})

defineExpose({
  moving,
  fullSupported,
  state,
  viewer,
  container,
  transition,
  handleRotate,
  toggleFlipHorizontal: toggleFlipX,
  toggleFlipVertical: toggleFlipY,
  handleZoom,
  toggleFull,
  handleReset
})

onMounted(() => {
  if (container.value) {
    const rect = container.value.getBoundingClientRect()

    zoomOrigin.x = rect.left + rect.width * 0.5
    zoomOrigin.y = rect.top + rect.height * 0.5
  }
})

function handleWheel(event: WheelEvent) {
  event.stopPropagation()
  event.preventDefault()

  const sign = event.deltaY > 0 ? -1 : 1

  zoomOrigin.x = event.clientX
  zoomOrigin.y = event.clientY

  emitEvent(props.onWheel, sign, state)
  handleZoom(sign * props.zoomDelta)
}

function handleRotate(deg: number, emit = true) {
  if (props.rotateDisabled) return

  rotate.value += deg

  if (props.noTransition && rotate.value % 360 === 0) {
    rotate.value = 0
  }

  emit && emitEvent(props.onRotate, deg, state)

  if (props.noTransition) {
    nextTick(normalizeProps)
  }
}

function toggleFlipX(target = !flipX.value, emit = true) {
  if (props.flipDisabled) return

  flipX.value = target
  emit && emitEvent(props.onFlipX, target, state)
}

function toggleFlipY(target = !flipY.value, emit = true) {
  if (props.flipDisabled) return

  flipY.value = target
  emit && emitEvent(props.onFlipY, target, state)
}

function handleZoom(ratio: number, emit = true) {
  if (props.zoomDisabled || !container.value || moving.value) return

  const containerRect = container.value.getBoundingClientRect()
  const { x, y } = zoomOrigin
  const { offsetWidth, offsetHeight } = container.value
  const prevZoom = zoom.value

  zoom.value = toFixed(boundRange(zoom.value + ratio, props.zoomMin, props.zoomMax), 5)

  const delta = zoom.value / prevZoom - 1
  const originX = delta * offsetWidth * 0.5
  const originY = delta * offsetHeight * 0.5

  if (!props.centerScale) {
    currentLeft.value -= delta * (x - containerRect.left - currentLeft.value) - originX
    currentTop.value -= delta * (y - containerRect.top - currentTop.value) - originY
  }

  emit && emitEvent(props.onZoom, zoom.value, state)
}

async function toggleFull(isFull = !full.value, emit = true) {
  isFull ? await enterFull() : await exitFull()

  console.log(full.value, state.full)
  emit && emitEvent(props.onFull, isFull, state)
}

function handleReset(emit = true) {
  currentTop.value = 0
  currentLeft.value = 0
  rotate.value = 0
  flipX.value = false
  flipY.value = false
  zoom.value = 1

  emit && emitEvent(props.onReset, state)
}

function normalizeProps() {
  if (props.noTransition) {
    if (rotate.value % 360 === 0) {
      rotate.value = 0
    }

    return
  }

  const queue: Array<() => void> = []

  if (rotate.value % 360 === 0) {
    queue.push(
      () => {
        if (transition.value) {
          transition.value.style.transitionDuration = '0ms'
        }
      },
      () => {
        rotate.value = 0
      },
      () => {
        if (transition.value) {
          transition.value.style.transitionDuration = ''
        }
      }
    )
  }

  const run = () => {
    queue.shift()?.()
    queue.length && requestAnimationFrame(run)
  }

  run()
}

function handleEnterToolbar() {
  clearTimeout(timer.toolbarFade)
  toolbarActive.value = true
}

function handleLeaveToolbar() {
  clearTimeout(timer.toolbarFade)

  if (toolbarFade.value >= 300) {
    timer.toolbarFade = setTimeout(() => {
      toolbarActive.value = false
    }, toolbarFade.value)
  }
}
</script>

<template>
  <div
    ref="viewer"
    :class="className"
    tabindex="0"
    :style="style"
  >
    <div ref="container" :class="nh.be('container')" @wheel="handleWheel">
      <div :class="nh.be('content')" :style="contentStyle">
        <div
          ref="transition"
          :class="nh.be('transition')"
          :style="transitionStyle"
          @transitionend="normalizeProps"
        >
          <slot :state="state"></slot>
        </div>
      </div>
    </div>
    <div
      :class="toolbarClass"
      role="toolbar"
      @mouseenter="handleEnterToolbar"
      @mouseleave="handleLeaveToolbar"
    >
      <template v-for="(group, index) in allActions" :key="index">
        <template v-for="action in group" :key="action.name">
          <template v-if="!getActionProp(action, 'hidden')">
            <button
              type="button"
              :class="[
                {
                  [nh.be('action')]: true,
                  [nh.bem('action', 'disabled')]: getActionProp(action, 'disabled')
                },
                getActionProp(action, 'class')
              ]"
              :title="getActionProp(action, 'title')"
              @click.stop="action.process(state)"
            >
              <slot :name="`action-${action.name}`" :state="state">
                <Renderer
                  v-if="action.iconRenderer"
                  :renderer="action.iconRenderer"
                  :data="state"
                ></Renderer>
                <Icon
                  v-else-if="action.icon"
                  :icon="action.icon"
                  :style="getActionProp(action, 'iconStyle')"
                  :scale="getActionProp(action, 'iconScale') || 1"
                ></Icon>
                <template v-else>
                  {{ action.name }}
                </template>
              </slot>
            </button>
          </template>
        </template>
        <Divider
          v-if="index !== allActions.length - 1"
          inherit
          :vertical="!toolbarVertical"
        ></Divider>
      </template>
    </div>
  </div>
</template>
