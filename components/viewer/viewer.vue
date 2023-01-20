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
          <slot></slot>
        </div>
      </div>
    </div>
    <div
      :class="toolbarClass"
      role="toolbar"
      @mouseenter="handleEnterToolbar"
      @mouseleave="handleLeaveToolbar"
    >
      <template v-for="action in allActions" :key="action.name">
        <template v-if="!getActionProp(action, 'hidden')">
          <button
            :class="{
              [nh.be('action')]: true,
              [nh.bem('action', 'disabled')]: getActionProp(action, 'disabled')
            }"
            :title="getActionProp(action, 'title')"
            @click.stop="action.process(state)"
          >
            <Renderer
              v-if="typeof action.icon === 'function'"
              :renderer="action.icon"
              :data="{ state }"
            ></Renderer>
            <Icon
              v-else
              :icon="action.icon"
              :style="getActionProp(action, 'iconStyle')"
              :scale="getActionProp(action, 'iconScale') || 1"
            ></Icon>
          </button>
          <Divider
            v-if="getActionProp(action, 'divided')"
            inherit
            :vertical="!toolbarVertical"
          ></Divider>
        </template>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRef, computed, onMounted } from 'vue'
import { Divider } from '@/components/divider'
import { Icon } from '@/components/icon'
import { Renderer } from '@/components/renderer'
import {
  ArrowRotateLeft,
  ArrowRotateRight,
  Repeat,
  Plus,
  Minus,
  Expand,
  Compress,
  ArrowsRotate
} from '@vexip-ui/icons'
import { useNameHelper, useProps, useLocale, emitEvent } from '@vexip-ui/config'
import { useMoving, useFullScreen, useSetTimeout, useModifier } from '@vexip-ui/hooks'
import { boundRange, toFixed } from '@vexip-ui/utils'
import { viewerProps } from './props'
import { InternalActionName } from './symbol'

import type { ToolbarAction } from './symbol'

