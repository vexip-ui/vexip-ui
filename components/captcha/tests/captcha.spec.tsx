import { CaptchaSlider } from '@/components/captcha-slider'

import { afterEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'

import { Hand } from 'lucide-vue-next'
import { noop } from '@vexip-ui/utils'
import { Captcha } from '..'

vi.useFakeTimers()

const IMAGE = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs='

function nextFrame() {
  return new Promise(resolve => requestAnimationFrame(resolve))
}

async function moveStart(el: Element, value = 0) {
  const downEvent = new CustomEvent('pointerdown') as any
  downEvent.button = 0
  downEvent.clientX = value
  downEvent.clientY = value
  el.dispatchEvent(downEvent)
  await nextTick()
}

async function move(value = 100) {
  const moveEvent = new CustomEvent('pointermove') as any
  moveEvent.clientX = value
  moveEvent.clientY = value
  document.dispatchEvent(moveEvent)
  vi.runOnlyPendingTimers()
  await nextTick()
}

async function moveEnd() {
  const upEvent = new CustomEvent('pointerup') as any
  document.dispatchEvent(upEvent)
  vi.runOnlyPendingTimers()
  await nextTick()
}

describe('Captcha', () => {
  const mocked: Array<ReturnType<typeof vi.spyOn>> = []

  let wrapper: ReturnType<typeof mount> | null

  async function createSlideCaptcha(
    props: InstanceType<typeof Captcha>['$props'] = {},
    slots: any = {},
  ) {
    vi.useRealTimers()

    wrapper = mount(Captcha, { props: { image: IMAGE, ...props, type: 'slide' }, slots })
    const trigger = wrapper.find('.vxp-captcha__trigger')

    await nextFrame()
    await trigger.trigger('transitionend')
    await nextTick()

    vi.useFakeTimers()

    const trackEl = wrapper.find('.vxp-captcha__track').element
    mocked.push(
      vi.spyOn(trackEl, 'getBoundingClientRect').mockImplementation(() => ({
        x: 0,
        y: 0,
        top: 0,
        left: 0,
        width: 100,
        height: 100,
        right: 0,
        bottom: 0,
        toJSON: noop,
      })),
    )

    return wrapper
  }

  async function toggleMove(value = 100, el = wrapper) {
    if (el) {
      await moveStart(el.find('.vxp-captcha__trigger').element, 0)
      await move(value)
      await moveEnd()
    }
  }

  async function afterReset(el = wrapper) {
    if (el) {
      await el.find('.vxp-captcha__trigger').trigger('transitionend')
      await nextTick()
    }
  }

  async function createCaptcha(
    props: InstanceType<typeof Captcha>['$props'] = {},
    slots: any = {},
  ) {
    vi.useRealTimers()

    wrapper = mount(Captcha, { props: { image: IMAGE, ...props }, slots })

    await nextFrame()
    await nextTick()
    vi.useFakeTimers()

    return wrapper
  }

  afterEach(() => {
    if (mocked.length) {
      mocked.forEach(instance => {
        instance.mockRestore()
      })

      mocked.length = 0
    }

    if (wrapper) {
      wrapper.unmount()
      wrapper = null
    }
  })

  it('render', async () => {
    wrapper = await createSlideCaptcha()

    expect(wrapper.classes()).toContain('vxp-captcha-vars')
    expect(wrapper.classes()).toContain('vxp-captcha--slide')
    expect(wrapper.find('.vxp-captcha__header').exists()).toBe(true)
    expect(wrapper.find('.vxp-captcha__title').exists()).toBe(true)
    expect(wrapper.find('.vxp-captcha__image').exists()).toBe(true)
    expect(wrapper.find('.vxp-captcha__canvas').exists()).toBe(true)
    expect(wrapper.find('.vxp-captcha__slider').exists()).toBe(true)
    expect(wrapper.find('.vxp-captcha__trigger').exists()).toBe(true)
  })

  it('title', () => {
    const wrapper = mount(() => <Captcha title={'title'}></Captcha>)

    expect(wrapper.find('.vxp-captcha__title').exists()).toBe(true)
    expect(wrapper.find('.vxp-captcha__title').text()).toEqual('title')
  })

  it('tip', () => {
    const wrapper = mount(() => <Captcha tip={'tip'}></Captcha>)

    expect(wrapper.find('.vxp-captcha__tip').exists()).toBe(true)
    expect(wrapper.find('.vxp-captcha__tip').text()).toEqual('tip')
  })

  it('slide', async () => {
    wrapper = await createSlideCaptcha({ slideTarget: 50 })

    expect(wrapper.find('.vxp-captcha').classes()).not.toContain('vxp-captcha--success')
    expect(wrapper.find('.vxp-captcha').classes()).not.toContain('vxp-captcha--fail')

    await toggleMove(40)
    expect(wrapper.find('.vxp-captcha').classes()).not.toContain('vxp-captcha--success')
    expect(wrapper.find('.vxp-captcha').classes()).toContain('vxp-captcha--fail')
    expect(wrapper.find('.vxp-captcha__image-tip').exists()).toBe(true)
    expect(wrapper.find('.vxp-captcha__image-tip').classes()).toContain(
      'vxp-captcha__image-tip--fail',
    )

    await afterReset()
    await toggleMove(50)
    expect(wrapper.find('.vxp-captcha').classes()).toContain('vxp-captcha--success')
    expect(wrapper.find('.vxp-captcha').classes()).not.toContain('vxp-captcha--fail')
  })

  it('success tip', async () => {
    wrapper = await createSlideCaptcha({
      slideTarget: 50,
      successTip: 'tip',
    })

    await toggleMove(50)
    expect(wrapper.find('.vxp-captcha__image-tip').exists()).toBe(true)
    expect(wrapper.find('.vxp-captcha__image-tip').classes()).toContain(
      'vxp-captcha__image-tip--success',
    )
    expect(wrapper.find('.vxp-captcha__image-tip').text()).toEqual('tip')
  })

  it('tolerance', async () => {
    wrapper = await createSlideCaptcha({
      slideTarget: 50,
      tolerance: 5,
    })

    await toggleMove(40)
    expect(wrapper.find('.vxp-captcha').classes()).toContain('vxp-captcha--fail')

    await afterReset()
    await toggleMove(46)
    expect(wrapper.find('.vxp-captcha').classes()).toContain('vxp-captcha--success')
  })

  it('canvas size', async () => {
    wrapper = await createSlideCaptcha({ canvasSize: [100, 60] })
    const canvas = wrapper.find('.vxp-captcha__canvas')

    expect(canvas.attributes('width')).toEqual('100')
    expect(canvas.attributes('height')).toEqual('60')
  })

  it('refresh icon', async () => {
    wrapper = await createSlideCaptcha({ refreshIcon: Hand })

    expect(wrapper.find('.vxp-captcha__refresh').exists()).toBe(true)
    expect(wrapper.find('.vxp-captcha__refresh').findComponent(Hand).exists()).toBe(true)
  })

  it('disabled', async () => {
    wrapper = await createSlideCaptcha()

    expect(wrapper.find('.vxp-captcha').classes()).not.toContain('vxp-captcha--disabled')

    await wrapper.setProps({ disabled: true })
    expect(wrapper.find('.vxp-captcha').classes()).toContain('vxp-captcha--disabled')
    expect(wrapper.find('.vxp-captcha__slider').classes()).toContain(
      'vxp-captcha__slider--disabled',
    )
  })

  it('loading', async () => {
    wrapper = await createSlideCaptcha()

    expect(wrapper.find('.vxp-captcha').classes()).not.toContain('vxp-captcha--loading')

    await wrapper.setProps({ loading: true })
    expect(wrapper.find('.vxp-captcha').classes()).toContain('vxp-captcha--loading')
    expect(wrapper.find('.vxp-captcha__slider').classes()).toContain('vxp-captcha__slider--loading')
  })

  it('loading icon', async () => {
    wrapper = await createSlideCaptcha({ loadingIcon: Hand })

    expect(wrapper.findComponent(Hand).exists()).toBe(false)
    await wrapper.setProps({ loading: true })
    expect(wrapper.findComponent(Hand).exists()).toBe(true)
  })

  it('before test', async () => {
    const onBeforeTest = vi.fn()
    wrapper = await createSlideCaptcha({ slideTarget: 40, onBeforeTest })

    await toggleMove(50)
    expect(onBeforeTest).toHaveBeenCalledTimes(1)
    await afterReset()
    onBeforeTest.mockRestore()

    onBeforeTest.mockReturnValue(false)
    await toggleMove(40)
    expect(onBeforeTest).toHaveBeenCalledTimes(1)
    expect(wrapper.find('.vxp-captcha').classes()).toContain('vxp-captcha--fail')
    await afterReset()
    onBeforeTest.mockRestore()

    let leftResult = -1
    onBeforeTest.mockImplementation((left: number) => {
      leftResult = left
      return true
    })
    await toggleMove(50)
    expect(onBeforeTest).toHaveBeenCalledTimes(1)
    expect(wrapper.find('.vxp-captcha').classes()).toContain('vxp-captcha--success')
    expect(leftResult).toBe(50)
  })

  it('point type', async () => {
    wrapper = await createCaptcha({ type: 'point', texts: ['A', 'B'] })

    expect(wrapper.classes()).toContain('vxp-captcha--point')

    await wrapper.find('.vxp-captcha__image').trigger('click')
    expect(wrapper.find('.vxp-captcha__pointer').exists()).toBe(true)
  })

  it('fail limit', async () => {
    wrapper = await createSlideCaptcha({ failLimit: 2, slideTarget: 50 })
    await toggleMove(40)
    await afterReset()
    expect(wrapper.find('.vxp-captcha__slider').classes()).not.toContain(
      'vxp-captcha__slider--disabled',
    )
    await toggleMove(60)
    await afterReset()
    expect(wrapper.find('.vxp-captcha__slider').classes()).toContain(
      'vxp-captcha__slider--disabled',
    )
    expect(wrapper.classes()).toContain('vxp-captcha--fail-locked')
  })

  it('remove point', async () => {
    const onBeforeTest = vi.fn()
    wrapper = await createCaptcha({
      type: 'point',
      texts: ['A', 'B'],
      remotePoint: true,
      onBeforeTest,
    })

    let length = -1
    onBeforeTest.mockImplementation((positions: number[]) => {
      length = positions.length
      return true
    })

    const image = wrapper.find('.vxp-captcha__image')

    await image.trigger('click')
    expect(onBeforeTest).toHaveBeenCalledTimes(0)

    await image.trigger('click')
    expect(onBeforeTest).toHaveBeenCalledTimes(1)
    expect(length).toBe(4)
    await nextTick()
    expect(wrapper.classes()).toContain('vxp-captcha--success')
  })

  it('use trigger', async () => {
    wrapper = await createCaptcha({
      slideTarget: 50,
      useTrigger: true,
    })
    const button = wrapper.find('.vxp-captcha__button')

    expect(wrapper.find('.vxp-captcha-wrapper').exists()).toBe(true)
    expect(button.exists()).toBe(true)
    expect(wrapper.find('.vxp-captcha').exists()).toBe(false)

    vi.useRealTimers()

    await button.trigger('click')
    await nextTick()
    expect(wrapper.find('.vxp-captcha').exists()).toBe(true)
    expect(wrapper.find('.vxp-captcha__trigger').exists()).toBe(true)

    await nextFrame()
    await wrapper.find('.vxp-captcha__trigger').trigger('transitionend')
    await nextTick()
    vi.useFakeTimers()

    const trackEl = wrapper.find('.vxp-captcha__track').element
    mocked.push(
      vi.spyOn(trackEl, 'getBoundingClientRect').mockImplementation(() => ({
        x: 0,
        y: 0,
        top: 0,
        left: 0,
        width: 100,
        height: 100,
        right: 0,
        bottom: 0,
        toJSON: noop,
      })),
    )

    await toggleMove(50)
    expect(wrapper.find('.vxp-captcha').classes()).toContain('vxp-captcha--success')

    vi.runOnlyPendingTimers()
    await nextTick()
    expect(wrapper.find('.vxp-captcha').exists()).toBe(false)
  })

  it('trigger text', async () => {
    wrapper = await createCaptcha({
      useTrigger: true,
      triggerText: 'text',
    })

    expect(wrapper.find('.vxp-captcha__button').exists()).toBe(true)
    expect(wrapper.find('.vxp-captcha__button').text()).toEqual('text')
  })

  it('slider', async () => {
    const wrapper = mount(CaptchaSlider)

    expect(wrapper.classes()).toContain('vxp-captcha__slider')
    expect(wrapper.classes()).toContain('vxp-captcha-vars')
    expect(wrapper.find('.vxp-captcha__filler').exists()).toBe(true)
    expect(wrapper.find('.vxp-captcha__track').exists()).toBe(true)
    expect(wrapper.find('.vxp-captcha__trigger').exists()).toBe(true)
  })

  it('slider slide', async () => {
    vi.useRealTimers()

    const wrapper = mount(CaptchaSlider, {
      props: { tolerance: 5 },
    })
    const trigger = wrapper.find('.vxp-captcha__trigger')

    await nextFrame()
    await trigger.trigger('transitionend')
    await nextTick()
    vi.useFakeTimers()

    const trackEl = wrapper.find('.vxp-captcha__track').element
    mocked.push(
      vi.spyOn(trackEl, 'getBoundingClientRect').mockImplementation(() => ({
        x: 0,
        y: 0,
        top: 0,
        left: 0,
        width: 100,
        height: 100,
        right: 0,
        bottom: 0,
        toJSON: noop,
      })),
    )

    expect(wrapper.classes()).not.toContain('vxp-captcha__slider--success')

    await toggleMove(94, wrapper)
    expect(wrapper.classes()).not.toContain('vxp-captcha__slider--success')
    await afterReset(wrapper)

    await toggleMove(96, wrapper)
    expect(wrapper.classes()).toContain('vxp-captcha__slider--success')
  })

  it('slider size', async () => {
    const wrapper = mount(CaptchaSlider)

    expect(wrapper.classes()).not.toContain('vxp-captcha__slider--default')

    await wrapper.setProps({ size: 'small' })
    expect(wrapper.classes()).toContain('vxp-captcha__slider--small')

    await wrapper.setProps({ size: 'large' })
    expect(wrapper.classes()).toContain('vxp-captcha__slider--large')
  })

  it('slider loading', async () => {
    const wrapper = mount(CaptchaSlider)

    expect(wrapper.classes()).not.toContain('vxp-captcha__slider--loading')

    await wrapper.setProps({ loading: true })
    expect(wrapper.classes()).toContain('vxp-captcha__slider--loading')
  })

  it('slider loading icon', async () => {
    const wrapper = mount(CaptchaSlider, {
      props: { loadingIcon: Hand },
    })

    expect(wrapper.findComponent(Hand).exists()).toBe(false)
    await wrapper.setProps({ loading: true })
    expect(wrapper.findComponent(Hand).exists()).toBe(true)
  })
})
