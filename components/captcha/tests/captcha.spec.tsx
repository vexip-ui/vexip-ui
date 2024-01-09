import { afterEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'

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

async function toggleMove(el: Element, value = 100) {
  await moveStart(el, 0)
  await move(value)
  await moveEnd()
}

describe('Captcha', () => {
  const mocked: Array<ReturnType<typeof vi.spyOn>> = []

  let wrapper: ReturnType<typeof mount> | null

  async function createCaptcha(
    props: InstanceType<typeof Captcha>['$props'] = {},
    slots: any = {}
  ) {
    vi.useRealTimers()

    wrapper = mount(Captcha, { props, slots })
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
        toJSON: noop
      }))
    )

    return wrapper
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

  it('render', () => {
    const wrapper = mount(Captcha)

    expect(wrapper.classes()).toContain('vxp-captcha-vars')
    expect(wrapper.find('.vxp-captcha__header').exists()).toBe(true)
    expect(wrapper.find('.vxp-captcha__title').exists()).toBe(true)
    expect(wrapper.find('.vxp-captcha__image').exists()).toBe(true)
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
    wrapper = await createCaptcha({
      image: IMAGE,
      slideTarget: 50
    })

    expect(wrapper.find('.vxp-captcha').classes()).not.toContain('vxp-captcha--success')

    await toggleMove(wrapper.find('.vxp-captcha__trigger').element, 40)
    expect(wrapper.find('.vxp-captcha').classes()).not.toContain('vxp-captcha--success')
    expect(wrapper.find('.vxp-captcha').classes()).toContain('vxp-captcha--fail')
    expect(wrapper.find('.vxp-captcha__image-tip').exists()).toBe(true)
    expect(wrapper.find('.vxp-captcha__image-tip').classes()).toContain(
      'vxp-captcha__image-tip--fail'
    )

    await afterReset()
    await toggleMove(wrapper.find('.vxp-captcha__trigger').element, 50)
    expect(wrapper.find('.vxp-captcha').classes()).toContain('vxp-captcha--success')
  })

  it('success tip', async () => {
    wrapper = await createCaptcha({
      image: IMAGE,
      slideTarget: 50,
      successTip: 'tip'
    })

    await toggleMove(wrapper.find('.vxp-captcha__trigger').element, 50)
    expect(wrapper.find('.vxp-captcha__image-tip').exists()).toBe(true)
    expect(wrapper.find('.vxp-captcha__image-tip').classes()).toContain(
      'vxp-captcha__image-tip--success'
    )
    expect(wrapper.find('.vxp-captcha__image-tip').text()).toEqual('tip')
  })
})
