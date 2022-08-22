import { afterEach, describe, it, expect, vi } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { noop } from '@vexip-ui/utils'
import { Scroll } from '..'

vi.useFakeTimers()

const TEXT = 'TEXT'

async function runScrollTimers() {
  vi.runAllTimers()
  await nextTick()
  vi.runAllTimers()
  await nextTick()
}

function emitWheel(el: HTMLElement, type: 'top' | 'bottom', shift = false) {
  const event = new CustomEvent('wheel') as any
  event.deltaY = type === 'top' ? -1 : 1
  event.shiftKey = shift

  el.dispatchEvent(event)
}

describe('Scroll', () => {
  const mocked: Array<ReturnType<typeof vi.spyOn>> = []

  function mockOffsetWidth(el: HTMLElement, value: number) {
    mocked.push(vi.spyOn(el, 'offsetWidth', 'get').mockReturnValue(value))
  }

  function mockOffsetHeight(el: HTMLElement, value: number) {
    mocked.push(vi.spyOn(el, 'offsetHeight', 'get').mockReturnValue(value))
  }

  let wrapper: ReturnType<typeof createScroll> | null

  function createScroll(props: InstanceType<typeof Scroll>['$props'] = {}) {
    const scroll = mount(Scroll, {
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

    const contentEl = scroll.find('.vxp-scroll__wrapper').element as HTMLElement

    mockOffsetWidth(contentEl, 400)
    mockOffsetHeight(contentEl, 400)

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
      <Scroll>
        <span class={'content'}>{TEXT}</span>
      </Scroll>
    ))

    expect(wrapper.find('.vxp-scroll').classes()).toContain('vxp-scroll-vars')
    expect(wrapper.find('.vxp-scroll').classes()).toContain('vxp-scroll--vertical')
    expect(wrapper.find('.vxp-scroll__wrapper').exists()).toBe(true)
    expect(wrapper.find('.content').exists()).toBe(true)
    expect(wrapper.find('.content').text()).toEqual(TEXT)
  })

  it('scroll class', () => {
    const wrapper = mount(() => <Scroll scroll-class={'test'}></Scroll>)

    expect(wrapper.find('.vxp-scroll__wrapper').classes()).toContain('test')
  })

  it('use bar', () => {
    const wrapper = mount(() => <Scroll use-x-bar use-y-bar></Scroll>)

    expect(wrapper.find('.vxp-scroll__bar--horizontal').exists()).toBe(true)
    expect(wrapper.find('.vxp-scroll__bar--vertical').exists()).toBe(true)
  })

  it('wrapper tag', () => {
    const wrapper = mount(() => <Scroll wrapper-tag={'ul'}></Scroll>)

    expect(wrapper.find('.vxp-scroll__wrapper').element.tagName).toBe('UL')
  })

  it('bar class', () => {
    const wrapper = mount(() => <Scroll use-y-bar bar-class={'test'}></Scroll>)

    expect(wrapper.find('.vxp-scroll__bar--vertical').classes()).toContain('test')
  })

  it('ready event', async () => {
    const onReady = vi.fn()
    mount(() => <Scroll onReady={onReady}></Scroll>)

    await runScrollTimers()
    expect(onReady).toHaveBeenCalledTimes(1)
  })

  it('enabled change events', async () => {
    const onXEnabledChange = vi.fn()
    const onYEnabledChange = vi.fn()
    wrapper = createScroll({
      onXEnabledChange,
      onYEnabledChange
    })
    const contentEl = wrapper.find('.vxp-scroll__wrapper').element as HTMLElement

    await runScrollTimers()

    onXEnabledChange.mockClear()
    onYEnabledChange.mockClear()

    mockOffsetWidth(contentEl, 200)
    mockOffsetHeight(contentEl, 200)

    wrapper.vm.refresh()
    await runScrollTimers()

    expect(onXEnabledChange).toHaveBeenCalled()
    expect(onYEnabledChange).toHaveBeenCalled()
  })

  it('wheel scroll', async () => {
    const onWheel = vi.fn()
    const onScroll = vi.fn()
    wrapper = createScroll({
      onWheel,
      onScroll
    })
    const wrapperEl = wrapper.element as HTMLElement

    await runScrollTimers()
    emitWheel(wrapperEl, 'bottom')
    expect(onWheel).toHaveBeenCalled()
    expect(onScroll).toHaveBeenCalled()

    emitWheel(wrapperEl, 'bottom', true)
    expect(onWheel).toHaveBeenCalledTimes(2)
    expect(onScroll).toHaveBeenCalledTimes(2)
  })

  it('wheel delta', async () => {
    const onWheel = vi.fn()
    wrapper = createScroll({
      deltaX: 50,
      deltaY: 50,
      onWheel
    })
    const wrapperEl = wrapper.element as HTMLElement

    await runScrollTimers()
    emitWheel(wrapperEl, 'bottom')
    expect(onWheel).toHaveBeenLastCalledWith(expect.objectContaining({ clientY: 50 }))

    emitWheel(wrapperEl, 'bottom', true)
    expect(onWheel).toHaveBeenLastCalledWith(expect.objectContaining({ clientX: 50 }))
  })

  it('pointer scroll', async () => {
    const onScrollStart = vi.fn()
    const onScroll = vi.fn()
    const onScrollEnd = vi.fn()
    wrapper = createScroll({
      pointer: true,
      onScrollStart,
      onScroll,
      onScrollEnd
    })
    const wrapperEl = wrapper.element as HTMLElement

    await runScrollTimers()

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
    wrapper = createScroll({
      mode: 'vertical',
      autoplay: true
    })

    await runScrollTimers()
    expect(wrapper.vm.currentScroll.y !== 0).toBe(true)
  })

  it('using bar', async () => {
    const onBarScrollStart = vi.fn()
    const onBarScroll = vi.fn()
    const onBarScrollEnd = vi.fn()
    wrapper = createScroll({
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

    await runScrollTimers()

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
