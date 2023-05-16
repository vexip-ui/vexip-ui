import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'

import { noop } from '@vexip-ui/utils'
import { Slider } from '..'

vi.useFakeTimers()

async function toggleMove(el: HTMLElement, value = 40) {
  const downEvent = new CustomEvent('pointerdown') as any
  downEvent.button = 0
  downEvent.clientX = value
  downEvent.clientY = value
  el.dispatchEvent(downEvent)
  await nextTick()

  const moveEvent = new CustomEvent('pointermove') as any
  moveEvent.clientX = value
  moveEvent.clientY = value
  document.dispatchEvent(moveEvent)
  vi.runAllTimers()
  await nextTick()

  const upEvent = new CustomEvent('pointerup') as any
  document.dispatchEvent(upEvent)
}

describe('Slider', () => {
  it('render', () => {
    const wrapper = mount(Slider)

    expect(wrapper.classes()).toContain('vxp-slider-vars')
    expect(wrapper.find('.vxp-slider__track').exists()).toBe(true)
    expect(wrapper.find('.vxp-slider__filler').exists()).toBe(true)
    expect(wrapper.find('.vxp-slider__trigger').exists()).toBe(true)
    expect(wrapper.find('.vxp-slider__handler').exists()).toBe(true)
  })

  it('value', async () => {
    const wrapper = mount(Slider, {
      props: { value: 40 }
    })

    expect(wrapper.find('.vxp-slider__filler').attributes('style')).toContain('scaleX(0.4)')
    expect(wrapper.find('.vxp-slider__trigger').attributes('style')).toContain('left: 40%;')

    await wrapper.setProps({ value: 60 })
    expect(wrapper.find('.vxp-slider__filler').attributes('style')).toContain('scaleX(0.6)')
    expect(wrapper.find('.vxp-slider__trigger').attributes('style')).toContain('left: 60%;')
  })

  it('min and max', async () => {
    const wrapper = mount(() => <Slider value={65} min={50} max={200}></Slider>)

    await nextTick()
    expect(wrapper.find('.vxp-slider__filler').attributes('style')).toContain('scaleX(0.1)')
    expect(wrapper.find('.vxp-slider__trigger').attributes('style')).toContain('left: 10%;')
  })

  it('move trigger', async () => {
    const onInput = vi.fn()
    const onChange = vi.fn()
    const wrapper = mount(() => <Slider onInput={onInput} onChange={onChange}></Slider>)
    const trigger = wrapper.find('.vxp-slider__trigger')
    const trackEl = wrapper.find('.vxp-slider__track').element as HTMLElement

    const trackMock = vi.spyOn(trackEl, 'getBoundingClientRect').mockImplementation(() => ({
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

    await toggleMove(wrapper.find('.vxp-slider').element as HTMLElement)
    expect(onInput).toHaveBeenCalled()
    expect(onInput).toHaveBeenCalledWith(40)
    expect(onChange).toHaveBeenCalled()
    expect(onChange).toHaveBeenCalledWith(40)

    expect(wrapper.find('.vxp-slider__filler').attributes('style')).toContain('scaleX(0.4)')
    expect(trigger.attributes('style')).toContain('left: 40%;')

    trackMock.mockRestore()
  })

  it('disabled', async () => {
    const onChange = vi.fn()
    const wrapper = mount(Slider, {
      props: { onChange }
    })

    expect(wrapper.classes()).not.toContain('vxp-slider--disabled')

    await wrapper.setProps({ disabled: true })
    expect(wrapper.classes()).toContain('vxp-slider--disabled')

    const trigger = wrapper.find('.vxp-slider__trigger')
    const trackEl = wrapper.find('.vxp-slider__track').element as HTMLElement

    const trackMock = vi.spyOn(trackEl, 'getBoundingClientRect').mockImplementation(() => ({
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

    await toggleMove(wrapper.find('.vxp-slider').element as HTMLElement)
    expect(onChange).not.toHaveBeenCalled()
    expect(trigger.attributes('style')).toContain('left: 0%;')

    trackMock.mockRestore()
  })

  it('state', () => {
    (['success', 'warning', 'error'] as const).forEach(state => {
      const wrapper = mount(() => <Slider state={state}></Slider>)

      expect(wrapper.find('.vxp-slider').classes()).toContain(`vxp-slider--${state}`)
    })
  })

  it('loading', async () => {
    const wrapper = mount(Slider)

    expect(wrapper.find('.vxp-slider__handler').classes()).not.toContain(
      'vxp-slider__handler--active'
    )

    await wrapper.setProps({ loading: true })
    expect(wrapper.find('.vxp-slider__handler').classes()).toContain('vxp-slider__handler--active')
  })

  it('loading lock', async () => {
    const wrapper = mount(Slider)

    expect(wrapper.classes()).not.toContain('vxp-slider--loading')

    await wrapper.setProps({ loading: true, loadingLock: true })
    expect(wrapper.classes()).toContain('vxp-slider--loading')
  })

  it('step', async () => {
    const wrapper = mount(() => <Slider step={5}></Slider>)
    const trigger = wrapper.find('.vxp-slider__trigger')
    const trackEl = wrapper.find('.vxp-slider__track').element as HTMLElement

    const trackMock = vi.spyOn(trackEl, 'getBoundingClientRect').mockImplementation(() => ({
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

    await toggleMove(wrapper.find('.vxp-slider').element as HTMLElement, 2)
    expect(trigger.attributes('style')).toContain('left: 0%;')

    await toggleMove(wrapper.find('.vxp-slider').element as HTMLElement, 3)
    expect(trigger.attributes('style')).toContain('left: 5%;')

    trackMock.mockRestore()
  })

  it('vertical', async () => {
    const wrapper = mount(() => <Slider vertical></Slider>)

    expect(wrapper.find('.vxp-slider').classes()).toContain('vxp-slider--vertical')

    const trigger = wrapper.find('.vxp-slider__trigger')
    const trackEl = wrapper.find('.vxp-slider__track').element as HTMLElement

    const trackMock = vi.spyOn(trackEl, 'getBoundingClientRect').mockImplementation(() => ({
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

    await toggleMove(wrapper.find('.vxp-slider').element as HTMLElement)
    expect(wrapper.find('.vxp-slider__filler').attributes('style')).toContain('scaleY(0.4)')
    expect(trigger.attributes('style')).toContain('top: 40%;')

    trackMock.mockRestore()
  })

  it('reverse', async () => {
    const onInput = vi.fn()
    const onChange = vi.fn()
    const wrapper = mount(() => <Slider reverse onInput={onInput} onChange={onChange}></Slider>)
    const trigger = wrapper.find('.vxp-slider__trigger')
    const trackEl = wrapper.find('.vxp-slider__track').element as HTMLElement

    const trackMock = vi.spyOn(trackEl, 'getBoundingClientRect').mockImplementation(() => ({
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

    await toggleMove(wrapper.find('.vxp-slider').element as HTMLElement, -40)
    expect(onInput).toHaveBeenCalled()
    expect(onInput).toHaveBeenCalledWith(40)
    expect(onChange).toHaveBeenCalled()
    expect(onChange).toHaveBeenCalledWith(40)

    expect(wrapper.find('.vxp-slider__filler').attributes('style')).toContain('scaleX(0.4)')
    expect(wrapper.find('.vxp-slider__filler').attributes('style')).toContain(
      'transform-origin: 100% 50%;'
    )
    expect(trigger.attributes('style')).toContain('right: 40%;')

    trackMock.mockRestore()
  })

  it('range', async () => {
    const onInput = vi.fn()
    const onChange = vi.fn()
    const wrapper = mount(() => (
      <Slider value={[20, 50]} range onInput={onInput} onChange={onChange}></Slider>
    ))

    const trackEl = wrapper.find('.vxp-slider__track').element as HTMLElement

    const trackMock = vi.spyOn(trackEl, 'getBoundingClientRect').mockImplementation(() => ({
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

    const triggers = wrapper.findAll('.vxp-slider__trigger')

    expect(triggers.length).toEqual(2)
    expect(wrapper.find('.vxp-slider__filler').attributes('style')).toContain('scaleX(0.3)')
    expect(wrapper.find('.vxp-slider__filler').attributes('style')).toContain('translateX(20%)')

    await toggleMove(wrapper.find('.vxp-slider').element as HTMLElement, 30)
    expect(onInput).toHaveBeenCalled()
    expect(onInput).toHaveBeenCalledWith([30, 50])
    expect(onChange).toHaveBeenCalled()
    expect(onChange).toHaveBeenCalledWith([30, 50])
    expect(wrapper.find('.vxp-slider__filler').attributes('style')).toContain('scaleX(0.2)')
    expect(wrapper.find('.vxp-slider__filler').attributes('style')).toContain('translateX(30%)')

    await toggleMove(wrapper.find('.vxp-slider').element as HTMLElement, 80)
    expect(onInput).toHaveBeenCalledWith([30, 80])
    expect(onChange).toHaveBeenCalledWith([30, 80])
    expect(wrapper.find('.vxp-slider__filler').attributes('style')).toContain('scaleX(0.5)')
    expect(wrapper.find('.vxp-slider__filler').attributes('style')).toContain('translateX(30%)')

    trackMock.mockRestore()
  })
})
