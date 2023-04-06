import { defineComponent, ref, computed, watch } from 'vue'
import { Icon } from '@/components/icon'
import { ResizeObserver } from '@/components/resize-observer'
import { useNameHelper, useProps, useLocale, useIcons, emitEvent } from '@vexip-ui/config'
import { useMoving } from '@vexip-ui/hooks'
import { toFixed, boundRange, random, debounce } from '@vexip-ui/utils'
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
        validator: value => value >= 0 || value <= 100
      },
      tip: null,
      successTip: null,
      image: null
    })

    const nh = useNameHelper('captcha')
    const locale = useLocale('captcha')
    const icons = useIcons()

    const currentLeft = ref(0)
    const currentTarget = ref(props.slideTarget ?? random(80, 20))
    const resetting = ref(false)
    const isSuccess = ref(false)

    const track = ref<HTMLElement>()
    const canvas = ref<HTMLCanvasElement>()

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
        currentTarget.value = value ?? currentTarget.value ?? random(80, 20)
      }
    )

    expose({ refresh })

    const handleImageResize = debounce((entry: ResizeObserverEntry) => {
      if (!canvas.value) return

      const width = entry.borderBoxSize?.[0]?.inlineSize ?? entry.contentRect.width
      const height = Math.round((width / 16) * 9)

      canvas.value.width = width
      canvas.value.height = height

      drawImage()
    }, 16)

    function verifyPosition() {
      currentLeft.value = toFixed(boundRange(currentLeft.value, 0, 100), 3)
    }

    function afterReset() {
      resetting.value = false
    }

    function drawImage() {
      const canvasEl = canvas.value
      const ctx = canvasEl?.getContext('2d')

      if (!canvasEl || !ctx || !props.image) return

      const image = new Image()

      image.src = props.image
      image.onload = () => {
        ctx.drawImage(image, 0, 0, canvasEl.width, canvasEl.height)
      }
    }

    function refresh() {
      currentTarget.value = props.slideTarget ?? random(80, 20)
    }

    return () => {
      return (
        <div class={className.value} tabindex={-1}>
          <div class={nh.be('image')}>
            <ResizeObserver onResize={handleImageResize}>
              <div class={nh.be('width-detector')}></div>
            </ResizeObserver>
            <canvas ref={canvas}></canvas>
          </div>
          <div class={nh.be('slider')}>
            <div
              class={{
                [nh.be('filler')]: true,
                [nh.bem('filler', 'loading')]: props.loading,
                [nh.bem('filler', 'success')]: isSuccess.value
              }}
              style={fillerStyle.value}
              onTransitionend={afterReset}
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
                ? slots.tip({ success: isSuccess.value })
                : isSuccess.value
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
              >
                {slots.trigger
                  ? (
                      slots.trigger({ success: isSuccess.value })
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
