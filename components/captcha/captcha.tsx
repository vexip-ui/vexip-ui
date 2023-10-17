import { Icon } from '@/components/icon'
import { Spin } from '@/components/spin'
import { useFieldStore } from '@/components/form'

import {
  Transition,
  computed,
  defineComponent,
  nextTick,
  onMounted,
  reactive,
  ref,
  renderSlot,
  shallowRef,
  watch
} from 'vue'

import CaptchaSlider from './captcha-slider.vue'
import { emitEvent, useIcons, useLocale, useNameHelper, useProps } from '@vexip-ui/config'
import { createSlotRender } from '@vexip-ui/hooks'
import { ensureArray, isClient, isNull, random } from '@vexip-ui/utils'
import { captchaProps } from './props'

import type { SuccessEvent } from './symbol'

export default defineComponent({
  name: 'Captcha',
  props: captchaProps,
  emits: ['update:visible'],
  setup(_props, { slots, expose }) {
    const { idFor, disabled, loading, validateField, setFieldValue } = useFieldStore<
      number | number[]
    >(focus)

    const props = useProps('captcha', _props, {
      type: 'slide',
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
      title: null,
      tip: null,
      successTip: null,
      image: null,
      tolerance: {
        default: null,
        validator: value => isNull(value) || value >= 0
      },
      canvasSize: () => [1000, 600],
      refreshIcon: null,
      disabled: () => disabled.value,
      loading: () => loading.value,
      loadingIcon: null,
      loadingLock: false,
      loadingEffect: null,
      onBeforeTest: {
        default: null,
        isFunc: true
      },
      texts: () => [],
      failLimit: 0
    })

    const nh = useNameHelper('captcha')
    const locale = useLocale('captcha')
    const icons = useIcons()

    const currentTarget = ref(parseTarget(props.slideTarget))
    const dragging = ref(false)
    const pointers = reactive<number[][]>([])
    const testLoading = ref(false)
    const success = ref(false)

    const wrapper = ref<HTMLElement>()
    const canvas = ref<HTMLCanvasElement>()
    const subImage = ref<HTMLImageElement>()
    const subCanvas = ref<HTMLCanvasElement>()
    const slider = ref<InstanceType<typeof CaptchaSlider>>()

    const track = computed(() => slider.value?.track)

    const isSuccess = computed(() =>
      props.type === 'slide' ? !!slider.value?.isSuccess : success.value
    )
    const currentLeft = computed(() => slider.value?.currentLeft || 0)
    const resetting = computed(() => slider.value?.resetting)

    const usedTarget = computed(() => currentTarget.value[0])
    const tolerance = computed(() => props.tolerance ?? 1)

    const imageLoading = ref(false)
    const imagePromise = shallowRef(Promise.resolve())

    let imageLoaded = false
    let image: HTMLImageElement | false

    const isLoading = computed(() => loading.value || imageLoading.value || testLoading.value)
    const className = computed(() => {
      return [
        nh.b(),
        nh.bs('vars'),
        nh.bm(props.type),
        {
          [nh.bm('dragging')]: dragging.value,
          [nh.bm('disabled')]: props.disabled,
          [nh.bm('loading')]: isLoading.value
        }
      ]
    })
    const subCanvasStyle = computed(() => {
      return {
        left: `${currentLeft.value}%`,
        [nh.cv('trigger-transition')]: resetting.value ? 'left 250ms ease' : undefined
      }
    })
    const canvasSize = computed(() => {
      return [props.canvasSize[0] || 1000, props.canvasSize[1] || 600]
    })
    const actionLocked = computed(() => {
      return disabled.value || isSuccess.value || isLoading.value
    })

    watch(
      () => props.slideTarget,
      value => {
        currentTarget.value = parseTarget(value)
      }
    )
    watch(
      () => props.image,
      async () => {
        await (imagePromise.value = loadImage())
        drawImage()
      }
    )
    watch([currentTarget, () => props.canvasSize[0], () => props.canvasSize[1]], drawImage)
    watch(
      () => props.type,
      value => {
        if (value !== 'slide' && typeof props.onBeforeTest !== 'function') {
          console.warn(
            "[vexip-ui:Captcha] You should specify 'on-before-test' prop to valid the captcha " +
              "if you are using a type other than 'slide'"
          )
        }
      },
      { immediate: true }
    )

    onMounted(async () => {
      await (imagePromise.value = loadImage())
      drawImage()
    })

    expose({ dragging, imageLoading, imagePromise, reset })

    async function loadImage() {
      imageLoading.value = true

      const src = typeof props.image === 'function' ? await props.image() : props.image

      await new Promise<void>(resolve => {
        image = isClient && new Image()

        if (!image) {
          resolve()
          return
        }

        imageLoaded = false
        image.src = src
        image.onload = () => {
          imageLoaded = true
          resolve()
        }
      }).finally(() => {
        imageLoading.value = false
      })
    }

    function drawImage() {
      const canvasEl = canvas.value
      const ctx = canvasEl?.getContext('2d')
      const subCanvasEl = subCanvas.value
      const subCtx = subCanvasEl?.getContext('2d')

      if (!image || !imageLoaded || !canvasEl || !ctx || !props.image) return

      if (props.type !== 'slide') {
        ctx.drawImage(image, 0, 0, canvasEl.width, canvasEl.height)
        return
      }

      if (!subCanvasEl || !subCtx) return

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
        canvasEl,
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

    function reset(target = props.slideTarget) {
      currentTarget.value = parseTarget(target)
      slider.value?.reset()
    }

    function parseTarget(target = props.slideTarget) {
      if (isNull(target)) return [random(75, 25), random(75, 25)]

      const [targetX = random(75, 25), targetY = random(75, 25)] = ensureArray(target)

      return [targetX, targetY]
    }

    function focus(options?: FocusOptions) {
      slider.value?.focus(options)
    }

    function handleDragStart(percent: number) {
      dragging.value = true
      emitEvent(props.onDragStart, percent)
    }

    function handleDrag(percent: number) {
      emitEvent(props.onDrag, percent)
    }

    function handleDragEnd(percent: number) {
      dragging.value = false
      emitEvent(props.onDragEnd, percent)
    }

    function handleSlideSuccess(percent: number) {
      emitEvent(props.onSuccess as SuccessEvent, percent)
      setFieldValue(percent)
      validateField()
    }

    function handleRefresh() {
      !actionLocked.value && emitEvent(props.onRefresh)
    }

    function stopPropagation(event: Event) {
      event.stopPropagation()
    }

    async function verifyPointers() {
      if (isLoading.value) return

      pointers.length = props.texts.length

      let customResult: unknown

      if (typeof props.onBeforeTest === 'function') {
        nextTick(() => {
          testLoading.value = true
        })
        customResult = await props.onBeforeTest(pointers.flat())
        nextTick(() => {
          testLoading.value = false
        })
      }

      if (customResult === false) {
        success.value = false
        pointers.length = 0

        emitEvent(props.onFail)
      } else {
        success.value = true

        emitEvent(props.onSuccess as SuccessEvent, pointers.flat())
      }
    }

    function handleImageClick(event: MouseEvent) {
      if (props.type !== 'point' || actionLocked.value || !canvas.value) return

      const { clientWidth: canvasWidth, clientHeight: canvasHeight } = canvas.value
      const { offsetX, offsetY } = event

      pointers.push([(offsetX / canvasWidth) * 100, (offsetY / canvasHeight) * 100])

      if (pointers.length >= props.texts.length) {
        verifyPointers()
      }
    }

    function renderImage() {
      if (!props.image) return null

      return (
        <div class={nh.be('image')} onClick={handleImageClick}>
          <div class={nh.be('image-inner')}>
            <canvas
              ref={canvas}
              class={nh.be('canvas')}
              width={canvasSize.value[0]}
              height={canvasSize.value[1]}
            ></canvas>
            {props.type === 'slide' && (
              <div ref={subImage} class={nh.be('sub-image')}>
                <canvas
                  ref={subCanvas}
                  class={nh.be('sub-canvas')}
                  height={canvasSize.value[1]}
                  style={subCanvasStyle.value}
                ></canvas>
              </div>
            )}
          </div>
          {props.type === 'point' &&
            pointers.map(([x, y], index) => (
              <span key={index} class={nh.be('pointer')} style={{ top: `${y}%`, left: `${x}%` }}>
                {index + 1}
              </span>
            ))}
          <Transition name={nh.ns('fade')}>
            {isSuccess.value && (
              <div
                class={[nh.be('image-tip'), nh.bem('image-tip', 'success')]}
                onClick={stopPropagation}
              >
                {props.successTip ?? locale.value.success}
              </div>
            )}
          </Transition>
        </div>
      )
    }

    function renderSlider() {
      return (
        <CaptchaSlider
          ref={slider}
          class={nh.bem('slider', 'inner')}
          target={usedTarget.value}
          tolerance={tolerance.value}
          loading={isLoading.value}
          loading-icon={props.loadingIcon}
          loading-lock={props.loadingLock}
          loading-effect={props.loadingEffect}
          onBeforeTest={props.onBeforeTest}
          onSuccess={handleSlideSuccess}
          onFail={() => emitEvent(props.onFail)}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
        >
          {{
            tip: () =>
              renderSlot(slots, 'tip', { success: isSuccess.value }, () => [
                props.tip ?? locale.value.slide
              ])
          }}
        </CaptchaSlider>
      )
    }

    function renderTextList() {
      return (
        <div class={nh.be('text-list')}>
          <div class={nh.be('tip')}>
            {renderSlot(slots, 'tip', { success: isSuccess.value }, () => [
              props.tip ?? locale.value.pointInOrder
            ])}
          </div>
          <span>{':'}</span>
          {renderSlot(slots, 'texts', undefined, () =>
            props.texts.map((text, index) => (
              <span key={index} class={nh.be('text')}>
                {text}
              </span>
            ))
          )}
        </div>
      )
    }

    function renderFooter() {
      if (props.type === 'slide') return renderSlider()
      if (props.type === 'point') return renderTextList()

      return null
    }

    return () => {
      return (
        <div ref={wrapper} id={idFor.value} class={className.value} tabindex={-1}>
          <div class={nh.be('header')}>
            <div class={nh.be('title')}>
              {renderSlot(slots, 'title', { success: isSuccess.value }, () => [
                props.title ?? locale.value.doCaptcha
              ])}
            </div>
            <span role={'none'} style={'flex: auto'}></span>
            <button
              class={[
                nh.be('action'),
                nh.be('refresh'),
                actionLocked.value && nh.bem('action', 'disabled')
              ]}
              onClick={handleRefresh}
            >
              {renderSlot(slots, 'refresh', undefined, () => [
                <Icon
                  key={0}
                  {...icons.value.refresh}
                  icon={props.refreshIcon || icons.value.refresh.icon}
                ></Icon>
              ])}
            </button>
          </div>
          <Spin active={isLoading.value || slider.value?.isLoading}>
            {{
              default: renderImage,
              icon: createSlotRender(slots, ['loading-icon', 'loadingIcon'])
            }}
          </Spin>
          {renderFooter()}
        </div>
      )
    }
  }
})
