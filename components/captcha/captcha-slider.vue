<template>
  <div :id="idFor" :class="className">
    <div
      :class="{
        [nh.be('filler')]: true,
        [nh.bem('filler', 'loading')]: props.loading,
        [nh.bem('filler', 'success')]: isSuccess
      }"
      :style="fillerStyle"
    ></div>
    <div
      :class="{
        [nh.be('tip')]: true,
        [nh.bem('tip', 'focused')]: dragging,
        [nh.bem('tip', 'loading')]: props.loading,
        [nh.bem('tip', 'success')]: isSuccess
      }"
      :style="tipStyle"
    >
      <slot name="tip" :success="isSuccess">
        {{ isSuccess ? props.successTip ?? locale.success : props.tip ?? locale.toRight }}
      </slot>
    </div>
    <div ref="track" :class="nh.be('track')">
      <div
        ref="trigger"
        :class="{
          [nh.be('trigger')]: true,
          [nh.bem('trigger', 'focused')]: dragging,
          [nh.bem('trigger', 'loading')]: props.loading,
          [nh.bem('trigger', 'success')]: isSuccess
        }"
        tabindex="0"
        :style="triggerStyle"
        @transitionend="afterReset"
      >
        <slot name="trigger" :success="isSuccess">
          <Icon v-if="isSuccess" v-bind="icons.check"></Icon>
          <Icon v-else-if="props.loading" v-bind="icons.loading"></Icon>
          <Icon v-else v-bind="icons.anglesRight"></Icon>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Icon } from '@/components/icon'
import { useFieldStore } from '@/components/form'

import { computed, defineComponent, ref } from 'vue'

import {
  createSizeProp,
  createStateProp,
  emitEvent,
  useIcons,
  useLocale,
  useNameHelper,
  useProps
} from '@vexip-ui/config'
import { useMoving } from '@vexip-ui/hooks'
import { boundRange, toFixed } from '@vexip-ui/utils'
import { captchaSliderProps } from './props'

export default defineComponent({
  name: 'CaptchaSlider',
  components: {
    Icon
  },
  props: captchaSliderProps,
  emits: ['update:visible'],
  setup(_props) {
    const {
      idFor,
      state,
      disabled,
      loading,
      size
      // validateField,
      // clearField,
      // getFieldValue,
      // setFieldValue
    } = useFieldStore<unknown>(focus)

    const props = useProps('captcha', _props, {
      size: createSizeProp(size),
      state: createStateProp(state),
      loading: () => loading.value,
      target: {
        default: 100,
        validator: value => value >= 0 && value <= 100
      },
      tip: null,
      successTip: null,
      tolerance: {
        default: 0,
        validator: value => value >= 0
      },
      refreshIcon: null,
      disabled: () => disabled.value
    })

    const nh = useNameHelper('captcha')
    const locale = useLocale('captcha')
    const icons = useIcons()

    const currentLeft = ref(0)
    const resetting = ref(false)
    const isSuccess = ref(false)

    const track = ref<HTMLElement>()

    let widthLimit: number

    const { target: trigger, moving: dragging } = useMoving({
      onStart: (_, event) => {
        if (
          !track.value ||
          !trigger.value ||
          isSuccess.value ||
          resetting.value ||
          event.button > 0
        ) {
          return false
        }

        widthLimit = track.value.getBoundingClientRect().width
        currentLeft.value = 0
        verifyPosition()
      },
      onMove: state => {
        if (isSuccess.value || resetting.value) {
          return false
        }

        currentLeft.value = (state.deltaX / widthLimit) * 100
        verifyPosition()
      },
      onEnd: () => {
        const matched = matchTarget(currentLeft.value)

        if (currentLeft.value && !matched) {
          resetting.value = true
          currentLeft.value = 0

          emitEvent(props.onFail)
        } else if (matched) {
          // currentLeft.value = usedTarget.value
          isSuccess.value = true

          emitEvent(props.onSuccess)
        }
      }
    })

    const className = computed(() => {
      const baseCls = nh.be('slider')

      return {
        [baseCls]: true,
        [nh.bs('vars')]: true,
        [`${baseCls}--disabled`]: props.disabled,
        [`${baseCls}--loading`]: props.loading,
        [`${baseCls}--${props.size}`]: props.size !== 'default',
        [`${baseCls}--${props.state}`]: props.state !== 'default'
      }
    })
    const fillerStyle = computed(() => {
      return {
        [nh.cv('filler-transition')]: resetting.value ? 'transform 250ms ease' : undefined,
        transform: `scaleX(${currentLeft.value / 100})`
      }
    })
    const tipStyle = computed(() => {
      return {
        [nh.cv('tip-transition')]: resetting.value ? 'background-position 250ms ease' : undefined,
        backgroundPosition: `-${currentLeft.value}%`
      }
    })
    const triggerStyle = computed(() => {
      return {
        left: `${currentLeft.value}%`,
        [nh.cv('trigger-transition')]: resetting.value ? 'left 250ms ease' : undefined
      }
    })

    function verifyPosition() {
      currentLeft.value = toFixed(boundRange(currentLeft.value, 0, 100), 3)
    }

    function afterReset() {
      resetting.value = false
    }

    function refresh() {
      resetting.value = true
      currentLeft.value = 0
      isSuccess.value = false
    }

    function matchTarget(value: number) {
      return Math.abs(props.target - value) <= props.tolerance
    }

    return {
      props,
      nh,
      locale,
      icons,

      idFor,
      currentLeft,
      resetting,
      isSuccess,
      dragging,

      className,
      fillerStyle,
      tipStyle,
      triggerStyle,

      track,
      trigger,

      afterReset,
      refresh
    }
  }
})
</script>
