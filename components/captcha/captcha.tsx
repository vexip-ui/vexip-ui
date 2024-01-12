import { Button } from '@/components/button'
import { Icon } from '@/components/icon'
import { Spin } from '@/components/spin'
import { Tooltip } from '@/components/tooltip'
import { useFieldStore } from '@/components/form'

import {
  Transition,
  TransitionGroup,
  computed,
  defineComponent,
  nextTick,
  onMounted,
  reactive,
  ref,
  renderSlot,
  shallowRef,
  toRef,
  watch
} from 'vue'

import CaptchaSlider from './captcha-slider.vue'
import {
  createIconProp,
  createSizeProp,
  emitEvent,
  useIcons,
  useLocale,
  useNameHelper,
  useProps
} from '@vexip-ui/config'
import { createSlotRender, useSetTimeout } from '@vexip-ui/hooks'
import {
  ensureArray,
  isClient,
  isNull,
  nextFrameOnce,
  random,
  randomHardColor
} from '@vexip-ui/utils'
import { captchaProps } from './props'
import { captchaRectPath } from './paths'

import type { CaptchaSliderExposed } from '@/components/captcha-slider'
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
      failTip: null,
      image: null,
      tolerance: {
        default: 1,
        validator: value => value >= 0
      },
      canvasSize: () => [1000, 600],
      refreshIcon: createIconProp(),
      disabled: () => disabled.value,
      loading: () => loading.value,
      loadingIcon: createIconProp(),
      loadingEffect: null,
      onBeforeTest: {
        default: null,
        isFunc: true
      },
      texts: {
        default: () => [],
        validator: value => !value.find(text => text.length > 1)
      },
      failLimit: 0,
      remotePoint: false,
      useTrigger: false,
      triggerSize: createSizeProp(),
      triggerText: null,
      transfer: false,
      hideDelay: {
        default: 3000,
        validator: value => value >= 0
      },
      pathProcess: {
        default: captchaRectPath,
        isFunc: true
      }
    })

    const nh = useNameHelper('captcha')
    const locale = useLocale('captcha')
    const icons = useIcons()

    const { timer } = useSetTimeout()

    const currentTarget = ref(parseTarget(props.slideTarget))
    const dragging = ref(false)
    const pointers = reactive<number[][]>([])
    const testLoading = ref(false)
    const success = ref(false)
    const failed = ref(false)
    const failedCount = ref(0)
    const visible = ref(false)

    const wrapper = ref<HTMLElement>()
    const canvas = ref<HTMLCanvasElement>()
    const subCanvas = ref<HTMLCanvasElement>()
    const slider = ref<CaptchaSliderExposed>()

    const track = computed(() => slider.value?.track)

    const isSuccess = computed(() => !!slider.value?.isSuccess || success.value)
    const currentLeft = computed(() => slider.value?.currentLeft || 0)
    const resetting = computed(() => slider.value?.resetting)

    const usedTarget = computed(() => currentTarget.value[0])

    const imageLoading = ref(false)
    const imagePromise = shallowRef(Promise.resolve())

    const pointerTargets: number[][] = []

    const fontRate = 0.108

    let imageLoaded = false
    let image: HTMLImageElement | undefined
    let memoryCanvas: HTMLCanvasElement | undefined

    const isLoading = computed(() => props.loading || imageLoading.value || testLoading.value)
    const failLocked = computed(() => props.failLimit > 0 && failedCount.value >= props.failLimit)
    const className = computed(() => {
      return [
        nh.b(),
        nh.bs('vars'),
        nh.bm(props.type),
        {
          [nh.bm('success')]: isSuccess.value,
          [nh.bm('fail')]: !isSuccess.value && failed.value,
          [nh.bm('dragging')]: dragging.value,
          [nh.bm('disabled')]: props.disabled,
          [nh.bm('loading')]: isLoading.value,
          [nh.bm('fail-locked')]: failLocked.value
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
    const actionLocked = computed(() => props.disabled || isSuccess.value || isLoading.value)

    watch(
      () => props.slideTarget,
      value => {
        currentTarget.value = parseTarget(value)
      }
    )
    watch([() => props.image, wrapper], async () => {
      image = undefined
      await (imagePromise.value = loadImage())
      drawImageNextFrame()
    })
    watch([currentTarget, () => props.canvasSize[0], () => props.canvasSize[1]], () => {
      drawImageNextFrame()
    })
    watch(
      [() => props.type, () => props.remotePoint],
      () => {
        if (
          props.type !== 'slide' &&
          props.remotePoint &&
          typeof props.onBeforeTest !== 'function'
        ) {
          console.warn(
            "[vexip-ui:Captcha] You should specify 'on-before-test' prop to valid the captcha " +
              "if you are using the 'point' type in remote"
          )
        }
      },
      { immediate: true }
    )
    watch(
      [() => props.type, () => props.texts, () => props.texts.length, () => props.remotePoint],
      () => {
        if (props.type === 'point' && props.texts.length && !props.remotePoint && image) {
          drawImageNextFrame()
        }
      }
    )
    watch(visible, async value => {
      if (value) {
        await (imagePromise.value = loadImage())
        drawImageNextFrame()
      }
    })
    watch(isSuccess, value => {
      if (value && props.useTrigger && visible.value) {
        clearTimeout(timer.hideTrigger)

        timer.hideTrigger = setTimeout(() => {
          visible.value = false
        }, props.hideDelay)
      }
    })

    onMounted(async () => {
      await (imagePromise.value = loadImage())
      drawImage()
    })

    expose({
      dragging,
      resetting,
      isSuccess,
      imageLoading,
      imagePromise,
      wrapper,
      canvas,
      subCanvas,
      slider,
      reset
    })

    // 避免多次触发时发生竞态问题
    let loadFlag: string

    async function loadImage() {
      if (image) return

      imageLoading.value = true
      loadFlag = `${Date.now()}${Math.round(Math.random() * 10e6)}`

      const flag = loadFlag
      const src = typeof props.image === 'function' ? await props.image() : props.image

      await new Promise<void>(resolve => {
        if (!isClient || flag !== loadFlag || !src) {
          resolve()
          return
        }

        image = new Image()
        imageLoaded = false
        image.src = src

        if (src.trim().startsWith('data:image')) {
          imageLoaded = true
          resolve()
        } else {
          image.onload = () => {
            imageLoaded = true
            resolve()
          }
        }
      }).finally(() => {
        imageLoading.value = false
      })
    }

    function drawImageWithTexts() {
      const canvasEl = canvas.value
      const ctx = canvasEl?.getContext?.('2d')

      if (!image || !canvasEl || !ctx) return

      const { width, height } = canvasEl

      ctx.drawImage(image, 0, 0, width, height)

      if (!props.texts.length || props.remotePoint) return

      pointerTargets.length = 0

      const fontSize = Math.max(width, height) * fontRate

      ctx.textBaseline = 'middle'
      ctx.textAlign = 'center'
      ctx.font = `bold ${fontSize}px sans-serif`
      ctx.lineWidth = 2
      ctx.strokeStyle = '#fff'

      const drawText = (
        text: string,
        x: number,
        y: number,
        radian = 0,
        color = randomHardColor()
      ) => {
        ctx.save()
        ctx.translate(x, y)
        radian && ctx.rotate(radian * Math.PI)
        ctx.fillStyle = color
        ctx.fillText(text, 0, 0)
        ctx.strokeText(text, 0, 0)
        ctx.restore()
      }

      const metrics = ctx.measureText(props.texts[0])
      const xLimit = Math.max(fontSize, metrics.width) * 1.2
      const yLimit =
        Math.max(fontSize, metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent) * 1.2

      let prevX = -2 * fontSize
      let prevY = -2 * fontSize

      for (const text of props.texts) {
        let x = prevX
        let y = prevY

        while (Math.abs(x - prevX) < xLimit && Math.abs(y - prevY) < yLimit) {
          x = width * 0.1 + Math.random() * width * 0.8
          y = height * 0.1 + Math.random() * height * 0.8
        }

        prevX = x
        prevY = y

        pointerTargets.push([(x / width) * 100, (y / height) * 100])
        drawText(text, x, y, Math.random() * 2)
      }
    }

    function drawImage() {
      const canvasEl = canvas.value
      const ctx = canvasEl?.getContext?.('2d')
      const subCanvasEl = subCanvas.value
      const subCtx = subCanvasEl?.getContext?.('2d')

      if (!image || !imageLoaded || !canvasEl || !ctx || !props.image) return

      if (props.type === 'point') {
        drawImageWithTexts()
        return
      }

      if (!subCanvasEl || !subCtx || !track.value) return

      if (!memoryCanvas) {
        if (!isClient) return

        memoryCanvas = document.createElement('canvas')
        memoryCanvas.width = props.canvasSize[0]
        memoryCanvas.height = props.canvasSize[1]
      }

      const pathCtx = memoryCanvas.getContext('2d')

      if (!pathCtx) return

      const canvasRect = canvasEl.getBoundingClientRect()
      const trackRect = track.value.getBoundingClientRect()
      // 滑动时以轨道为准，所以需要补正 canvas 宽度和 track 宽度的差值
      const widthFix = ((canvasRect.width - trackRect.width) / canvasRect.width) * canvasEl.width

      const targetX = widthFix / 2 + currentTarget.value[0] * (canvasEl.width - widthFix) * 0.01
      const targetY = currentTarget.value[1] * canvasEl.height * 0.01

      pathCtx.clearRect(0, 0, props.canvasSize[0], props.canvasSize[1])
      pathCtx.beginPath()
      pathCtx.strokeStyle = 'rgba(255, 255, 255, 0.5)'
      pathCtx.lineWidth = 4

      const [clipX, clipY, clipWidth, clipHeight] = props.pathProcess({
        ctx: pathCtx,
        x: targetX,
        y: targetY,
        width: props.canvasSize[0],
        height: props.canvasSize[1]
      })

      pathCtx.stroke()
      pathCtx.clip()
      pathCtx.drawImage(image, 0, 0, canvasEl.width, canvasEl.height)

      // 中心点偏移修正
      const xLeftWidth = targetX - clipX
      const translateFix = ((clipWidth * 0.5 - xLeftWidth) / clipWidth) * 100

      subCanvasEl.style.transform = `translate3d(${translateFix - 50}%, 0, 0)`
      subCanvasEl.width = clipWidth

      subCtx.drawImage(
        memoryCanvas,
        clipX,
        clipY,
        clipWidth,
        clipHeight,
        0,
        clipY,
        clipWidth,
        clipHeight
      )

      ctx.save()
      ctx.beginPath()
      ctx.fillStyle = 'rgba(255, 255, 255, 0.75)'
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'
      ctx.lineWidth = 10

      props.pathProcess({
        ctx,
        x: targetX,
        y: targetY,
        width: props.canvasSize[0],
        height: props.canvasSize[1]
      })

      ctx.stroke()
      ctx.fill()
      ctx.restore()
      ctx.globalCompositeOperation = 'destination-over'
      ctx.drawImage(image, 0, 0, canvasEl.width, canvasEl.height)
    }

    function drawImageNextFrame() {
      nextFrameOnce(drawImage)
    }

    async function reset(newImage?: string | (() => Promise<string>)) {
      if (newImage) {
        image = undefined
        await (imagePromise.value = loadImage())
        drawImage()
      }

      success.value = false
      failed.value = false
      failedCount.value = 0
      currentTarget.value = parseTarget()
      pointers.length = 0

      slider.value?.reset()
      props.type === 'point' && drawImageWithTexts()
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
      success.value = true
      failed.value = false

      emitEvent(props.onSuccess as SuccessEvent, percent)
      setFieldValue(percent)
      validateField()
    }

    function handleSlideFail() {
      failed.value = true
      ++failedCount.value

      emitEvent(props.onFail)
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

      let result = props.remotePoint
      let customResult: unknown

      if (!props.remotePoint && canvas.value) {
        const { width, height } = canvas.value
        const fontSize = Math.max(width, height) * fontRate
        const xTolerance = (fontSize / width) * 50 + props.tolerance
        const yTolerance = (fontSize / height) * 50 + props.tolerance

        result = true

        for (let i = 0, len = pointers.length; i < len; ++i) {
          const [x, y] = pointers[i]
          const [targetX, targetY] = pointerTargets[i]

          if (Math.abs(x - targetX) > xTolerance || Math.abs(y - targetY) > yTolerance) {
            result = false
            break
          }
        }
      }

      if (typeof props.onBeforeTest === 'function') {
        nextTick(() => {
          testLoading.value = true
        })
        customResult = await (props.onBeforeTest as any)(pointers.flat())
        nextTick(() => {
          testLoading.value = false
        })
      }

      if (!result || customResult === false) {
        success.value = false
        pointers.length = 0
        failed.value = true
        ++failedCount.value

        emitEvent(props.onFail)
      } else {
        success.value = true
        failed.value = false

        emitEvent(props.onSuccess as SuccessEvent, pointers.flat())
      }
    }

    function handleImageClick(event: MouseEvent) {
      if (props.type !== 'point' || actionLocked.value || !canvas.value) return

      const { clientWidth: canvasWidth, clientHeight: canvasHeight } = canvas.value
      const { offsetX, offsetY } = event

      pointers.push([(offsetX / canvasWidth) * 100, (offsetY / canvasHeight) * 100])

      if (pointers.length >= props.texts.length) {
        nextTick(verifyPointers)
      }
    }

    function cancelPointer(index: number, event: Event) {
      event.stopPropagation()

      if (actionLocked.value || index !== pointers.length - 1) return

      pointers.pop()
    }

    function handleTrigger() {
      if (!isSuccess.value) {
        visible.value = true
      }
    }

    function renderImage() {
      return (
        <div
          class={[nh.be('image'), actionLocked.value && nh.bem('image', 'locked')]}
          onClick={handleImageClick}
        >
          {props.image && (
            <div class={nh.be('image-inner')}>
              <canvas
                ref={canvas}
                class={nh.be('canvas')}
                width={canvasSize.value[0]}
                height={canvasSize.value[1]}
              ></canvas>
              {props.type === 'slide' && (
                <div class={nh.be('sub-image')}>
                  <canvas
                    ref={subCanvas}
                    class={nh.be('sub-canvas')}
                    height={canvasSize.value[1]}
                    style={subCanvasStyle.value}
                  ></canvas>
                </div>
              )}
            </div>
          )}
          {props.type === 'point' && (
            <TransitionGroup name={nh.ns('fade')} appear>
              {pointers.map(([x, y], index) => (
                <span
                  key={index}
                  class={nh.be('pointer')}
                  style={{ top: `${y}%`, left: `${x}%` }}
                  onClick={cancelPointer.bind(null, index)}
                >
                  {index + 1}
                </span>
              ))}
            </TransitionGroup>
          )}
          <Transition name={nh.ns('fade')}>
            {(isSuccess.value || failed.value) && (
              <div
                class={[
                  nh.be('image-tip'),
                  nh.bem('image-tip', isSuccess.value ? 'success' : 'fail')
                ]}
                onClick={stopPropagation}
              >
                {isSuccess.value
                  ? props.successTip ?? locale.value.success
                  : props.failTip ?? locale.value.fail}
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
          tolerance={props.tolerance}
          loading={isLoading.value}
          loading-icon={props.loadingIcon}
          loading-lock
          loading-effect={props.loadingEffect}
          disabled={props.disabled || failLocked.value}
          onBeforeTest={props.onBeforeTest}
          onSuccess={handleSlideSuccess}
          onFail={handleSlideFail}
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
          {renderSlot(slots, 'texts', { texts: toRef(props, 'texts') }, () =>
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

    function renderPanel() {
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
                  {...icons.value.refresh}
                  icon={props.refreshIcon || icons.value.refresh.icon}
                ></Icon>
              ])}
            </button>
          </div>
          <Spin active={isLoading.value || slider.value?.isLoading} delay={false}>
            {{
              default: renderImage,
              icon: createSlotRender(slots, ['loading-icon', 'loadingIcon'])
            }}
          </Spin>
          {renderFooter()}
        </div>
      )
    }

    function renderTrigger() {
      return renderSlot(
        slots,
        'trigger',
        { visible: visible.value, success: isSuccess.value },
        () => [
          <Button
            class={[nh.be('button'), isSuccess.value && nh.bem('button', 'success')]}
            type={isSuccess.value ? 'success' : 'primary'}
            size={props.triggerSize}
            block
            loading={visible.value && !isSuccess.value}
            icon={isSuccess.value ? icons.value.success.icon : null}
            onClick={handleTrigger}
          >
            {props.triggerText ?? (isSuccess.value ? locale.value.completed : locale.value.trigger)}
          </Button>
        ]
      )
    }

    return () => {
      if (props.useTrigger) {
        return (
          <Tooltip
            class={nh.bs('wrapper')}
            visible={visible.value}
            trigger={'custom'}
            raw
            wrapper
            transfer={props.transfer}
          >
            {{
              trigger: renderTrigger,
              default: renderPanel
            }}
          </Tooltip>
        )
      }

      return renderPanel()
    }
  }
})
