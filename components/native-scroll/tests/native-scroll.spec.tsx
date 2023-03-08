import { afterEach, describe, it, expect, vi } from 'vitest'
import { nextTick } from 'vue'
import { noop } from '@vexip-ui/utils'
import { mount } from '@vue/test-utils'
import { NativeScroll } from '..'

import type { VueWrapper } from '@vue/test-utils'

vi.useFakeTimers()

const TEXT = 'TEXT'

function emitWheel(el: HTMLElement, type: 'top' | 'bottom', shift = false) {
  const event = new CustomEvent('wheel') as any
  event.deltaY = type === 'top' ? -1 : 1
  event.shiftKey = shift

  el.dispatchEvent(event)
}

describe('NativeScroll', () => {
  const mocked: Array<ReturnType<typeof vi.spyOn>> = []

  function mockOffsetWidth(el: HTMLElement, value: number) {
    mocked.push(vi.spyOn(el, 'offsetWidth', 'get').mockReturnValue(value))
  }

  function mockOffsetHeight(el: HTMLElement, value: number) {
    mocked.push(vi.spyOn(el, 'offsetHeight', 'get').mockReturnValue(value))
  }

  function mockScrollWidth(el: HTMLElement, value: number) {
    Object.defineProperty(el, 'scrollWidth', {
      configurable: true,
      value
    })
  }

  function mockScrollHeight(el: HTMLElement, value: number) {
    Object.defineProperty(el, 'scrollHeight', {
      configurable: true,
      value
    })
  }

  let wrapper: VueWrapper<any> | null

  async function createScroll(props: InstanceType<typeof NativeScroll>['$props'] = {}) {
    const scroll = mount(NativeScroll, {
      props: {
        mode: 'both',
        width: 200,
        height: 200,
        ...props
      },
      slots: {
        default: () => <span class={'content'}>{TEXT}</span>
      }
    })

    const contentEl = scroll.find('.vxp-native-scroll__wrapper').element as HTMLElement

    mockOffsetWidth(contentEl, 200)
    mockOffsetHeight(contentEl, 200)
    mockScrollWidth(contentEl, 400)
    mockScrollHeight(contentEl, 400)

    let top = 0
    let left = 0

    Object.defineProperty(contentEl, 'scrollTop', {
      configurable: true,
      get: () => top,
      set: v => (top = v)
    })
    Object.defineProperty(contentEl, 'scrollLeft', {
      configurable: true,
      get: () => left,
      set: v => (left = v)
    })
    ;(scroll.vm as any).refresh()
    vi.runAllTimers()
    await nextTick()

    return scroll
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
    const wrapper = mount(() => (
      <NativeScroll>
        <span class={'content'}>{TEXT}</span>
      </NativeScroll>
    ))

    expect(wrapper.find('.vxp-native-scroll').classes()).toContain('vxp-native-scroll--vertical')
    expect(wrapper.find('.vxp-native-scroll__wrapper').exists()).toBe(true)
    expect(wrapper.find('.content').exists()).toBe(true)
    expect(wrapper.find('.content').text()).toEqual(TEXT)
  })

  it('scroll class', () => {
    const wrapper = mount(() => <NativeScroll scroll-class={'test'}></NativeScroll>)

    expect(wrapper.find('.vxp-native-scroll__wrapper').classes()).toContain('test')
  })

  it('use bar', () => {
    const wrapper = mount(() => <NativeScroll use-x-bar use-y-bar></NativeScroll>)

    expect(wrapper.find('.vxp-native-scroll__bar--horizontal').exists()).toBe(true)
    expect(wrapper.find('.vxp-native-scroll__bar--vertical').exists()).toBe(true)
  })

  it('scroll tag', () => {
    const wrapper = mount(() => <NativeScroll scroll-tag={'ul'}></NativeScroll>)

    expect(wrapper.find('.vxp-native-scroll__wrapper').element.tagName).toBe('UL')
  })

  it('bar class', () => {
    const wrapper = mount(() => <NativeScroll use-y-bar bar-class={'test'}></NativeScroll>)

    expect(wrapper.find('.vxp-native-scroll__bar--vertical').classes()).toContain('test')
  })

  it('enabled change events', async () => {
    const onXEnabledChange = vi.fn()
    const onYEnabledChange = vi.fn()
    wrapper = await createScroll({
      onXEnabledChange,
      onYEnabledChange
    })
    const contentEl = wrapper.find('.vxp-native-scroll__wrapper').element as HTMLElement

    onXEnabledChange.mockClear()
    onYEnabledChange.mockClear()

    mockScrollWidth(contentEl, 200)
    mockScrollHeight(contentEl, 200)

    wrapper.vm.refresh()
    vi.runAllTimers()
    await nextTick()

    expect(onXEnabledChange).toHaveBeenCalled()
    expect(onYEnabledChange).toHaveBeenCalled()
  })

  it('wheel event', async () => {
    const onWheel = vi.fn()
    wrapper = await createScroll({
      onWheel
    })
    const wrapperEl = wrapper.element as HTMLElement

    emitWheel(wrapperEl, 'bottom')
    expect(onWheel).toHaveBeenCalled()

    emitWheel(wrapperEl, 'bottom', true)
    expect(onWheel).toHaveBeenCalledTimes(2)
  })

  it('scroll event', async () => {
    const onScroll = vi.fn()
    wrapper = await createScroll({
      onScroll
    })
    const contentEl = wrapper.find('.vxp-native-scroll__wrapper').element as HTMLElement

    contentEl.dispatchEvent(new Event('scroll'))
    expect(onScroll).toHaveBeenCalled()
  })

  it('pointer scroll', async () => {
    const onScrollStart = vi.fn()
    const onScroll = vi.fn()
    const onScrollEnd = vi.fn()
    wrapper = await createScroll({
      pointer: true,
      onScrollStart,
      onScroll,
      onScrollEnd
    })
    const wrapperEl = wrapper.element as HTMLElement

    const downEvent = new CustomEvent('mousedown') as any
    downEvent.button = 0
    downEvent.clientX = 100
    downEvent.clientY = 100
    wrapperEl.dispatchEvent(downEvent)
    expect(onScrollStart).toHaveBeenCalled()
    expect(onScrollStart).toHaveBeenCalledWith(expect.objectContaining({ clientX: 0, clientY: 0 }))

    const moveEvent = new CustomEvent('mousemove') as any
    moveEvent.clientX = 60
    moveEvent.clientY = 60
    document.dispatchEvent(moveEvent)
    expect(onScroll).toHaveBeenCalled()
    expect(onScroll).toHaveBeenCalledWith(expect.objectContaining({ clientX: 40, clientY: 40 }))

    const upEvent = new CustomEvent('mouseup') as any
    document.dispatchEvent(upEvent)
    await nextTick()
    expect(onScrollEnd).toHaveBeenCalled()
    expect(onScrollEnd).toHaveBeenCalledWith(expect.objectContaining({ clientX: 40, clientY: 40 }))
  })

  it('auto play', async () => {
    wrapper = await createScroll({
      mode: 'vertical',
      autoplay: true
    })

    vi.runAllTimers()
    expect(wrapper.vm.currentScroll.y !== 0).toBe(true)
  })

  it('using bar', async () => {
    const onBarScrollStart = vi.fn()
    const onBarScroll = vi.fn()
    const onBarScrollEnd = vi.fn()
    wrapper = await createScroll({
      mode: 'vertical',
      useYBar: true,
      onBarScrollStart,
      onBarScroll,
      onBarScrollEnd
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
      height: 100,
      right: 0,
      bottom: 0,
      toJSON: noop
    }))

    const downEvent = new CustomEvent('pointerdown') as any
    downEvent.button = 0
    downEvent.clientX = 0
    downEvent.clientY = 0
    barEl.dispatchEvent(downEvent)
    expect(onBarScrollStart).toHaveBeenCalled()
    expect(onBarScrollStart).toHaveBeenCalledWith(expect.objectContaining({ percentY: 0 }))

    const moveEvent = new CustomEvent('pointermove') as any
    moveEvent.clientX = 20
    moveEvent.clientY = 20
    document.dispatchEvent(moveEvent)
    vi.runAllTimers()
    expect(onBarScroll).toHaveBeenCalled()
    expect(onBarScroll).toHaveBeenCalledWith(expect.objectContaining({ percentY: 40 }))

    const upEvent = new CustomEvent('pointerup') as any
    document.dispatchEvent(upEvent)
    expect(onBarScrollEnd).toHaveBeenCalled()
    expect(onBarScrollEnd).toHaveBeenCalledWith(expect.objectContaining({ percentY: 40 }))

    trackMock.mockRestore()
    barMock.mockRestore()
  })
})
