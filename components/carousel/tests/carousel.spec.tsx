import { CarouselItem } from '@/components/carousel-item'

import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'

import { Carousel } from '..'

import type { VueWrapper } from '@vue/test-utils'

vi.useFakeTimers()

async function doTransition(wrapper: VueWrapper<any>) {
  await nextTick()
  wrapper.vm.handleAfterMove()
  await nextTick()
  vi.runOnlyPendingTimers()
  await nextTick()
}

describe('Carousel', () => {
  it('render', () => {
    const wrapper = mount(() => (
      <Carousel>
        <CarouselItem>{'1'}</CarouselItem>
        <CarouselItem>{'2'}</CarouselItem>
        <CarouselItem>{'3'}</CarouselItem>
        <CarouselItem>{'4'}</CarouselItem>
      </Carousel>
    ))

    expect(wrapper.find('.vxp-carousel').classes()).toContain('vxp-carousel-vars')
    expect(wrapper.find('.vxp-carousel__list').exists()).toBe(true)
    expect(wrapper.find('.vxp-carousel__track').exists()).toBe(true)
    expect(wrapper.findAll('.vxp-carousel__handler').length).toEqual(2)

    const items = wrapper.findAll('.vxp-carousel__item')
    expect(items.length).toEqual(4)
    expect(items[0].text()).toEqual('1')
    expect(items[2].text()).toEqual('3')
  })

  it('active', async () => {
    const wrapper = mount(Carousel, {
      slots: {
        default: () => (
          <>
            <CarouselItem>{'1'}</CarouselItem>
            <CarouselItem>{'2'}</CarouselItem>
            <CarouselItem>{'3'}</CarouselItem>
            <CarouselItem>{'4'}</CarouselItem>
          </>
        )
      }
    })
    const items = wrapper.findAll('.vxp-carousel__item')

    await nextTick()
    await nextTick()
    expect(items[0].classes()).toContain('vxp-carousel__item--active')

    await wrapper.setProps({ active: 1 })
    expect(items[0].classes()).not.toContain('vxp-carousel__item--active')
    expect(items[1].classes()).toContain('vxp-carousel__item--active')
  })

  it('toggle handler', async () => {
    const onChange = vi.fn()
    const onPrev = vi.fn()
    const onNext = vi.fn()
    const wrapper = mount(Carousel, {
      props: {
        onChange,
        onPrev,
        onNext
      },
      slots: {
        default: () => (
          <>
            <CarouselItem>{'1'}</CarouselItem>
            <CarouselItem>{'2'}</CarouselItem>
            <CarouselItem>{'3'}</CarouselItem>
            <CarouselItem>{'4'}</CarouselItem>
          </>
        )
      }
    })
    const items = wrapper.findAll('.vxp-carousel__item')
    const handlers = wrapper.findAll('.vxp-carousel__handler')

    await nextTick()
    await nextTick()
    expect(handlers[0].classes()).toContain('vxp-carousel__handler--disabled')
    expect(handlers[1].classes()).not.toContain('vxp-carousel__handler--disabled')

    await handlers[1].trigger('click')
    await doTransition(wrapper)
    expect(items[0].classes()).not.toContain('vxp-carousel__item--active')
    expect(items[1].classes()).toContain('vxp-carousel__item--active')
    expect(onNext).toHaveBeenCalled()
    expect(onNext).toHaveBeenCalledWith(1)
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenLastCalledWith(1)
    expect(handlers[0].classes()).not.toContain('vxp-carousel__handler--disabled')
    expect(handlers[1].classes()).toContain('vxp-carousel__handler--disabled')

    await handlers[0].trigger('click')
    await doTransition(wrapper)
    expect(items[0].classes()).toContain('vxp-carousel__item--active')
    expect(items[1].classes()).not.toContain('vxp-carousel__item--active')
    expect(onPrev).toHaveBeenCalled()
    expect(onPrev).toHaveBeenCalledWith(0)
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenLastCalledWith(0)
    expect(handlers[0].classes()).toContain('vxp-carousel__handler--disabled')
    expect(handlers[1].classes()).not.toContain('vxp-carousel__handler--disabled')
  })

  it('loop', async () => {
    const wrapper = mount(Carousel, {
      props: { loop: true },
      slots: {
        default: () => (
          <>
            <CarouselItem>{'1'}</CarouselItem>
            <CarouselItem>{'2'}</CarouselItem>
            <CarouselItem>{'3'}</CarouselItem>
            <CarouselItem>{'4'}</CarouselItem>
          </>
        )
      }
    })
    const items = wrapper.findAll('.vxp-carousel__item')
    const handlers = wrapper.findAll('.vxp-carousel__handler')

    await nextTick()
    await nextTick()
    await handlers[0].trigger('click')
    await doTransition(wrapper)
    expect(items[3].classes()).toContain('vxp-carousel__item--active')

    await handlers[1].trigger('click')
    await doTransition(wrapper)
    expect(items[0].classes()).toContain('vxp-carousel__item--active')
  })

  it('auto play', async () => {
    const wrapper = mount(Carousel, {
      props: { autoplay: true },
      slots: {
        default: () => (
          <>
            <CarouselItem>{'1'}</CarouselItem>
            <CarouselItem>{'2'}</CarouselItem>
            <CarouselItem>{'3'}</CarouselItem>
            <CarouselItem>{'4'}</CarouselItem>
          </>
        )
      }
    })
    const items = wrapper.findAll('.vxp-carousel__item')

    await nextTick()
    await nextTick()
    expect(items[0].classes()).toContain('vxp-carousel__item--active')

    vi.runOnlyPendingTimers()
    await nextTick()
    wrapper.vm.handleAfterMove()
    await nextTick()
    vi.runOnlyPendingTimers()
    await nextTick()
    expect(items[1].classes()).toContain('vxp-carousel__item--active')
  })

  it('disabled', () => {
    const wrapper = mount(() => <Carousel disabled></Carousel>)

    expect(wrapper.find('.vxp-carousel').classes()).toContain('vxp-carousel--disabled')
  })

  it('vertical', () => {
    const wrapper = mount(() => <Carousel vertical></Carousel>)

    expect(wrapper.find('.vxp-carousel').classes()).toContain('vxp-carousel--vertical')
  })

  it('pointer', async () => {
    const wrapper = mount(() => (
      <Carousel pointer={'inside'}>
        <CarouselItem>{'1'}</CarouselItem>
        <CarouselItem>{'2'}</CarouselItem>
      </Carousel>
    ))

    await nextTick()
    expect(wrapper.find('.vxp-carousel__pointers--inside').exists()).toBe(true)
    expect(wrapper.findAll('.vxp-carousel__pointer').length).toEqual(2)
  })

  it('active offset', async () => {
    const wrapper = mount(() => (
      <Carousel active-offset={1}>
        <CarouselItem>{'1'}</CarouselItem>
        <CarouselItem>{'2'}</CarouselItem>
        <CarouselItem>{'3'}</CarouselItem>
        <CarouselItem>{'4'}</CarouselItem>
      </Carousel>
    ))
    const items = wrapper.findAll('.vxp-carousel__item')

    await nextTick()
    await nextTick()
    expect(items[0].classes()).not.toContain('vxp-carousel__item--active')
    expect(items[1].classes()).toContain('vxp-carousel__item--active')
  })
})
