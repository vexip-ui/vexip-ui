import { Icon } from '@/components/icon'
import { Popper } from '@/components/popper'
import { useFieldStore } from '@/components/form'

import {
  Transition,
  computed,
  defineComponent,
  onMounted,
  ref,
  renderSlot,
  toRef,
  watch
} from 'vue'

import CaptchaSlider from './captcha-slider.vue'
import {
  createSizeProp,
  createStateProp,
  emitEvent,
  useIcons,
  useLocale,
  useNameHelper,
  useProps
} from '@vexip-ui/config'
import { placementWhileList, useClickOutside, useMoving, usePopper } from '@vexip-ui/hooks'
import { boundRange, ensureArray, isClient, isNull, random, toFixed } from '@vexip-ui/utils'
import { captchaProps } from './props'

import type { PopperExposed } from '@/components/popper'

export default defineComponent({
  name: 'Captcha',
  props: captchaProps,
  emits: ['update:visible'],
  setup(_props, { emit, slots, expose }) {
    const {
      idFor,
      state,
      disabled,
      loading
      // validateField,
      // clearField,
      // getFieldValue,
      // setFieldValue
    } = useFieldStore<unknown>(focus)

    const props = useProps('captcha', _props, {
      state: createStateProp(state),
      type: 'slide',
      loading: () => loading.value,
      slideTarget: {
        default: null,
        validator: value => {
          if (isNull(value)) return true

          if (Array.isArray(value)) {
            return value[0] >= 0 && value[0] <= 100 && value[1] >= 0 && value[1] <= 100
          } else {
            return value >= 0 && value <= 100
          }
        }
      },
      tip: null,
      successTip: null,
      image: null,
      tolerance: {
        default: null,
        validator: value => isNull(value) || value >= 0
      },
      canvasSize: () => [1000, 600],
      refreshIcon: null,
      disabled: () => disabled.value
    })

    const nh = useNameHelper('captcha')
    const locale = useLocale('captcha')
    const icons = useIcons()

    const currentTarget = ref(parseTarget(props.slideTarget))

    const wrapper = ref<HTMLElement>()
    const canvas = ref<HTMLCanvasElement>()
    const subImage = ref<HTMLImageElement>()
    const subCanvas = ref<HTMLCanvasElement>()
    const slider = ref<InstanceType<typeof CaptchaSlider>>()

    const track = computed(() => slider.value?.track)

    const isSuccess = computed(() => slider.value?.isSuccess)
    const currentLeft = computed(() => slider.value?.currentLeft || 0)
    const resetting = computed(() => slider.value?.resetting)

    const usingPopper = computed(() => props.type !== 'slide')
    const usedTarget = computed(() => (!usingPopper.value ? 100 : currentTarget.value[0]))
    const tolerance = computed(() => (!usingPopper.value ? 0 : props.tolerance ?? 2))

    let imageLoaded = false
    let image: HTMLImageElement | false

    const className = computed(() => {
      return [
        nh.b(),
        nh.bs('vars'),
        nh.bm(props.type),
        {
          // [nh.bm('dragging')]: dragging.value,
          [nh.bm('disabled')]: props.disabled,
          [nh.bm('loading')]: props.loading,
          [nh.bm(props.state)]: props.state !== 'default'
        }
      ]
    })
    const subCanvasStyle = computed(() => {
      return {
        left: `${currentLeft.value}%`,
        [nh.cv('trigger-transition')]: resetting.value ? 'left 250ms ease' : undefined
      }
    })
    const normalTip = computed(() => {
      switch (props.type) {
        default:
          return locale.value.slide
      }
    })
    const hasImage = computed(() => {
      return props.type === 'slide-image' && props.image
    })
    const canvasSize = computed(() => {
      return [props.canvasSize[0] || 1000, props.canvasSize[1] || 600]
    })

    watch(() => props.slideTarget, parseTarget)
    watch(
      () => props.image,
      async () => {
        await loadImage()
        drawImage()
      }
    )
    watch(
      [() => props.type, currentTarget, () => props.canvasSize[0], () => props.canvasSize[1]],
      drawImage
    )

    expose({ refresh })

    onMounted(async () => {
      await loadImage()
      drawImage()
    })

    function loadImage() {
      return new Promise<void>(resolve => {
        image = isClient && new Image()

        if (!image) {
          resolve()
          return
        }

        imageLoaded = false
        image.src = props.image
        image.onload = () => {
          imageLoaded = true
          resolve()
        }
      })
    }

    function drawImage() {
      const canvasEl = canvas.value
      const ctx = canvasEl?.getContext('2d')
      const subCanvasEl = subCanvas.value
      const subCtx = subCanvasEl?.getContext('2d')

      if (!image || !imageLoaded || !canvasEl || !ctx || !subCanvasEl || !subCtx || !props.image) {
        return
      }

      const canvasRect = canvasEl.getBoundingClientRect()
      const subImageRect = track.value!.getBoundingClientRect()
      const widthFix = ((canvasRect.width - subImageRect.width) / canvasRect.width) * canvasEl.width

      const targetX = widthFix / 2 + currentTarget.value[0] * (canvasEl.width - widthFix) * 0.01
      const targetY = currentTarget.value[1] * canvasEl.height * 0.01
      const sideLength = Math.min(canvasEl.width, canvasEl.height) * 0.25
      const halfSideLength = sideLength * 0.5

      subCanvasEl.width = sideLength + 4

      ctx.drawImage(image, 0, 0, canvasEl.width, canvasEl.height)

      subCtx.drawImage(
        canvas.value!,
        targetX - halfSideLength,
        targetY - halfSideLength,
        sideLength,
        sideLength,
        2,
        targetY - halfSideLength,
        sideLength,
        sideLength
      )
      subCtx.lineWidth = 2
      subCtx.strokeStyle = 'rgba(255, 255, 255, 0.5)'
      subCtx.strokeRect(1, targetY - halfSideLength, sideLength + 2, sideLength)

      ctx.fillStyle = 'rgba(255, 255, 255, 0.75)'
      ctx.fillRect(
        targetX - halfSideLength - 1,
        targetY - halfSideLength - 1,
        sideLength + 2,
        sideLength + 2
      )
    }

    function refresh(target = props.slideTarget) {
      currentTarget.value = parseTarget(target)
      // isSuccess.value = false
      slider.value?.refresh()
    }

    function parseTarget(target = props.slideTarget) {
      if (isNull(target)) return [random(75, 25), random(75, 25)]

      const [targetX = random(75, 25), targetY = random(75, 25)] = ensureArray(target)

      return [targetX, targetY]
    }

    function focus(options?: FocusOptions) {
      // reference.value?.focus(options)
      wrapper.value?.focus(options)
    }

    return () => {
      return (
        <div ref={wrapper} id={idFor.value} class={className.value} tabindex={0}>
          <div class={nh.be('header')}>
            <div class={nh.be('title')}>
              {slots.title
                ? renderSlot(slots, 'title', { success: isSuccess.value })
                : props.title ?? locale.value.fixImage}
            </div>
            <span role={'none'} style={'flex: auto'}></span>
            <button
              class={[nh.be('action'), nh.be('refresh')]}
              onClick={() => emitEvent(props.onRefresh)}
            >
              {slots.refresh
                ? (
                    renderSlot(slots, 'refresh')
                  )
                : (
                <Icon
                  {...icons.value.refresh}
                  icon={props.refreshIcon || icons.value.refresh.icon}
                ></Icon>
                  )}
            </button>
          </div>
          {hasImage.value && (
            <div class={nh.be('image')}>
              <canvas
                ref={canvas}
                class={nh.be('canvas')}
                width={canvasSize.value[0]}
                height={canvasSize.value[1]}
              ></canvas>
              <div ref={subImage} class={nh.be('sub-image')}>
                <canvas
                  ref={subCanvas}
                  class={nh.be('sub-canvas')}
                  height={canvasSize.value[1]}
                  style={subCanvasStyle.value}
                ></canvas>
              </div>
              <Transition name={nh.ns('fade')}>
                {props.type === 'slide-image' && isSuccess.value && (
                  <div class={[nh.be('image-tip'), nh.bem('image-tip', 'success')]}>
                    {props.successTip ?? locale.value.success}
                  </div>
                )}
              </Transition>
            </div>
          )}
          <CaptchaSlider
            ref={slider}
            class={nh.bem('slider', 'inner')}
            target={usedTarget.value}
            tolerance={tolerance.value}
          >
            {{
              tip: () =>
                slots.tip
                  ? renderSlot(slots, 'tip', { success: isSuccess.value })
                  : isSuccess.value
                    ? props.successTip ?? locale.value.success
                    : props.tip ?? normalTip.value
            }}
          </CaptchaSlider>
        </div>
      )
    }
  }
})
