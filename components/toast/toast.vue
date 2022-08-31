<template>
  <div :class="[nh.b(), nh.bs('vars')]">
    <Spin
      :class="nh.be('spin')"
      :active="state.visible"
      inner
      mask-color="transparent"
      :mask-class="state.maskClass"
      :mask-style="state.maskStyle"
    >
      <template #icon>
        <Renderer v-if="isFunction(state.renderer)" :renderer="state.renderer"></Renderer>
        <div v-else :class="nh.be('body')">
          <div :class="nh.be('icon')">
            <Renderer v-if="isFunction(icon)" :renderer="icon"></Renderer>
            <Icon
              v-else
              :icon="state.icon"
              :scale="2.2"
              v-bind="state.iconProps"
            ></Icon>
          </div>
          <div :class="nh.be('content')">
            {{ state.content }}
          </div>
        </div>
      </template>
    </Spin>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, nextTick } from 'vue'
import { Icon } from '@/components/icon'
import { Renderer } from '@/components/renderer'
import { Spin } from '@/components/spin'
import { useNameHelper, useProps, booleanProp, classProp, styleProp } from '@vexip-ui/config'
import { isFunction } from '@vexip-ui/utils'

import type { PropType } from 'vue'
import type { IconMinorProps } from '@/components/icon'
import type { ToastPosition, ToastOptions } from './symbol'

export default defineComponent({
  name: 'Toast',
  components: {
    Icon,
    Renderer,
    Spin
  },
  props: {
    bodyWidth: Number,
    icon: [Object, Function] as PropType<Record<string, any> | (() => any)>,
    iconProps: Object as PropType<IconMinorProps>,
    position: String as PropType<ToastPosition>,
    transitionName: String,
    closable: booleanProp,
    maskClose: booleanProp,
    hideMask: booleanProp,
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
      hideMask: false,
      maskClass: null,
      maskStyle: null,
      renderer: {
        default: null,
        isFunc: true
      }
    })

    const state = reactive({
      visible: false,
      content: '',
      icon: props.icon,
      iconProps: props.iconProps,
      position: props.position,
      transition: props.transitionName,
      closable: props.closable,
      maskClose: props.maskClose,
      hideMask: props.hideMask,
      maskClass: props.maskClass,
      maskStyle: props.maskStyle,
      renderer: props.renderer,
      onClose: null as (() => void) | null
    })

    const mounted = new Promise<void>(resolve => {
      onMounted(() => {
        nextTick(resolve)
      })
    })

    async function openToast(options: ToastOptions) {
      await mounted

      state.content = options.content ?? ''
      state.icon = options.icon ?? props.icon
      state.iconProps = options.iconProps ?? props.iconProps
      state.position = options.position ?? props.position
      state.transition = options.transitionName ?? props.transitionName
      state.closable = options.closable ?? props.closable
      state.maskClose = options.maskClose ?? props.maskClose
      state.hideMask = options.hideMask ?? props.hideMask
      state.maskClass = options.maskClass ?? props.maskClass
      state.maskStyle = options.maskStyle ?? props.maskStyle
      state.renderer = isFunction(options.renderer) ? options.renderer : props.renderer
      state.onClose = options.onClose || null

      if (isFunction(state.renderer)) {
        const render = state.renderer
        state.renderer = () => render(options)
      }

      state.visible = true
    }

    function cloasToast() {
      state.visible = false

      if (isFunction(state.onClose)) {
        state.onClose()
      }

      state.content = ''
      state.icon = props.icon
      state.iconProps = props.iconProps
      state.position = props.position
      state.transition = props.transitionName
      state.closable = props.closable
      state.maskClose = props.maskClose
      state.hideMask = props.hideMask
      state.maskClass = props.maskClass
      state.maskStyle = props.maskStyle
      state.renderer = props.renderer
      state.onClose = null
    }

    return {
      props,
      nh,
      state,

      isFunction,
      openToast,
      cloasToast
    }
  }
})
</script>
