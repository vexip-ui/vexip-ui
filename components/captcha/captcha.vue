<template>
  <div :class="className" tabindex="-1">
    <div :class="nh.be('slider')">
      <div
        :class="{
          [nh.be('filler')]: true,
          [nh.bem('filler', 'success')]: isSuccess
        }"
        :style="fillerStyle"
        @transitionend="afterReset"
      ></div>
      <div
        :class="{
          [nh.be('tip')]: true,
          [nh.bem('tip', 'success')]: isSuccess
        }"
        :style="tipStyle"
      >
        <slot name="tip" :success="isSuccess">
          {{ isSuccess ? props.successTip ?? locale.success : props.tip ?? normalTip }}
        </slot>
      </div>
      <div ref="track" :class="nh.be('track')">
        <div
          ref="trigger"
          :class="{
            [nh.be('trigger')]: true,
            [nh.bem('trigger', 'focused')]: dragging,
            [nh.bem('trigger', 'success')]: isSuccess
          }"
          tabindex="0"
          :style="triggerStyle"
        >
          <slot name="trigger" :success="isSuccess">
            <Icon v-if="isSuccess" v-bind="icons.check"></Icon>
            <Icon v-else v-bind="icons.anglesRight"></Icon>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'
import { Icon } from '@/components/icon'
import { useNameHelper, useProps, useLocale, useIcons, emitEvent } from '@vexip-ui/config'
import { useMoving } from '@vexip-ui/hooks'
import { toFixed, boundRange, random } from '@vexip-ui/utils'
import { captchaProps } from './props'

export default defineComponent({
  name: 'Captcha',
  components: {
    Icon
  },
  props: captchaProps,
  emits: [],
  setup(_props) {
    const props = useProps('captcha', _props, {
      type: 'slide',
      loading: false,
      slideTarget: {
        default: null,
        validator: value => value >= 0 || value <= 100
      },
      tip: null,
      successTip: null
    })

    const nh = useNameHelper('captcha')
    const locale = useLocale('captcha')

    const currentLeft = ref(0)
    const currentTarget = ref(props.slideTarget ?? random(100))
    const resetting = ref(false)
    const isSuccess = ref(false)

    const track = ref<HTMLElement>()

    const usedTarget = computed(() => (props.type === 'slide' ? 100 : currentTarget.value))

    let widthLimit: number
    let leftStartAt: number

    const { target: trigger, moving: dragging } = useMoving({
      onStart: (state, event) => {
        if (
          !track.value ||
          !trigger.value ||
          isSuccess.value ||
          resetting.value ||
          event.button > 0
        ) {
          return false
        }

        const { left, width } = track.value.getBoundingClientRect()

        widthLimit = width
        currentLeft.value = ((leftStartAt = state.clientX - left) / width) * 100

        verifyPosition()
      },
      onMove: state => {
        if (isSuccess.value || resetting.value) {
          return false
        }

        currentLeft.value = ((leftStartAt + state.deltaX) / widthLimit) * 100

        verifyPosition()
      },
      onEnd: () => {
        if (currentLeft.value && currentLeft.value !== usedTarget.value) {
          resetting.value = true
          currentLeft.value = 0

          emitEvent(props.onFail)
        } else if (currentLeft.value === usedTarget.value) {
          isSuccess.value = true

          emitEvent(props.onSuccess)
        }
      }
    })

    const className = computed(() => {
      return [
        nh.b(),
        nh.bs('vars'),
        {
          [nh.bm('dragging')]: dragging.value
        }
      ]
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
    const normalTip = computed(() => {
      switch (props.type) {
        case 'slide-image':
          return locale.value.slide
        default:
          return locale.value.toRight
      }
    })

    watch(
      () => props.slideTarget,
      value => {
        currentTarget.value = value ?? currentTarget.value ?? random(100)
      }
    )

    function verifyPosition() {
      currentLeft.value = toFixed(boundRange(currentLeft.value, 0, 100), 3)
    }

    function afterReset() {
      resetting.value = false
    }

    return {
      props,
      nh,
      locale,
      icons: useIcons(),
      currentLeft,
      isSuccess,

      dragging,
      className,
      fillerStyle,
      tipStyle,
      triggerStyle,
      normalTip,

      trigger,
      track,

      afterReset
    }
  }
})
</script>