export default defineComponent({
  name: 'Viewer',
  components: {
    Divider,
    Icon,
    Renderer
  },
  props: viewerProps,
  emits: [],
  setup(_props) {
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
      noTransition: false
    })

    const nh = useNameHelper('viewer')
    const locale = useLocale('viewer', toRef(props, 'locale'))

    const { timer } = useSetTimeout()
    const toolbarActive = ref(false)

    const zoom = ref(1)
    const rotate = ref(0)
    const flipX = ref(false)
    const flipY = ref(false)

    const transition = ref<HTMLElement>()

    const {
      supported: fullSupported,
      target: viewer,
      full,
      enter: enterFull,
      exit: exitFull
    } = useFullScreen()
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
    })
    const zoomOrigin = {
      x: 0,
      y: 0
    }

    useModifier({
      target: viewer,
      passive: false,
      onKeyDown: (event, modifier) => {
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

    function getActionProp<K extends Exclude<keyof ToolbarAction, 'name' | 'icon' | 'process'>>(
      action: ToolbarAction,
      prop: K
    ) {
      const value = action[prop]

      return (typeof value === 'function' ? value(state) : value) as Exclude<
        ToolbarAction[K],
        (...args: any) => any
      >
    }

    const internalActions: ToolbarAction[] = [
      {
        name: InternalActionName.RotateRight,
        icon: ArrowRotateRight,
        process: () => handleRotate(props.rotateDelta),
        title: () => locale.value.rotateRight,
        hidden: () => props.rotateDisabled
      },
      {
        name: InternalActionName.RotateLeft,
        icon: ArrowRotateLeft,
        process: () => handleRotate(-1 * props.rotateDelta),
        title: () => locale.value.rotateLeft,
        hidden: () => props.rotateDisabled,
        divided: true
      },
      {
        name: InternalActionName.FlipHorizontal,
        icon: Repeat,
        process: () => toggleFlipHorizontal(),
        title: () => locale.value.flipHorizontal,
        hidden: () => props.flipDisabled
      },
      {
        name: InternalActionName.FlipVertical,
        icon: Repeat,
        process: () => toggleFlipVertical(),
        title: () => locale.value.flipVertical,
        hidden: () => props.flipDisabled,
        iconStyle: 'transform: rotate(90deg)',
        divided: true
      },
      {
        name: InternalActionName.ZoomIn,
        icon: Plus,
        process: () => handleZoom(props.zoomDelta),
        title: () => locale.value.zoomIn,
        hidden: () => props.zoomDisabled
      },
      {
        name: InternalActionName.ZoomOut,
        icon: Minus,
        process: () => handleZoom(-1 * props.zoomDelta),
        title: () => locale.value.zoomOut,
        hidden: () => props.zoomDisabled,
        divided: true
      },
      {
        name: InternalActionName.FullScreen,
        icon: Expand,
        process: () => toggleFull(true),
        title: () => locale.value.fullScreen,
        hidden: () => props.fullDisabled || full.value,
        divided: true
      },
      {
        name: InternalActionName.FullScreenExit,
        icon: Compress,
        process: () => toggleFull(false),
        title: () => locale.value.fullScreenExit,
        hidden: () => props.fullDisabled || !full.value,
        divided: true
      },
      {
        name: InternalActionName.Reset,
        icon: ArrowsRotate,
        process: handleReset,
        title: () => locale.value.reset,
        divided: true
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
        width: /\d$/.test(`${props.width}`) ? `${props.width}px` : props.width,
        height: /\d$/.test(`${props.height}`) ? `${props.height}px` : props.height
      }
    })
    const toolbarVertical = computed(() => {
      const [layout] = props.toolbarPlacement.split('-')

      return layout === 'left' || layout === 'right'
    })
    const toolbarClass = computed(() => {
      return {
        [nh.be('toolbar')]: true,
        [nh.bem('toolbar', 'active')]: props.toolbarFade < 300 || toolbarActive.value,
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
      const map = new Map<string, ToolbarAction>()

      internalActions.concat(props.actions).forEach(action => {
        if (action.name) {
          map.set(action.name, action)
        }
      })

      return Array.from(map.values())
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

    function handleRotate(deg: number) {
      if (props.rotateDisabled) {
        return
      }

      rotate.value += deg

      if (props.noTransition && rotate.value % 360 === 0) {
        rotate.value = 0
      }

      emitEvent(props.onRotate, deg, state)
    }

    function toggleFlipHorizontal(target = !flipX.value) {
      if (props.flipDisabled) {
        return
      }

      flipX.value = target
      emitEvent(props.onFlipX, target, state)
    }

    function toggleFlipVertical(target = !flipY.value) {
      if (props.flipDisabled) {
        return
      }

      flipY.value = target
      emitEvent(props.onFlipY, target, state)
    }

    function handleZoom(ratio: number) {
      if (props.zoomDisabled || !container.value) {
        return
      }

      const containerRect = container.value.getBoundingClientRect()
      const { x, y } = zoomOrigin
      const { offsetWidth, offsetHeight } = container.value
      const prveZoom = zoom.value

      zoom.value = toFixed(boundRange(zoom.value + ratio, props.zoomMin, props.zoomMax), 5)

      const delta = zoom.value / prveZoom - 1
      const originX = delta * offsetWidth * 0.5
      const originY = delta * offsetHeight * 0.5

      currentLeft.value -= delta * (x - containerRect.left - currentLeft.value) - originX
      currentTop.value -= delta * (y - containerRect.top - currentTop.value) - originY

      emitEvent(props.onZoom, zoom.value, state)
    }

    async function toggleFull(target = !full.value) {
      target ? await enterFull() : await exitFull()

      emitEvent(props.onFull, target, state)
    }

    function handleReset() {
      currentTop.value = 0
      currentLeft.value = 0
      rotate.value = 0
      flipX.value = false
      flipY.value = false
      zoom.value = 1

      emitEvent(props.onReset, state)
    }

    function normalizeProps() {
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

      const fade =
        typeof props.toolbarFade === 'number' ? props.toolbarFade : props.toolbarFade ? 1500 : 0

      if (fade > 0) {
        timer.toolbarFade = setTimeout(() => {
          toolbarActive.value = false
        }, fade)
      }
    }

    return {
      props,
      nh,
      moving,
      fullSupported,
      state,

      viewer,
      container,
      transition,

      className,
      style,
      toolbarVertical,
      toolbarClass,
      contentStyle,
      transitionStyle,
      allActions,

      getActionProp,
      handleWheel,
      handleRotate,
      toggleFlipHorizontal,
      toggleFlipVertical,
      handleZoom,
      toggleFull,
      handleReset,
      normalizeProps,
      handleEnterToolbar,
      handleLeaveToolbar
    }
  }
})
</script>
