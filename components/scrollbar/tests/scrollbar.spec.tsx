import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { noop } from '@vexip-ui/utils'
import { Scrollbar } from '..'

vi.useFakeTimers()

function nextFrame() {
  return new Promise(resolve => requestAnimationFrame(resolve))
}

describe('Scrollbar', () => {
  it('render', () => {
    const wrapper = mount(Scrollbar)

    expect(wrapper.classes()).toContain('vxp-scrollbar-vars')
    expect(wrapper.find('.vxp-scrollbar__track').exists()).toBe(true)
    expect(wrapper.find('.vxp-scrollbar__bar').exists()).toBe(true)
  })

  it('placement', () => {
    (['top', 'right', 'bottom', 'left'] as const).forEach(placement => {
      const wrapper = mount(() => <Scrollbar placement={placement}></Scrollbar>)

      expect(wrapper.find('.vxp-scrollbar').classes()).toContain(`vxp-scrollbar--${placement}`)

      if (placement === 'right' || placement === 'left') {
        expect(wrapper.find('.vxp-scrollbar__bar').attributes('style')).toContain('height: 35%;')
      } else {
        expect(wrapper.find('.vxp-scrollbar__bar').attributes('style')).toContain('width: 35%;')
      }
    })
  })

  it('bar length', () => {
    const wrapper = mount(() => <Scrollbar bar-length={20}></Scrollbar>)

    expect(wrapper.find('.vxp-scrollbar__bar').attributes('style')).toContain('height: 20%;')
  })

  it('disabled', () => {
    const wrapper = mount(() => <Scrollbar disabled></Scrollbar>)

    expect(wrapper.find('.vxp-scrollbar').classes()).toContain('vxp-scrollbar--disabled')
  })

  it('init value', () => {
    const wrapper = mount(Scrollbar, {
      props: {
        barLength: 20,
        scroll: 20
      }
    })

    expect(wrapper.find('.vxp-scrollbar__bar').attributes('style')).toContain(
      'transform: translate3d(0, 80%, 0);'
    )
  })

  it('scroll', () => {
    const onScrollStart = vi.fn()
    const onScroll = vi.fn()
    const onScrollEnd = vi.fn()
    const wrapper = mount(Scrollbar, {
      props: {
        barLength: 20,
        onScrollStart,
        onScroll,
        onScrollEnd
      }
    })
    const trackEl = wrapper.find('.vxp-scrollbar__track').element as HTMLElement
    const barEl = wrapper.find('.vxp-scrollbar__bar').element as HTMLElement

    const trackMock = vi.spyOn(trackEl, 'getBoundingClientRect').mockImplementation(() => ({
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      width: 0,
      height: 100,
      right: 0,
      bottom: 0,
      toJSON: noop
    }))
    const barMock = vi.spyOn(barEl, 'getBoundingClientRect').mockImplementation(() => ({
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      width: 0,
      height: 20,
      right: 0,
      bottom: 0,
      toJSON: noop
    }))

    const downEvent = new CustomEvent('pointerdown') as any
    downEvent.button = 0
    downEvent.clientX = 0
    downEvent.clientY = 0
    barEl.dispatchEvent(downEvent)
    expect(onScrollStart).toHaveBeenCalled()
    expect(onScrollStart).toHaveBeenCalledWith(0)

    const moveEvent = new CustomEvent('pointermove') as any
    moveEvent.clientX = 40
    moveEvent.clientY = 40
    document.dispatchEvent(moveEvent)
    vi.runAllTimers()
    expect(onScroll).toHaveBeenCalled()
    expect(onScroll).toHaveBeenCalledWith(50)

    const upEvent = new CustomEvent('pointerup') as any
    document.dispatchEvent(upEvent)
    expect(onScrollEnd).toHaveBeenCalled()
    expect(onScrollEnd).toHaveBeenCalledWith(50)

    trackMock.mockRestore()
    barMock.mockRestore()
  })

  it('track', async () => {
    const onScrollStart = vi.fn()
    const onScroll = vi.fn()
    const onScrollEnd = vi.fn()
    const wrapper = mount(Scrollbar, {
      props: {
        barLength: 20,
        trackSpeed: 2,
        onScrollStart,
        onScroll,
        onScrollEnd
      }
    })
    const trackEl = wrapper.find('.vxp-scrollbar__track').element as HTMLElement
    const barEl = wrapper.find('.vxp-scrollbar__bar').element as HTMLElement

    const trackMock = vi.spyOn(trackEl, 'getBoundingClientRect').mockImplementation(() => ({
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      width: 0,
      height: 100,
      right: 0,
      bottom: 0,
      toJSON: noop
    }))
    const barMock = vi.spyOn(barEl, 'getBoundingClientRect').mockImplementation(() => ({
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      width: 0,
      height: 20,
      right: 0,
      bottom: 0,
      toJSON: noop
    }))

    const downEvent = new CustomEvent('pointerdown') as any
    downEvent.button = 0
    downEvent.clientX = 45
    downEvent.clientY = 45
    trackEl.dispatchEvent(downEvent)
    expect(onScrollStart).toHaveBeenCalled()
    expect(onScrollStart).toHaveBeenCalledWith(0)

    // 50 - 0 < (2 + 1) * 20
    // truthSpeed = 1 + (2 * 0.25) * trackSpeed
    expect(onScroll).toHaveBeenCalled()
    expect(onScroll).toHaveBeenLastCalledWith(3)

    await nextFrame()
    expect(onScroll).toHaveBeenLastCalledWith(6)

    await nextFrame()
    await nextFrame()
    expect(onScroll).toHaveBeenLastCalledWith(12)

    // 50 - 12 < (1 + 1) * 20
    // truthSpeed = 1 + (1 * 0.25) * trackSpeed
    await nextFrame()
    expect(onScroll).toHaveBeenLastCalledWith(14.5)

    const upEvent = new CustomEvent('pointerup') as any
    document.dispatchEvent(upEvent)
    expect(onScrollEnd).toHaveBeenCalled()
    expect(onScrollEnd).toHaveBeenCalledWith(14.5)

    trackMock.mockRestore()
    barMock.mockRestore()
  })
})
