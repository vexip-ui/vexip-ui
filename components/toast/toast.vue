<template>
  <div
    :class="{
      [nh.b()]: true,
      [nh.bs('vars')]: true,
      [nh.bm('text-only')]: state.textOnly
    }"
    role="alert"
    :style="{
      zIndex: state.zIndex
    }"
    aria-atomic="true"
    aria-live="assertive"
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
          <div
            v-if="state.icon || (state.type && effectiveTypes.includes(state.type))"
            :class="nh.be('icon')"
          >
            <Renderer v-if="isFunction(icon)" :renderer="icon"></Renderer>
            <Icon
              v-else-if="state.icon"
              :icon="state.icon"
              :scale="1.8"
              v-bind="state.iconProps"
            ></Icon>
            <Icon
              v-else
              v-bind="{ ...predefinedIcons[state.type!], scale: 1.8, ...state.iconProps }"
            ></Icon>
          </div>
          <div v-if="state.parseHtml" :class="nh.be('content')" v-html="state.content"></div>
          <div v-else :class="nh.be('content')">
            {{ state.content }}
          </div>
        </template>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Icon } from '@/components/icon'
import { Renderer } from '@/components/renderer'

import { computed, defineComponent, nextTick, onMounted, reactive } from 'vue'

import { useIcons, useNameHelper, useProps, useZIndex } from '@vexip-ui/config'
import { isFunction } from '@vexip-ui/utils'
import { toastProps } from './props'

import type { ToastOptions, ToastType } from './symbol'

const effectiveTypes = Object.freeze(['success', 'warning', 'error', 'loading'])

export default defineComponent({
  name: 'Toast',
  components: {
    Icon,
    Renderer
  },
  props: toastProps,
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
        isFunc: true,
        static: true
      },
      parseHtml: false
    })

    const getIndex = useZIndex()
    const icons = useIcons()

    const predefinedIcons = computed(() => ({
      success: icons.value.plainSuccess,
      warning: icons.value.plainWarning,
      error: icons.value.plainError,
      loading: icons.value.loading
    }))

    const state = reactive({
      visible: false,
      zIndex: 0,
      type: null as ToastType | null,
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
      parseHtml: props.parseHtml,
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
      state.zIndex = getIndex()

      await mounted

      state.type = options.type ?? null
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
      state.parseHtml = options.parseHtml ?? props.parseHtml
      state.renderer = isFunction(options.renderer) ? options.renderer : props.renderer
      state.onClose = options.onClose || null

      state.textOnly = !state.icon && !(state.type && effectiveTypes.includes(state.type))

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

      state.type = null
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
      state.parseHtml = props.parseHtml
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
      effectiveTypes,
      predefinedIcons,

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
