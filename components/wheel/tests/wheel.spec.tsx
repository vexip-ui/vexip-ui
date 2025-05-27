import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'

import { Wheel } from '..'

vi.useFakeTimers()

const OPTIONS = Array.from({ length: 20 }, (_, i) => `Option ${i + 1}`)

async function runScrollTimers() {
  vi.runOnlyPendingTimers()
  await nextTick()
  vi.runOnlyPendingTimers()
  await nextTick()
}

describe('Wheel', () => {
  it('render', async () => {
    const wrapper = mount(() => <Wheel></Wheel>)

    expect(wrapper.classes()).toContain('vxp-wheel-vars')
    expect(wrapper.find('.vxp-wheel__list').exists()).toBe(true)
    expect(wrapper.find('.vxp-wheel__mask').exists()).toBe(true)
    expect(wrapper.find('.vxp-wheel__border').exists()).toBe(true)
  })

  it('options', async () => {
    const wrapper = mount(() => <Wheel options={OPTIONS}></Wheel>)

    await runScrollTimers()
    const items = wrapper.findAll('.vxp-wheel__item')

    expect(items.length).toEqual(OPTIONS.length)
    items.forEach((item, i) => {
      expect(item.text()).toEqual(OPTIONS[i])
    })
  })

  it('value', async () => {
    const wrapper = mount(Wheel, {
      props: { options: OPTIONS },
    })

    await runScrollTimers()
    const items = wrapper.findAll('.vxp-wheel__item')

    expect(items[0].classes()).toContain('vxp-wheel__item--active')

    await wrapper.setProps({ value: OPTIONS[2] })
    await nextTick()
    expect(items[0].classes()).not.toContain('vxp-wheel__item--active')
    expect(items[2].classes()).toContain('vxp-wheel__item--active')
  })

  it('disabled', () => {
    const wrapper = mount(() => <Wheel disabled></Wheel>)

    expect(wrapper.find('.vxp-wheel').classes()).toContain('vxp-wheel--disabled')
  })

  it('arrow', async () => {
    const wrapper = mount(Wheel, {
      props: { arrow: true, options: OPTIONS },
    })

    await runScrollTimers()
    const items = wrapper.findAll('.vxp-wheel__item')

    expect(wrapper.find('.vxp-wheel__arrow').exists()).toBe(true)
    expect(wrapper.find('.vxp-wheel__arrow--prev').exists()).toBe(true)
    expect(wrapper.find('.vxp-wheel__arrow--prev').classes()).toContain(
      'vxp-wheel__arrow--disabled',
    )
    expect(wrapper.find('.vxp-wheel__arrow--next').exists()).toBe(true)
    expect(wrapper.find('.vxp-wheel__arrow--next').classes()).not.toContain(
      'vxp-wheel__arrow--disabled',
    )

    await wrapper.find('.vxp-wheel__arrow--next').trigger('click')
    expect(items[1].classes()).toContain('vxp-wheel__item--active')
    expect(wrapper.find('.vxp-wheel__arrow--prev').classes()).not.toContain(
      'vxp-wheel__arrow--disabled',
    )
    expect(wrapper.find('.vxp-wheel__arrow--next').classes()).not.toContain(
      'vxp-wheel__arrow--disabled',
    )

    await wrapper.find('.vxp-wheel__arrow--prev').trigger('click')
    expect(items[0].classes()).toContain('vxp-wheel__item--active')

    await wrapper.setProps({ value: OPTIONS.at(-1) })
    await nextTick()
    expect(wrapper.find('.vxp-wheel__arrow--prev').classes()).not.toContain(
      'vxp-wheel__arrow--disabled',
    )
    expect(wrapper.find('.vxp-wheel__arrow--next').classes()).toContain(
      'vxp-wheel__arrow--disabled',
    )
  })

  it('arrow events', async () => {
    const onPrev = vi.fn()
    const onNext = vi.fn()
    const wrapper = mount(Wheel, {
      props: {
        arrow: true,
        options: OPTIONS,
        onPrev,
        onNext,
      },
    })

    await runScrollTimers()
    await wrapper.find('.vxp-wheel__arrow--next').trigger('click')
    expect(onNext).toHaveBeenCalled()

    await wrapper.find('.vxp-wheel__arrow--prev').trigger('click')
    expect(onPrev).toHaveBeenCalled()
  })

  it('item disabled', async () => {
    const disabledItem = vi.fn((value: string) => value === '5')
    const wrapper = mount(Wheel, {
      props: {
        disabledItem,
        arrow: true,
        options: [
          { value: '1' },
          { value: '2', disabled: true },
          { value: '3' },
          { value: '4', disabled: true },
          { value: '5' },
        ],
      },
    })

    await runScrollTimers()
    const items = wrapper.findAll('.vxp-wheel__item')
    expect(items[1].classes()).toContain('vxp-wheel__item--disabled')
    expect(items[3].classes()).toContain('vxp-wheel__item--disabled')
    expect(items[4].classes()).toContain('vxp-wheel__item--disabled')

    await wrapper.find('.vxp-wheel__arrow--next').trigger('click')
    expect(items[2].classes()).toContain('vxp-wheel__item--active')
    expect(wrapper.find('.vxp-wheel__arrow--next').classes()).toContain(
      'vxp-wheel__arrow--disabled',
    )

    await wrapper.find('.vxp-wheel__arrow--next').trigger('click')
    expect(items[2].classes()).toContain('vxp-wheel__item--active')
  })

  it('no mask when candidate = 0', () => {
    const wrapper = mount(() => <Wheel candidate={0}></Wheel>)

    expect(wrapper.find('.vxp-wheel__mask').exists()).toBe(false)
  })

  it('horizontal', () => {
    const wrapper = mount(() => <Wheel horizontal></Wheel>)

    expect(wrapper.find('.vxp-wheel').classes()).toContain('vxp-wheel--horizontal')
    expect(wrapper.find('.vxp-wheel__border').classes()).toContain('vxp-wheel__border--vertical')
  })

  it('selectable', async () => {
    const onChange = vi.fn()
    const wrapper = mount(Wheel, {
      props: { selectable: true, options: OPTIONS, onChange },
    })

    await runScrollTimers()
    const items = wrapper.findAll('.vxp-wheel__item')

    await items[2].trigger('click')
    expect(items[2].classes()).toContain('vxp-wheel__item--active')
    expect(onChange).toHaveBeenCalled()
    expect(onChange).toHaveBeenCalledWith(OPTIONS[2], OPTIONS[2])
  })
})
