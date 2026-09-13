import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import { ResizeObserver } from '..'

const observeResize = vi.fn()
const unobserveResize = vi.fn()

vi.mock('@vexip-ui/hooks', async () => {
  const actual = await vi.importActual('@vexip-ui/hooks')

  return {
    ...(actual as any),
    useResize: () => ({
      observeResize,
      unobserveResize,
    }),
  }
})

describe('ResizeObserver', () => {
  it('render', async () => {
    const wrapper = mount(ResizeObserver, {
      slots: {
        default: () => <div class={'test'}></div>,
      },
    })

    expect(wrapper.find('.test').exists()).toBe(true)
  })

  it('should observe the slot root element', async () => {
    observeResize.mockClear()

    mount(ResizeObserver, {
      slots: {
        default: () => <div class={'observed'}></div>,
      },
    })

    await new Promise(resolve => setTimeout(resolve, 0))

    expect(observeResize).toHaveBeenCalledOnce()

    const observedEl = observeResize.mock.calls[0][0] as Element
    expect(observedEl.classList.contains('observed')).toBe(true)
  })

  it('should not observe nextElementSibling when slot has single root element', async () => {
    observeResize.mockClear()

    mount(ResizeObserver, {
      slots: {
        default: () => <div class={'observed'}></div>,
      },
    })

    await new Promise(resolve => setTimeout(resolve, 0))

    const observedEl = observeResize.mock.calls[0][0] as Element
    expect(observedEl.classList.contains('observed')).toBe(true)
  })

  it('should unobserve on unmount', async () => {
    observeResize.mockClear()
    unobserveResize.mockClear()

    const wrapper = mount(ResizeObserver, {
      slots: {
        default: () => <div class={'observed'}></div>,
      },
    })

    await new Promise(resolve => setTimeout(resolve, 0))
    expect(observeResize).toHaveBeenCalledOnce()

    wrapper.unmount()
    expect(unobserveResize).toHaveBeenCalledOnce()
    expect(unobserveResize.mock.calls[0][0]).toBe(observeResize.mock.calls[0][0])
  })
})
