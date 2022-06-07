<template>
  <div v-if="!props.inner" :class="[prefix, `${prefix}-vars`]">
    <slot></slot>
    <transition appear name="vxp-fade">
      <div v-if="currentActive" :class="`${prefix}__loading`">
        <div :class="`${prefix}__mask`" :style="maskStyle"></div>
        <div :class="`${prefix}__icon`">
          <slot name="icon">
            <Icon v-if="props.spin" spin :icon="props.icon"></Icon>
            <Icon v-else pulse :icon="props.icon"></Icon>
          </slot>
        </div>
        <div v-if="hasTip" :class="`${prefix}__tip`">
          <slot name="tip">
            {{ props.tip }}
          </slot>
        </div>
      </div>
    </transition>
  </div>
  <transition v-else appear name="vxp-fade">
    <div v-if="currentActive" :class="[prefix, `${prefix}-vars`, `${prefix}--inner`]">
      <div :class="`${prefix}__mask`" :style="maskStyle"></div>
      <div :class="`${prefix}__icon`">
        <slot name="icon">
          <Icon v-if="props.spin" spin :icon="props.icon"></Icon>
          <Icon v-else pulse :icon="props.icon"></Icon>
        </slot>
      </div>
      <div v-if="hasTip" :class="`${prefix}__tip`">
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
import { useProps, booleanProp } from '@vexip-ui/config'
import { toNumber } from '@vexip-ui/utils'
import { Spinner } from '@vexip-ui/icons'

import type { PropType } from 'vue'

export default defineComponent({
  name: 'Spin',
  components: {
    Icon
  },
  props: {
    // TODO: 添加 transitionName
    active: booleanProp,
    icon: Object,
    spin: booleanProp,
    inner: booleanProp,
    delay: [Boolean, Number, Array] as PropType<boolean | number | number[]>,
    tip: String,
    maskColor: String
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
      maskColor: ''
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
      prefix: 'vxp-spin',

      currentActive,

      hasTip,
      maskStyle
    }
  }
})
</script>
