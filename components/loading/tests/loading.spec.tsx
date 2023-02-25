import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Loading from '../loading.vue'

vi.useFakeTimers()

function nextFrame() {
  return new Promise(resolve => requestAnimationFrame(resolve))
}

describe('Loading', () => {
  it('render', () => {
    const wrapper = mount(Loading)

    expect(wrapper.find('.vxp-loading').classes()).toContain('vxp-loading-vars')
    expect(wrapper.find('.vxp-loading__filler').exists()).toBe(true)
  })

  it('loading', async () => {
    const wrapper = mount(Loading)

    wrapper.vm.startLoading({ percent: 0 })
    await nextFrame()
    await nextFrame()
    vi.runOnlyPendingTimers()
    await nextFrame()
    expect(wrapper.find('.vxp-loading__filler').attributes('style')).toMatch(/translateX\(.+\)/)
    expect(wrapper.find('.vxp-loading__filler').attributes('style')).toMatch(/scaleX\(.+\)/)
    expect(wrapper.find('.vxp-loading__filler').attributes('style')).not.toContain('translateX(0%)')
    expect(wrapper.find('.vxp-loading__filler').attributes('style')).not.toContain('scaleX(0)')
  })

  it('max percent', async () => {
    const wrapper = mount(Loading)

    wrapper.vm.startLoading({ percent: 0, maxPercent: 50 })
    await nextFrame()
    await nextFrame()
    vi.runAllTimers()
    await nextFrame()
    expect(wrapper.find('.vxp-loading__filler').attributes('style')).toContain('translateX(-25%)')
    expect(wrapper.find('.vxp-loading__filler').attributes('style')).toContain('scaleX(0.5)')
  })

  it('position', async () => {
    let wrapper = mount(Loading)

    wrapper.vm.startLoading({ percent: 0, position: 'top' })
    await nextFrame()
    await nextFrame()
    vi.runAllTimers()
    await nextFrame()
    expect(wrapper.find('.vxp-loading').attributes('style')).toContain('top: 0px;')

    wrapper.unmount()
    wrapper = mount(Loading)

    wrapper.vm.startLoading({ percent: 0, position: 'bottom' })
    await nextFrame()
    await nextFrame()
    vi.runAllTimers()
    await nextFrame()
    expect(wrapper.find('.vxp-loading').attributes('style')).toContain('bottom: 0px;')
  })

  it('stroke width', async () => {
    const wrapper = mount(Loading)

    wrapper.vm.startLoading({ percent: 0, strokeWidth: 5 })
    await nextFrame()
    await nextFrame()
    vi.runAllTimers()
    await nextFrame()
    expect(wrapper.find('.vxp-loading').attributes('style')).toContain('height: 5px;')
  })

  it('state', async () => {
    await Promise.all(
      (['default', 'success', 'error', 'warning'] as const).map(async state => {
        const wrapper = mount(Loading)

        wrapper.vm.startLoading({ percent: 0, state })
        await nextFrame()
        await nextFrame()
        vi.runAllTimers()
        await nextFrame()

        if (state === 'default') {
          expect(wrapper.find('.vxp-loading').classes()).not.toContain(`vxp-loading--${state}`)
        } else {
          expect(wrapper.find('.vxp-loading').classes()).toContain(`vxp-loading--${state}`)
        }
      })
    )
  })
})
