<template>
  <div
    :class="{
      [nh.b()]: true,
      [nh.bs('vars')]: true,
      [nh.bm('text-only')]: state.textOnly
    }"
    :style="{
      zIndex: state.zIndex
    }"
  >
    <transition :name="nh.ns('fade')">
      <div
        v-if="state.showMask && state.visible"
        :class="[nh.be('mask'), state.maskClass]"
        :style="state.maskStyle"
        @click="handleMaskClick"
      ></div>
    </transition>
    <transition :name="state.transition">
      <div
        v-if="state.visible"
        :class="{
          [nh.be('wrapper')]: true,
          [nh.bem('wrapper', state.position)]: state.position !== 'center',
          [nh.bem('wrapper', 'closable')]: state.closable
        }"
        @click="handleWrapperClick"
      >
        <Renderer v-if="isFunction(state.renderer)" :renderer="state.renderer"></Renderer>
        <template v-else>
          <div v-if="state.icon" :class="nh.be('icon')">
            <Renderer v-if="isFunction(icon)" :renderer="icon"></Renderer>
            <Icon
              v-else
              :icon="state.icon"
              :scale="1.8"
              v-bind="state.iconProps"
            ></Icon>
          </div>
          <div :class="nh.be('content')">
            {{ state.content }}
          </div>
        </template>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, nextTick } from 'vue'
import { Icon } from '@/components/icon'
import { Renderer } from '@/components/renderer'
import {
  useNameHelper,
  useProps,
  useZIndex,
  booleanProp,
  classProp,
  styleProp
} from '@vexip-ui/config'
import { isFunction } from '@vexip-ui/utils'

import type { PropType } from 'vue'
import type { IconMinorProps } from '@/components/icon'
import type { ToastPosition, ToastOptions } from './symbol'

export default defineComponent({
  name: 'Toast',
  components: {
    Icon,
    Renderer
  },
  props: {
    bodyWidth: Number,
    icon: [Object, Function] as PropType<Record<string, any> | (() => any)>,
    iconProps: Object as PropType<IconMinorProps>,
    position: String as PropType<ToastPosition>,
    transitionName: String,
    closable: booleanProp,
    maskClose: booleanProp,
    showMask: booleanProp,
    maskClass: classProp,
    maskStyle: styleProp,
    renderer: Function as PropType<(options: ToastOptions) => any>
  },
  emits: [],
  setup(_props) {
    const nh = useNameHelper('toast')
    const props = useProps('toast', _props, {
      bodyWidth: 100,
      icon: null,
      iconProps: () => ({}),
      position: 'center',
      transitionName: () => nh.ns('ease'),
      closable: false,
      maskClose: false,
      showMask: false,
      maskClass: null,
      maskStyle: null,
      renderer: {
        default: null,
        isFunc: true
      }
    })

    const state = reactive({
      visible: false,
      zIndex: 0,
      content: '',
      icon: props.icon,
      iconProps: props.iconProps as any,
      position: props.position,
      transition: props.transitionName,
      closable: props.closable,
      maskClose: props.maskClose,
      showMask: props.showMask,
      maskClass: props.maskClass as any,
      maskStyle: props.maskStyle as any,
      textOnly: false,
      renderer: props.renderer,
      onClose: null as (() => void) | null
    })

    const mounted = new Promise<void>(resolve => {
      onMounted(() => {
        nextTick(resolve)
      })
    })

    async function openToast(options: ToastOptions) {
      state.zIndex = useZIndex().value

      await mounted

      state.content = options.content ?? ''
      state.icon = options.icon ?? props.icon
      state.iconProps = options.iconProps ?? props.iconProps
      state.position = options.position ?? props.position
      state.transition = options.transitionName ?? props.transitionName
      state.closable = options.closable ?? props.closable
      state.maskClose = options.maskClose ?? props.maskClose
      state.showMask = options.showMask ?? props.showMask
      state.maskClass = options.maskClass ?? props.maskClass
      state.maskStyle = options.maskStyle ?? props.maskStyle
      state.renderer = isFunction(options.renderer) ? options.renderer : props.renderer
      state.onClose = options.onClose || null

      state.textOnly = !state.icon

      if (isFunction(state.renderer)) {
        const render = state.renderer

        state.renderer = () => render(options)
        state.textOnly = false
      }

      state.visible = true
    }

    function cloasToast() {
      state.visible = false

      if (isFunction(state.onClose)) {
        state.onClose()
      }
    }

    function handleReset() {
      if (state.visible) return

      state.content = ''
      state.icon = props.icon
      state.iconProps = props.iconProps
      state.position = props.position
      state.transition = props.transitionName
      state.closable = props.closable
      state.maskClose = props.maskClose
      state.showMask = props.showMask
      state.maskClass = props.maskClass
      state.maskStyle = props.maskStyle
      state.textOnly = false
      state.renderer = props.renderer
      state.onClose = null
    }

    function handleWrapperClick() {
      if (state.visible && state.closable) {
        cloasToast()
      }
    }

    function handleMaskClick() {
      if (state.visible && state.maskClose) {
        cloasToast()
      }
    }

    return {
      props,
      nh,
      state,

      isFunction,
      openToast,
      cloasToast,
      handleReset,
      handleWrapperClick,
      handleMaskClick
    }
  }
})
</script>
