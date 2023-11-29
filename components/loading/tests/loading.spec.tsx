import { describe, expect, it, vi } from 'vitest'
import { getCurrentInstance, nextTick } from 'vue'
import { mount } from '@vue/test-utils'

import Loading from '../loading.vue'
import { LoadingManager } from '..'

vi.useFakeTimers()

function nextFrame() {
  return new Promise(resolve => requestAnimationFrame(resolve))
}

function createLoading() {
  const Loading = new LoadingManager()

  mount({
    setup() {
      const instance = getCurrentInstance()
      const app = instance?.appContext.app

      app?.use(Loading)

      return () => <div></div>
    }
  })

  return Loading
}

describe('Loading', () => {
  it('render', () => {
    const wrapper = mount(Loading)

    expect(wrapper.find('.vxp-loading').classes()).toContain('vxp-loading-vars')
    expect(wrapper.find('.vxp-loading__filler').exists()).toBe(true)
  })

  it('loading', async () => {
    const Loading = createLoading()

    Loading.open({ percent: 0 })
    await nextFrame()
    await nextFrame()
    vi.runOnlyPendingTimers()
    await nextFrame()
    const wrapper = document.querySelector('.vxp-loading')!
    expect(wrapper).toBeTruthy()
    const filter = wrapper.querySelector('.vxp-loading__filler') as HTMLElement
    expect(filter.style.cssText).toMatch(/translateX\(.+\)/)
    expect(filter.style.cssText).toMatch(/scaleX\(.+\)/)
    expect(filter.style.cssText).not.toContain('translateX(0%)')
    expect(filter.style.cssText).not.toContain('scaleX(0)')
  })

  it('max percent', async () => {
    const Loading = createLoading()

    Loading.open({ percent: 0, maxPercent: 50 })
    await nextFrame()
    await nextFrame()
    vi.runAllTimers()
    await nextFrame()
    const wrapper = document.querySelector('.vxp-loading')!
    expect(wrapper).toBeTruthy()
    const filter = wrapper.querySelector('.vxp-loading__filler') as HTMLElement
    expect(filter.style.cssText).toContain('translateX(-25%)')
    expect(filter.style.cssText).toContain('scaleX(0.5)')
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

  it('transferTo', async () => {
    const Loading = createLoading()
    const el = document.createElement('div')
    Loading.transferTo(el)

    await nextTick()
    expect(el.querySelector('.vxp-loading')).toBeTruthy()
  })
})
