import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import { Affix } from '..'

function nextFrame() {
  return new Promise<void>(resolve => requestAnimationFrame(() => resolve()))
}

beforeAll(() => {
  Object.defineProperty(document.documentElement, 'clientHeight', {
    configurable: true,
    get: () => 1000
  })
})

afterAll(() => {
  Object.defineProperty(document.documentElement, 'clientHeight', {
    configurable: true,
    get: () => undefined
  })
})

describe('Affix', () => {
  it('render', () => {
    const wrapper = mount(Affix)

    expect(wrapper.classes()).toContain('vxp-affix')
  })

  it('basis usage render fixed', async () => {
    const wrapper = mount(Affix)

    const affixRectMock = vi
      .spyOn(wrapper.find('.vxp-affix').element, 'getBoundingClientRect')
      .mockReturnValue({
        height: 40,
        width: 1000,
        top: -200,
        bottom: -200
      } as DOMRect)
    const evt = new CustomEvent('scroll', {
      detail: {
        target: {
          scrollTop: 200
        }
      }
    })

    expect(wrapper.find('.vxp-affix--fixed').exists()).toBe(false)

    window.dispatchEvent(evt)
    await nextFrame()

    expect(wrapper.find('.vxp-affix--fixed').exists()).toBe(true)

    affixRectMock.mockRestore()
  })

  it('render offset props', async () => {
    const wrapper = mount(Affix, {
      props: {
        offset: 100
      }
    })

    const affixRectMock = vi
      .spyOn(wrapper.find('.vxp-affix').element, 'getBoundingClientRect')
      .mockReturnValue({
        height: 40,
        width: 1000,
        top: -200,
        bottom: -200
      } as DOMRect)
    const evt = new CustomEvent('scroll', {
      detail: {
        target: {
          scrollTop: 200
        }
      }
    })

    window.dispatchEvent(evt)
    await nextFrame()

    expect(wrapper.find('.vxp-affix--fixed').exists()).toBe(true)
    expect(wrapper.find('.vxp-affix--fixed').attributes('style')).toContain('top: 100px;')

    affixRectMock.mockRestore()
  })

  it('render position props', async () => {
    const wrapper = mount(Affix, {
      props: {
        position: 'bottom',
        offset: 30
      }
    })

    const affixRectMock = vi
      .spyOn(wrapper.find('.vxp-affix').element, 'getBoundingClientRect')
      .mockReturnValue({
        height: 40,
        width: 1000,
        top: 999,
        bottom: 1000
      } as DOMRect)
    const evt = new CustomEvent('scroll', {
      detail: {
        target: {
          scrollTop: 1
        }
      }
    })

    window.dispatchEvent(evt)
    await nextFrame()

    expect(wrapper.find('.vxp-affix--fixed').exists()).toBe(true)
    expect(wrapper.find('.vxp-affix--fixed').attributes('style')).toContain('bottom: 30px;')

    affixRectMock.mockRestore()
  })

  it('render z-index props', async () => {
    const wrapper = mount(Affix, {
      props: {
        zIndex: 9999
      }
    })

    const affixRectMock = vi
      .spyOn(wrapper.find('.vxp-affix').element, 'getBoundingClientRect')
      .mockReturnValue({
        height: 40,
        width: 1000,
        top: -200,
        bottom: -200
      } as DOMRect)
    const evt = new CustomEvent('scroll', {
      detail: {
        target: {
          scrollTop: 200
        }
      }
    })

    window.dispatchEvent(evt)
    await nextFrame()

    expect(wrapper.find('.vxp-affix--fixed').exists()).toBe(true)
    expect(wrapper.find('.vxp-affix--fixed').attributes('style')).toContain('z-index: 9999;')

    affixRectMock.mockRestore()
  })

  it('render target props', async () => {
    const wrapper = mount(
      () => (
        <>
          <div class="target" style="height: 200px">
            <Affix target=".target"></Affix>
          </div>
          <div style="height: 1000px"></div>
        </>
      ),
      { attachTo: document.body }
    )

    let scrollTop = 100
    const affixRectMock = vi
      .spyOn(wrapper.find('.vxp-affix').element, 'getBoundingClientRect')
      .mockReturnValue({
        height: 40,
        width: 1000,
        top: -100,
        bottom: -100
      } as DOMRect)
    const targetRectMock = vi
      .spyOn(wrapper.find('.target').element, 'getBoundingClientRect')
      .mockReturnValue({
        height: 40,
        width: 1000,
        top: -100,
        bottom: 100
      } as DOMRect)
    const evt = new CustomEvent('scroll', {
      detail: {
        target: {
          scrollTop
        }
      }
    })

    window.dispatchEvent(evt)
    await nextFrame()

    expect(wrapper.find('.vxp-affix--fixed').exists()).toBe(true)

    scrollTop = 300
    affixRectMock.mockReturnValue({
      height: 40,
      width: 1000,
      top: -300,
      bottom: -300
    } as DOMRect)
    targetRectMock.mockReturnValue({
      height: 40,
      width: 1000,
      top: -300,
      bottom: -100
    } as DOMRect)

    window.dispatchEvent(evt)
    await nextFrame()

    expect(wrapper.find('.vxp-affix--fixed').exists()).toBe(false)

    affixRectMock.mockRestore()
    targetRectMock.mockRestore()
  })
})
