<template>
  <div
    v-if="!props.inner"
    :class="[nh.b(), nh.bs('vars'), props.inherit && nh.bm('inherit')]"
    :aria-busy="currentActive ? 'true' : undefined"
  >
    <slot></slot>
    <transition
      appear
      :name="props.transitionName"
      @after-enter="handleShow"
      @after-leave="handleHide"
    >
      <div v-if="currentActive" :class="nh.be('loading')">
        <div
          v-if="!props.hideMask"
          :class="[nh.be('mask'), props.maskClass]"
          :style="maskStyle"
          @click="handleMaskClick"
        ></div>
        <slot name="content">
          <div :class="nh.be('icon')">
            <slot name="icon">
              <Icon
                v-bind="icons.loading"
                :icon="props.icon || icons.loading.icon"
                :effect="effect || icons.loading.effect"
              ></Icon>
            </slot>
          </div>
          <div v-if="hasTip" :class="nh.be('tip')">
            <slot name="tip">
              {{ props.tip }}
            </slot>
          </div>
        </slot>
      </div>
    </transition>
  </div>
  <transition
    v-else
    appear
    :name="props.transitionName"
    @after-enter="handleShow"
    @after-leave="handleHide"
  >
    <div v-if="currentActive" :class="[nh.b(), nh.bs('vars'), nh.bm('inner')]">
      <div
        v-if="!props.hideMask"
        :class="[nh.be('mask'), props.maskClass]"
        :style="maskStyle"
        @click="handleMaskClick"
      ></div>
      <slot name="content">
        <div :class="nh.be('icon')">
          <slot name="icon">
            <Icon
              v-bind="icons.loading"
              :icon="props.icon || icons.loading.icon"
              :effect="effect || icons.loading.effect"
            ></Icon>
          </slot>
        </div>
        <div v-if="hasTip" :class="nh.be('tip')">
          <slot name="tip">
            {{ props.tip }}
          </slot>
        </div>
      </slot>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'
import { Icon } from '@/components/icon'
import { useNameHelper, useProps, useIcons, emitEvent } from '@vexip-ui/config'
import { toNumber, warnOnce } from '@vexip-ui/utils'
import { spinProps } from './props'

export default defineComponent({
  name: 'Spin',
  components: {
    Icon
  },
  props: spinProps,
  setup(_props, { slots }) {
    const nh = useNameHelper('spin')
    const props = useProps('spin', _props, {
      active: {
        default: false,
        static: true
      },
      icon: null,
      spin: false,
      inner: false,
      delay: false,
      tip: '',
      hideMask: false,
      maskColor: '',
      maskClass: null,
      transitionName: () => nh.ns('fade'),
      iconEffect: null
    })

    if (props.spin) {
      warnOnce(
        "[vexip-ui:Spin] 'spin' prop has been deprecated, please set the 'icon-effect'" +
          " prop to 'spin-in' or 'spin-out' to replace it"
      )
    }

    const currentActive = ref(props.active)

    const effect = computed(() => {
      return props.iconEffect || (props.spin ? 'spin-in' : undefined)
    })
    const hasTip = computed(() => !!(props.tip || slots.tip))
    const maskStyle = computed(() => {
      const style = {} as any

      if (props.maskColor) {
        style[nh.cv('mask-bg-color')] = props.maskColor
      }

      return style
    })
    const delayTime = computed(() => {
      if (props.delay) {
        if (props.delay === true) {
          return { enter: 500, leave: 500 }
        }

        if (typeof props.delay === 'number') {
          return { enter: props.delay, leave: props.delay }
        }

        if (Array.isArray(props.delay)) {
          return { enter: toNumber(props.delay[0]), leave: toNumber(props.delay[1]) }
        }
      }

      return { enter: 0, leave: 0 }
    })

    let timer: ReturnType<typeof setTimeout>

    watch(
      () => props.active,
      value => {
        clearTimeout(timer)

        const delay = value ? delayTime.value.enter : delayTime.value.leave

        if (delay) {
          timer = setTimeout(() => {
            currentActive.value = value
          }, delay)
        } else {
          currentActive.value = value
        }
      }
    )

    function handleMaskClick(event: MouseEvent) {
      emitEvent(props.onMaskClick, event)
    }

    function handleShow() {
      emitEvent(props.onShow)
    }

    function handleHide() {
      emitEvent(props.onHide)
    }

    return {
      props,
      nh,
      icons: useIcons(),

      currentActive,

      effect,
      hasTip,
      maskStyle,

      handleMaskClick,
      handleShow,
      handleHide
    }
  }
})
</script>
