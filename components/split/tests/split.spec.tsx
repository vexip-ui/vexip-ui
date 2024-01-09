import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'

import { Split } from '..'

vi.useFakeTimers()

async function toggleStartAndMove(el: HTMLElement, value = 40) {
  const downEvent = new CustomEvent('pointerdown') as any
  downEvent.button = 0
  downEvent.clientX = 0
  downEvent.clientY = 0
  el.dispatchEvent(downEvent)
  await nextTick()

  const moveEvent = new CustomEvent('pointermove') as any
  moveEvent.clientX = value
  moveEvent.clientY = value
  document.dispatchEvent(moveEvent)
  vi.runOnlyPendingTimers()
  await nextTick()
}

async function toggleMoveEnd() {
  const upEvent = new CustomEvent('pointerup') as any
  document.dispatchEvent(upEvent)
}

describe('Split', () => {
  it('render', () => {
    const wrapper = mount(() => (
      <Split>
        {{
          left: () => 'left',
          right: () => 'right'
        }}
      </Split>
    ))

    expect(wrapper.find('.vxp-split').classes()).toContain('vxp-split-vars')
    expect(wrapper.findAll('.vxp-split__panel').length).toEqual(2)
    expect(wrapper.find('.vxp-split__panel--left').text()).toEqual('left')
    expect(wrapper.find('.vxp-split__panel--left').attributes('style')).toContain('right: 50%;')
    expect(wrapper.find('.vxp-split__panel--right').text()).toEqual('right')
    expect(wrapper.find('.vxp-split__panel--right').attributes('style')).toContain('left: 50%;')
    expect(wrapper.find('.vxp-split__trigger').exists()).toBe(true)
    expect(wrapper.find('.vxp-split__handler').exists()).toBe(true)
  })

  it('vertical', () => {
    const wrapper = mount(() => (
      <Split vertical>
        {{
          left: () => 'top',
          right: () => 'bottom'
        }}
      </Split>
    ))

    expect(wrapper.find('.vxp-split__panel--top').text()).toEqual('top')
    expect(wrapper.find('.vxp-split__panel--top').attributes('style')).toContain('bottom: 50%;')
    expect(wrapper.find('.vxp-split__panel--bottom').text()).toEqual('bottom')
    expect(wrapper.find('.vxp-split__panel--bottom').attributes('style')).toContain('top: 50%;')
  })

  it('value', async () => {
    const wrapper = mount(Split, {
      props: {
        value: 0.6
      },
      slots: {
        left: () => 'left',
        right: () => 'right'
      }
    })

    expect(wrapper.find('.vxp-split__panel--left').attributes('style')).toContain('right: 40%;')
    expect(wrapper.find('.vxp-split__panel--right').attributes('style')).toContain('left: 60%;')

    await wrapper.setProps({ value: 0.4 })
    expect(wrapper.find('.vxp-split__panel--left').attributes('style')).toContain('right: 60%;')
    expect(wrapper.find('.vxp-split__panel--right').attributes('style')).toContain('left: 40%;')
  })

  it('toggle adjust', async () => {
    const onMoveStart = vi.fn()
    const onMove = vi.fn()
    const onMoveEnd = vi.fn()
    const onChange = vi.fn()
    const wrapper = mount(Split, {
      props: {
        onMoveStart,
        onMove,
        onMoveEnd,
        onChange
      },
      slots: {
        left: () => 'left',
        right: () => 'right'
      }
    })
    const handler = wrapper.find('.vxp-split__handler').element as HTMLElement

    Object.defineProperty(wrapper.element, 'offsetWidth', {
      configurable: true,
      get: () => 400
    })

    await nextTick()
    await toggleStartAndMove(handler)
    expect(wrapper.find('.vxp-split__panel--left').attributes('style')).toContain('right: 40%;')
    expect(wrapper.find('.vxp-split__panel--right').attributes('style')).toContain('left: 60%;')
    expect(onMoveStart).toHaveBeenCalledTimes(1)
    expect(onMoveStart).toHaveBeenCalledWith(0.5)
    expect(onMove).toHaveBeenCalledTimes(1)
    expect(onMove).toHaveBeenCalledWith(0.6)
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(0.6)

    await toggleMoveEnd()
    expect(onMoveEnd).toHaveBeenCalledTimes(1)
    expect(onMoveEnd).toHaveBeenCalledWith(0.6)
  })

  it('adjust with lazy', async () => {
    const onChange = vi.fn()
    const wrapper = mount(Split, {
      props: {
        lazy: true,
        onChange
      },
      slots: {
        left: () => 'left',
        right: () => 'right'
      }
    })
    const handler = wrapper.find('.vxp-split__handler').element as HTMLElement

    Object.defineProperty(wrapper.element, 'offsetWidth', {
      configurable: true,
      get: () => 400
    })

    await nextTick()
    await toggleStartAndMove(handler)
    expect(wrapper.find('.vxp-split__panel--left').attributes('style')).toContain('right: 50%;')
    expect(wrapper.find('.vxp-split__panel--right').attributes('style')).toContain('left: 50%;')
    expect(wrapper.find('.vxp-split__guide').exists()).toBe(true)
    expect(wrapper.find('.vxp-split__guide').attributes('style')).toContain('left: 60%;')
    expect(onChange).not.toHaveBeenCalled()

    await toggleMoveEnd()
    expect(wrapper.find('.vxp-split__panel--left').attributes('style')).toContain('right: 40%;')
    expect(wrapper.find('.vxp-split__panel--right').attributes('style')).toContain('left: 60%;')
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(0.6)
  })

  it('min and max', async () => {
    const wrapper = mount(Split, {
      props: {
        min: 0.4,
        max: 0.6
      },
      slots: {
        left: () => 'left',
        right: () => 'right'
      }
    })
    const handler = wrapper.find('.vxp-split__handler').element as HTMLElement

    Object.defineProperty(wrapper.element, 'offsetWidth', {
      configurable: true,
      get: () => 400
    })

    await nextTick()
    await toggleStartAndMove(handler, 80)
    expect(wrapper.find('.vxp-split__panel--left').attributes('style')).toContain('right: 40%;')
    expect(wrapper.find('.vxp-split__panel--right').attributes('style')).toContain('left: 60%;')

    await toggleMoveEnd()
    await toggleStartAndMove(handler, -160)
    expect(wrapper.find('.vxp-split__panel--left').attributes('style')).toContain('right: 60%;')
    expect(wrapper.find('.vxp-split__panel--right').attributes('style')).toContain('left: 40%;')
  })

  it('can full', async () => {
    const wrapper = mount(() => (
      <Split can-full>
        {{
          left: () => 'left',
          right: () => 'right'
        }}
      </Split>
    ))

    const buttons = wrapper.findAll('.vxp-split__button')
    expect(buttons.length).toEqual(2)

    await nextTick()
    await buttons[0].trigger('click')
    expect(wrapper.find('.vxp-split__panel--left').attributes('style')).toContain('right: 0px;')
    expect(wrapper.find('.vxp-split__panel--right').attributes('style')).toContain('left: 100%;')

    await buttons[1].trigger('click')
    expect(wrapper.find('.vxp-split__panel--left').attributes('style')).toContain('right: 50%;')
    expect(wrapper.find('.vxp-split__panel--right').attributes('style')).toContain('left: 50%;')

    await buttons[1].trigger('click')
    expect(wrapper.find('.vxp-split__panel--left').attributes('style')).toContain('right: 100%;')
    expect(wrapper.find('.vxp-split__panel--right').attributes('style')).toContain('left: 0px;')

    await buttons[0].trigger('click')
    expect(wrapper.find('.vxp-split__panel--left').attributes('style')).toContain('right: 50%;')
    expect(wrapper.find('.vxp-split__panel--right').attributes('style')).toContain('left: 50%;')
  })
})
