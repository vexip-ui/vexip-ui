import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import { Affix } from '..'

function nextFrame() {
  return new Promise<void>(resolve => requestAnimationFrame(() => resolve()))
}

function defineGetter(obj: Record<string, any>, prop: string, value: any, defaultValue?: any) {
  const oldValue = defaultValue ?? obj?.[prop] ?? undefined

  Object.defineProperty(obj, prop, {
    configurable: true,
    get: () => value
  })

  return () => {
    Object.defineProperty(obj, prop, {
      configurable: true,
      get: () => oldValue
    })
  }
}

function setStyles(element: HTMLElement, styles: Record<string, any>) {
  for (const prop in styles) {
    element.style[prop as unknown as number] = styles[prop]
  }
}

let clientHeightRestore: () => void

beforeAll(() => {
  clientHeightRestore = defineGetter(document.documentElement, 'clientHeight', 1000)
})

afterAll(() => {
  clientHeightRestore()
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
          <div class={'affix-container'}>
            <div class={'background'}>
              <Affix target={'.affix-container'} offset={80} style={'margin-top: 300px'}>
                {'指定容器'}
              </Affix>
            </div>
          </div>
        </>
      ),
      { attachTo: document.body }
    )
    const targetEl = document.querySelector('.affix-container')! as HTMLElement
    const bgEl = document.querySelector('.background')! as HTMLElement

    setStyles(targetEl, {
      height: '400px',
      overflow: 'auto'
    })
    setStyles(bgEl, {
      height: '500px'
    })

    let scrollTop = 100
    const affixRectMock = vi
      .spyOn(wrapper.find('.vxp-affix').element, 'getBoundingClientRect')
      .mockReturnValue({
        height: 40,
        width: 1000,
        top: 300,
        bottom: 332
      } as DOMRect)
    const targetRectMock = vi
      .spyOn(wrapper.find('.affix-container').element, 'getBoundingClientRect')
      .mockReturnValue({
        height: 40,
        width: 1000,
        top: 0,
        bottom: 500
      } as DOMRect)
    const evt = new CustomEvent('scroll', {
      detail: {
        target: {
          scrollTop
        }
      }
    })

    targetEl.dispatchEvent(evt)
    await nextFrame()

    expect(wrapper.find('.vxp-affix--fixed').exists()).toBe(false)

    scrollTop = 300
    affixRectMock.mockReturnValue({
      height: 40,
      width: 1000,
      top: 0,
      bottom: 32
    } as DOMRect)
    targetRectMock.mockReturnValue({
      height: 40,
      width: 1000,
      top: 0,
      bottom: 500
    } as DOMRect)

    targetEl.dispatchEvent(evt)
    await nextFrame()

    expect(wrapper.find('.vxp-affix--fixed').exists()).toBe(true)

    affixRectMock.mockRestore()
    targetRectMock.mockRestore()
  })

  it('should emit change event when fixed change', async () => {
    const onChange = vi.fn()
    const wrapper = mount(() => (
      <>
        <Affix onChange={onChange}></Affix>
      </>
    ))

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
    expect(onChange).toHaveBeenCalled()
    expect(onChange).toHaveBeenCalledWith(true)

    affixRectMock.mockRestore()
  })

  it('should emit scroll event when scroller scroll', async () => {
    const onScroll = vi.fn()
    const wrapper = mount(() => (
      <>
        <Affix onScroll={onScroll}></Affix>
      </>
    ))
    const scrollTopRestore = defineGetter(document.documentElement, 'scrollTop', 200)

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
    expect(onScroll).toHaveBeenCalled()
    expect(onScroll).toHaveBeenCalledWith({
      scrollTop: 200,
      fixed: true
    })

    affixRectMock.mockRestore()
    scrollTopRestore()
  })
})
