import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'

import { Overflow } from '..'

describe('Option', () => {
  it('render with items prop', async () => {
    const items = Array.from({ length: 5 }, (_, i) => ({ index: i + 1 }))
    const wrapper = mount(Overflow, {
      props: { items },
      slots: {
        default: ({ item }: { item: { index: number } }) => <div class={'item'}>{item.index}</div>,
        counter: ({ count }: { count: number }) => <div class={'counter'}>{count}</div>,
      },
    })
    const wrapperEl = wrapper.element
    const itemList = wrapper.findAll('.item')

    expect(itemList.length).toEqual(5)
    itemList.forEach((item, i) => {
      expect(item.text()).toEqual(`${i + 1}`)
    })

    Object.defineProperty(wrapperEl, 'offsetWidth', {
      configurable: true,
      get: () => 30,
    })

    itemList.forEach(item => {
      Object.defineProperty(item.element, 'offsetWidth', {
        configurable: true,
        get: () => 10,
      })
    })
    ;(wrapper.vm as any).refresh()
    await nextTick()

    itemList.forEach((item, i) => {
      if (i < 3) {
        expect(item.attributes('style')).toBeUndefined()
      } else {
        expect(item.attributes('style')).toContain('display: none;')
      }
    })

    expect(wrapper.find('.counter').exists()).toBe(true)
    expect(wrapper.find('.counter').text()).toEqual('2')
  })

  it('render without items prop', async () => {
    const items = Array.from({ length: 5 }, (_, i) => ({ index: i + 1 }))
    const wrapper = mount(Overflow, {
      slots: {
        default: () =>
          items.map(item => (
            <div key={item.index} class={'item'}>
              {item.index}
            </div>
          )),
        counter: ({ count }: { count: number }) => <div class={'counter'}>{count}</div>,
      },
    })
    const wrapperEl = wrapper.element
    const itemList = wrapper.findAll('.item')

    expect(itemList.length).toEqual(5)
    itemList.forEach((item, i) => {
      expect(item.text()).toEqual(`${i + 1}`)
    })

    Object.defineProperty(wrapperEl, 'offsetWidth', {
      configurable: true,
      get: () => 30,
    })

    itemList.forEach(item => {
      Object.defineProperty(item.element, 'offsetWidth', {
        configurable: true,
        get: () => 10,
      })
    })
    ;(wrapper.vm as any).refresh()
    await nextTick()

    itemList.forEach((item, i) => {
      if (i < 3) {
        expect(item.attributes('style')).toBeUndefined()
      } else {
        expect(item.attributes('style')).toContain('display: none;')
      }
    })

    expect(wrapper.find('.counter').exists()).toBe(true)
    expect(wrapper.find('.counter').text()).toEqual('2')
  })

  it('max count', async () => {
    const items = Array.from({ length: 5 }, (_, i) => ({ index: i + 1 }))
    const wrapper = mount(Overflow, {
      props: { items, maxCount: 3 },
      slots: {
        default: ({ item }: { item: { index: number } }) => <div class={'item'}>{item.index}</div>,
        counter: ({ count }: { count: number }) => <div class={'counter'}>{count}</div>,
      },
    })
    const itemList = wrapper.findAll('.item')

    await nextTick()

    itemList.forEach((item, i) => {
      if (i < 3) {
        expect(item.attributes('style')).toBeUndefined()
      } else {
        expect(item.attributes('style')).toContain('display: none;')
      }
    })

    expect(wrapper.find('.counter').exists()).toBe(true)
    expect(wrapper.find('.counter').text()).toEqual('2')
  })
})
