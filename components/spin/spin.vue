<template>
  <div v-if="!inner" :class="prefix">
    <slot></slot>
    <transition appear name="vxp-fade">
      <div v-if="currentActive" :class="`${prefix}__loading`">
        <div :class="`${prefix}__mask`" :style="maskStyle"></div>
        <div :class="`${prefix}__icon`">
          <slot name="icon">
            <Icon v-if="spin" spin :name="icon"></Icon>
            <Icon v-else pulse :name="icon"></Icon>
          </slot>
        </div>
        <div v-if="hasTip" :class="`${prefix}__tip`">
          <slot name="tip">
            {{ tip }}
          </slot>
        </div>
      </div>
    </transition>
  </div>
  <transition v-else appear name="vxp-fade">
    <div v-if="currentActive" :class="[prefix, `${prefix}--inner`]">
      <div :class="`${prefix}__mask`" :style="maskStyle"></div>
      <div :class="`${prefix}__icon`">
        <slot name="icon">
          <Icon v-if="spin" spin :name="icon"></Icon>
          <Icon v-else pulse :name="icon"></Icon>
        </slot>
      </div>
      <div v-if="hasTip" :class="`${prefix}__tip`">
        <slot name="tip">
          {{ tip }}
        </slot>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'
import { Icon } from '@/components/icon'
import { useConfiguredProps } from '@/common/config/install'
import { toNumber } from '@/common/utils/number'

import type { PropType } from 'vue'

import '@/common/icons/spinner'

const props = useConfiguredProps('spin', {
  active: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: 'spinner'
  },
  spin: {
    type: Boolean,
    default: false
  },
  inner: {
    type: Boolean,
    default: false
  },
  delay: {
    type: [Boolean, Number, Array] as PropType<boolean | number | number[]>,
    default: false
  },
  tip: {
    type: String,
    default: ''
  },
  maskColor: {
    type: String,
    default: 'white'
  }
})

export default defineComponent({
  name: 'Spin',
  components: {
    Icon
  },
  props,
  setup(props, { slots }) {
    const prefix = 'vxp-spin'

    const currentActive = ref(props.active)

    const hasTip = computed(() => !!(props.tip || slots.tip))
    const maskStyle = computed(() => ({ '--color': props.maskColor } as any))
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
      prefix,

      currentActive,

      hasTip,
      maskStyle
    }
  }
})
</script>
