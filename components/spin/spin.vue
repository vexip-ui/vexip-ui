<template>
  <div
    v-if="!props.inner"
    :class="[nh.b(), nh.bs('vars')]"
    :aria-busy="currentActive ? 'true' : undefined"
  >
    <slot></slot>
    <transition appear :name="props.transitionName">
      <div v-if="currentActive" :class="nh.be('loading')">
        <div :class="nh.be('mask')" :style="maskStyle"></div>
        <div :class="nh.be('icon')">
          <slot name="icon">
            <Icon v-if="props.spin" spin :icon="props.icon"></Icon>
            <Icon v-else pulse :icon="props.icon"></Icon>
          </slot>
        </div>
        <div v-if="hasTip" :class="nh.be('tip')">
          <slot name="tip">
            {{ props.tip }}
          </slot>
        </div>
      </div>
    </transition>
  </div>
  <transition v-else appear :name="props.transitionName">
    <div v-if="currentActive" :class="[nh.b(), nh.bs('vars'), nh.bm('inner')]">
      <div :class="nh.be('mask')" :style="maskStyle"></div>
      <div :class="nh.be('icon')">
        <slot name="icon">
          <Icon v-if="props.spin" spin :icon="props.icon"></Icon>
          <Icon v-else pulse :icon="props.icon"></Icon>
        </slot>
      </div>
      <div v-if="hasTip" :class="nh.be('tip')">
        <slot name="tip">
          {{ props.tip }}
        </slot>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'
import { Icon } from '@/components/icon'
import { useNameHelper, useProps, booleanProp } from '@vexip-ui/config'
import { toNumber } from '@vexip-ui/utils'
import { Spinner } from '@vexip-ui/icons'

import type { PropType } from 'vue'

export default defineComponent({
  name: 'Spin',
  components: {
    Icon
  },
  props: {
    active: booleanProp,
    icon: Object,
    spin: booleanProp,
    inner: booleanProp,
    delay: {
      type: [Boolean, Number, Array] as PropType<boolean | number | number[]>,
      default: null
    },
    tip: String,
    maskColor: String,
    transitionName: String
  },
  setup(_props, { slots }) {
    const props = useProps('spin', _props, {
      active: {
        default: false,
        static: true
      },
      icon: Spinner,
      spin: false,
      inner: false,
      delay: false,
      tip: '',
      maskColor: '',
      transitionName: 'vxp-fade'
    })

    const currentActive = ref(props.active)

    const hasTip = computed(() => !!(props.tip || slots.tip))
    const maskStyle = computed(() => {
      const style = {} as any

      if (props.maskColor) {
        style['--vxp-spin-mask-bg-color'] = props.maskColor
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

    let timer = -1

    watch(
      () => props.active,
      value => {
        window.clearTimeout(timer)

        const delay = value ? delayTime.value.enter : delayTime.value.leave

        if (delay) {
          timer = window.setTimeout(() => {
            currentActive.value = value
          }, delay)
        } else {
          currentActive.value = value
        }
      }
    )

    return {
      props,
      nh: useNameHelper('spin'),

      currentActive,

      hasTip,
      maskStyle
    }
  }
})
</script>
