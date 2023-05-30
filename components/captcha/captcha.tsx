import { Icon } from '@/components/icon'

import { Transition, computed, defineComponent, onMounted, ref, renderSlot, watch } from 'vue'

import { emitEvent, useIcons, useLocale, useNameHelper, useProps } from '@vexip-ui/config'
import { useMoving } from '@vexip-ui/hooks'
import { boundRange, ensureArray, isClient, isNull, random, toFixed } from '@vexip-ui/utils'
import { captchaProps } from './props'

export default defineComponent({
  name: 'Captcha',
  props: captchaProps,
  emits: [],
  setup(_props, { slots, expose }) {
    const props = useProps('captcha', _props, {
      type: 'slide',
      loading: false,
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
      refreshIcon: null
    })

    const nh = useNameHelper('captcha')
    const locale = useLocale('captcha')
    const icons = useIcons()

    const currentLeft = ref(0)
    const currentTarget = ref(parseTarget(props.slideTarget))
    const resetting = ref(false)
    const isSuccess = ref(false)

    const track = ref<HTMLElement>()
    const canvas = ref<HTMLCanvasElement>()
    const subImage = ref<HTMLImageElement>()
    const subCanvas = ref<HTMLCanvasElement>()

    const usedTarget = computed(() => (props.type === 'slide' ? 100 : currentTarget.value[0]))
    const tolerance = computed(() => (props.type === 'slide' ? 0 : props.tolerance ?? 2))

    // let rendering = false
    let imageLoaded = false
    let image: HTMLImageElement | false
    let widthLimit: number
    // let leftStartAt: number

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
      return [
        nh.b(),
        nh.bs('vars'),
        nh.bm(props.type),
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
    const subCanvasStyle = computed(() => {
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

    function verifyPosition() {
      currentLeft.value = toFixed(boundRange(currentLeft.value, 0, 100), 3)
    }

    function afterReset() {
      resetting.value = false
    }

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

      if (!image || !imageLoaded || !canvasEl || !ctx || !subCanvasEl || !subCtx || !props.image) { return }

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
      isSuccess.value = false
    }

    function parseTarget(target = props.slideTarget) {
      if (isNull(target)) return [random(75, 25), random(75, 25)]

      const [targetX = random(75, 25), targetY = random(75, 25)] = ensureArray(target)

      return [targetX, targetY]
    }

    function matchTarget(value: number) {
      return Math.abs(usedTarget.value - value) <= tolerance.value
    }

    return () => {
      return (
        <div class={className.value} tabindex={-1}>
          <div class={nh.be('actions')}>
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
                  scale={1.2}
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
          <div class={nh.be('slider')}>
            <div
              class={{
                [nh.be('filler')]: true,
                [nh.bem('filler', 'loading')]: props.loading,
                [nh.bem('filler', 'success')]: isSuccess.value
              }}
              style={fillerStyle.value}
            ></div>
            <div
              class={{
                [nh.be('tip')]: true,
                [nh.bem('tip', 'focused')]: dragging.value,
                [nh.bem('tip', 'loading')]: props.loading,
                [nh.bem('tip', 'success')]: isSuccess.value
              }}
              style={tipStyle.value}
            >
              {slots.tip
                ? renderSlot(slots, 'tip', { success: isSuccess.value })
                : props.type === 'slide' && isSuccess.value
                  ? props.successTip ?? locale.value.success
                  : props.tip ?? normalTip.value}
            </div>
            <div ref={track} class={nh.be('track')}>
              <div
                ref={trigger}
                class={{
                  [nh.be('trigger')]: true,
                  [nh.bem('trigger', 'focused')]: dragging.value,
                  [nh.bem('trigger', 'loading')]: props.loading,
                  [nh.bem('trigger', 'success')]: isSuccess.value
                }}
                tabindex={0}
                style={triggerStyle.value}
                onTransitionend={afterReset}
              >
                {slots.trigger
                  ? (
                      renderSlot(slots, 'trigger', { success: isSuccess.value })
                    )
                  : isSuccess.value
                    ? (
                  <Icon {...icons.value.check}></Icon>
                      )
                    : props.loading
                      ? (
                  <Icon {...icons.value.loading}></Icon>
                        )
                      : (
                  <Icon {...icons.value.anglesRight}></Icon>
                        )}
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
})
