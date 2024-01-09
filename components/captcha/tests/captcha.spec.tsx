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
    slots: any = {}
  ) {
    vi.useRealTimers()

    wrapper = mount(Captcha, { props: { image: IMAGE, ...props, type: 'slide' }, slots })
    const trigger = wrapper.find('.vxp-captcha__trigger')

    await nextFrame()
    trigger.exists() && (await trigger.trigger('transitionend'))
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
        toJSON: noop
      }))
    )

    return wrapper
  }

  async function toggleMove(value = 100) {
    if (wrapper) {
      await moveStart(wrapper.find('.vxp-captcha__trigger').element, 0)
      await move(value)
      await moveEnd()
    }
  }

  async function afterReset() {
    if (wrapper) {
      await wrapper.find('.vxp-captcha__trigger').trigger('transitionend')
      await nextTick()
    }
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
      'vxp-captcha__image-tip--fail'
    )

    await afterReset()
    await toggleMove(50)
    expect(wrapper.find('.vxp-captcha').classes()).toContain('vxp-captcha--success')
    expect(wrapper.find('.vxp-captcha').classes()).not.toContain('vxp-captcha--fail')
  })

  it('success tip', async () => {
    wrapper = await createSlideCaptcha({
      slideTarget: 50,
      successTip: 'tip'
    })

    await toggleMove(50)
    expect(wrapper.find('.vxp-captcha__image-tip').exists()).toBe(true)
    expect(wrapper.find('.vxp-captcha__image-tip').classes()).toContain(
      'vxp-captcha__image-tip--success'
    )
    expect(wrapper.find('.vxp-captcha__image-tip').text()).toEqual('tip')
  })

  it('tolerance', async () => {
    wrapper = await createSlideCaptcha({
      slideTarget: 50,
      tolerance: 5
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
      'vxp-captcha__slider--disabled'
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

    onBeforeTest.mockImplementation((left: number) => {
      expect(left).toEqual(50)
      return true
    })
    await toggleMove(50)
    expect(onBeforeTest).toHaveBeenCalledTimes(1)
    expect(wrapper.find('.vxp-captcha').classes()).toContain('vxp-captcha--success')
  })

  it('point type', async () => {
    const wrapper = mount(Captcha, {
      props: { type: 'point' }
    })

    expect(wrapper.classes()).toContain('vxp-captcha--point')
  })

  it('fail limit', async () => {
    wrapper = await createSlideCaptcha({ failLimit: 2, slideTarget: 50 })
    await toggleMove(40)
    await afterReset()
    expect(wrapper.find('.vxp-captcha__slider').classes()).not.toContain(
      'vxp-captcha__slider--disabled'
    )
    await toggleMove(60)
    await afterReset()
    expect(wrapper.find('.vxp-captcha__slider').classes()).toContain(
      'vxp-captcha__slider--disabled'
    )
  })
})
