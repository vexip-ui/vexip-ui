<template>
  <div
    :id="idFor"
    ref="wrapper"
    :class="className"
    tabindex="-1"
  >
    <div
      :class="{
        [nh.be('filler')]: true,
        [nh.bem('filler', 'loading')]: isLoading,
        [nh.bem('filler', 'success')]: isSuccess
      }"
      :style="fillerStyle"
    ></div>
    <div
      :class="{
        [nh.be('tip')]: true,
        [nh.bem('tip', 'focused')]: dragging,
        [nh.bem('tip', 'loading')]: isLoading,
        [nh.bem('tip', 'success')]: isSuccess
      }"
      :style="tipStyle"
    >
      <slot name="tip" :success="isSuccess">
        {{ isSuccess ? props.successTip ?? locale.success : props.tip ?? locale.slideEnd }}
      </slot>
    </div>
    <div ref="track" :class="nh.be('track')">
      <div
        ref="trigger"
        :class="{
          [nh.be('trigger')]: true,
          [nh.bem('trigger', 'focused')]: dragging,
          [nh.bem('trigger', 'loading')]: isLoading,
          [nh.bem('trigger', 'success')]: isSuccess
        }"
        tabindex="0"
        :style="triggerStyle"
        @transitionend="afterReset"
      >
        <slot name="trigger" :success="isSuccess">
          <Icon v-if="isSuccess" v-bind="icons.check"></Icon>
          <Icon
            v-else-if="isLoading"
            v-bind="icons.loading"
            :effect="props.loadingEffect || icons.loading.effect"
            :icon="props.loadingIcon || icons.loading.icon"
          ></Icon>
          <Icon v-else v-bind="icons.anglesRight"></Icon>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Icon } from '@/components/icon'
import { useFieldStore } from '@/components/form'

import { computed, defineComponent, ref, watch } from 'vue'

import {
  createSizeProp,
  emitEvent,
  useIcons,
  useLocale,
  useNameHelper,
  useProps
} from '@vexip-ui/config'
import { useMoving, useSetTimeout } from '@vexip-ui/hooks'
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
    const { idFor, disabled, loading, size, validateField, getFieldValue, setFieldValue } =
      useFieldStore<boolean>(focus)

    const props = useProps('captcha', _props, {
      size: createSizeProp(size),
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
      disabled: () => disabled.value,
      loading: () => loading.value,
      loadingIcon: null,
      loadingLock: false,
      loadingEffect: null,
      onBeforeTest: {
        default: null,
        isFunc: true
      }
    })

    const nh = useNameHelper('captcha')
    const locale = useLocale('captcha')
    const icons = useIcons()

    const { timer } = useSetTimeout()

    const currentLeft = ref(0)
    const testing = ref(false)
    const resetting = ref(false)
    const isSuccess = ref(false)
    const testLoading = ref(false)

    const track = ref<HTMLElement>()

    const readonly = computed(() => props.disabled || (props.loading && props.loadingLock))

    let widthLimit: number

    const { target: trigger, moving: dragging } = useMoving({
      onStart: (_, event) => {
        if (
          testing.value ||
          readonly.value ||
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
        trigger.value.focus()
        emitEvent(props.onDragStart, currentLeft.value)
      },
      onMove: state => {
        if (testing.value || readonly.value || isSuccess.value || resetting.value) {
          return false
        }

        currentLeft.value = (state.deltaX / widthLimit) * 100
        verifyPosition()
        emitEvent(props.onDrag, currentLeft.value)
      },
      onEnd: async () => {
        if (testing.value || readonly.value) return

        testing.value = true

        const matched = matchTarget(currentLeft.value)
        let customResult: unknown

        if (typeof props.onBeforeTest === 'function') {
          timer.testing = setTimeout(() => {
            testLoading.value = true
          }, 100)
          customResult = await props.onBeforeTest(currentLeft.value, matched)
        }

        if (currentLeft.value && (!matched || customResult === false)) {
          resetting.value = true
          currentLeft.value = 0
          isSuccess.value = false

          setFieldValue(false)
          emitEvent(props.onFail)
        } else if (matched || customResult === true) {
          isSuccess.value = true

          if (customResult && !matched) {
            resetting.value = true
            currentLeft.value = props.target
          }

          setFieldValue(true)
          emitEvent(props.onSuccess, currentLeft.value)
        }

        validateField()
        trigger.value?.blur()
        emitEvent(props.onDragEnd, currentLeft.value)

        clearTimeout(timer.testing)
        testing.value = false
      }
    })

    const isLoading = computed(() => props.loading || testLoading.value)
    const className = computed(() => {
      const baseCls = nh.be('slider')

      return {
        [baseCls]: true,
        [nh.bs('vars')]: true,
        [`${baseCls}--disabled`]: props.disabled,
        [`${baseCls}--loading`]: isLoading.value,
        [`${baseCls}--${props.size}`]: props.size !== 'default'
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

    watch(
      () => getFieldValue(false),
      value => {
        if (!value) {
          reset()
        } else {
          if (!matchTarget(currentLeft.value)) {
            resetting.value = true
            currentLeft.value = props.target
          }

          isSuccess.value = true
        }
      }
    )
    watch(readonly, value => value && reset())

    function verifyPosition() {
      currentLeft.value = toFixed(boundRange(currentLeft.value, 0, 100), 3)
    }

    function reset() {
      resetting.value = true
      currentLeft.value = 0
      isSuccess.value = false
    }

    function afterReset() {
      resetting.value = false
    }

    function matchTarget(value: number) {
      return Math.abs(props.target - value) <= props.tolerance
    }

    function focus(options?: FocusOptions) {
      trigger.value?.focus(options)
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

      isLoading,
      className,
      fillerStyle,
      tipStyle,
      triggerStyle,

      track,
      trigger,

      reset,
      afterReset
    }
  }
})
</script>
