<template>
  <div :class="className">
    <div ref="container" :class="nh.be('container')" @wheel="handleWheel">
      <div :class="nh.be('content')" :style="contentStyle">
        <div
          ref="transition"
          :class="nh.be('transition')"
          :style="scaleLayerStyle"
          @transitionend="normalizeProps"
        >
          <slot>
            <!-- <img src="https://www.vexipui.com/assets/4.23a4f29b.jpg" /> -->
          </slot>
        </div>
      </div>
    </div>
    <div :class="toolbarClass">
      <template v-for="action in allActions" :key="action.name">
        <template v-if="!getActionProp(action, 'hidden')">
          <div
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
            <Icon v-else :icon="action.icon" :scale="getActionProp(action, 'iconScale') || 0"></Icon>
          </div>
          <Divider v-if="getActionProp(action, 'divided')" :vertical="!toolbarVertical"></Divider>
        </template>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue'
import { Divider } from '@/components/divider'
import { Icon } from '@/components/icon'
import { Renderer } from '@/components/renderer'
import {
  ArrowRotateLeft,
  ArrowRotateRight,
  Plus,
  Minus,
  Expand,
  Compress,
  ArrowsRotate
} from '@vexip-ui/icons'
import { useNameHelper, useProps, useLocale, booleanProp } from '@vexip-ui/config'
import { useMoving } from '@vexip-ui/mixins'
import { InternalActionName } from './symbol'

import type { PropType } from 'vue'
import type { ToolbarPlacement, ToolbarAction } from './symbol'

export default defineComponent({
  name: 'Viewer',
  components: {
    Divider,
    Icon,
    Renderer
  },
  props: {
    moveDisabled: booleanProp,
    scaleDisabled: booleanProp,
    scaleDelta: Number,
    rotateDisabled: booleanProp,
    rotateDelta: Number,
    toolbarPlacement: String as PropType<ToolbarPlacement>,
    actions: Array as PropType<ToolbarAction[]>,
    toolbarFade: Number
  },
  emits: [
    'move-start',
    'move',
    'move-end'
  ],
  setup(_props, { emit }) {
    const props = useProps('viewer', _props, {
      moveDisabled: false,
      scaleDisabled: false,
      scaleDelta: 0.15,
      rotateDisabled: false,
      rotateDelta: 90,
      toolbarPlacement: 'bottom',
      actions: () => [],
      toolbarFade: 1500
    })

    const nh = useNameHelper('viewer')
    const locale = useLocale('viewer')

    const scale = ref(1)
    const rotate = ref(0)
    const full = ref(false)

    const transition = ref<HTMLElement | null>(null)

    const { target: container, x: currentLeft, y: currentTop, moving } = useMoving({
      onStart: (state, event) => {
        if (props.moveDisabled || event.button > 0) {
          return false
        }

        emit('move-start', {
          top: state.yStart,
          left: state.xStart
        })
      },
      onMove: state => {
        emit('move-start', {
          top: state.yEnd,
          left: state.xEnd
        })
      },
      onEnd: state => {
        emit('move-start', {
          top: state.yEnd,
          left: state.xEnd
        })
      }
    })

    const state = reactive({
      scale,
      rotate,
      full,
      moving,
      x: currentLeft,
      y: currentTop
    })

    function getActionProp<K extends Exclude<keyof ToolbarAction, 'name' | 'icon' | 'process'>>(
      action: ToolbarAction,
      prop: K
    ) {
      const value = action[prop]

      return (typeof value === 'function' ? value(state) : value) as Exclude<ToolbarAction[K], (...args: any) => any>
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
        name: InternalActionName.ZoomIn,
        icon: Plus,
        process: () => handleScale(props.scaleDelta),
        title: () => locale.value.zoomIn,
        hidden: () => props.scaleDisabled
      },
      {
        name: InternalActionName.ZoomOut,
        icon: Minus,
        process: () => handleScale(-1 * props.scaleDelta),
        title: () => locale.value.zoomOut,
        hidden: () => props.scaleDisabled,
        divided: true
      },
      {
        name: InternalActionName.FullScreen,
        icon: Expand,
        process: () => toggleFull(true),
        title: () => locale.value.fullScreen,
        hidden: () => full.value,
        divided: true
      },
      {
        name: InternalActionName.FullScreenExit,
        icon: Compress,
        process: () => toggleFull(false),
        title: () => locale.value.fullScreenExit,
        hidden: () => !full.value,
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
        [nh.bm('draggable')]: !props.moveDisabled,
        [nh.bm('resizable')]: !props.scaleDisabled,
        [nh.bm('moving')]: moving.value
      }
    })
    const toolbarVertical = computed(() => {
      const [layout] = props.toolbarPlacement.split('-')

      return layout === 'left' || layout === 'right'
    })
    const toolbarClass = computed(() => {
      return {
        [nh.be('toolbar')]: true,
        [nh.bem('toolbar', props.toolbarPlacement)]: true,
        [nh.bem('toolbar', 'vertical')]: toolbarVertical.value
      }
    })
    const contentStyle = computed(() => {
      return {
        transform: `translate3d(${currentLeft.value}px, ${currentTop.value}px, 0)`
      }
    })
    const scaleLayerStyle = computed(() => {
      return {
        transform: `scale(${scale.value}) rotate(${rotate.value}deg)`
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

    function handleWheel(event: WheelEvent) {
      if (props.scaleDisabled) {
        return
      }

      handleScale((event.deltaY > 0 ? -1 : 1) * props.scaleDelta)
    }

    function handleRotate(deg: number) {
      if (props.rotateDisabled) {
        return
      }

      rotate.value += deg
    }

    function handleScale(ratio: number) {
      if (props.scaleDisabled) {
        return
      }

      scale.value += ratio
    }

    function toggleFull(target = !full.value) {
      full.value = target
    }

    function handleReset() {
      currentTop.value = 0
      currentLeft.value = 0
      rotate.value = 0
      scale.value = 1
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

    return {
      props,
      nh,
      moving,
      state,

      container,
      transition,

      className,
      toolbarVertical,
      toolbarClass,
      contentStyle,
      scaleLayerStyle,
      allActions,

      getActionProp,
      handleWheel,
      handleRotate,
      handleScale,
      toggleFull,
      handleReset,
      normalizeProps
    }
  }
})
</script>
