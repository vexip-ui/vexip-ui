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

  it('stable display count when items increase in responsive mode', async () => {
    const items = Array.from({ length: 3 }, (_, i) => ({ index: i + 1 }))
    const wrapper = mount(Overflow, {
      props: { items },
      slots: {
        default: ({ item }: { item: { index: number } }) => <div class={'item'}>{item.index}</div>,
        counter: ({ count }: { count: number }) => <div class={'counter'}>{count}</div>,
      },
    })
    const wrapperEl = wrapper.element as HTMLElement

    // Simulate a fixed container width (like flex: 1 1 auto provides)
    Object.defineProperty(wrapperEl, 'offsetWidth', {
      configurable: true,
      get: () => 56,
    })

    // Each item is 20px wide, counter is 16px wide
    // 2 items (20+20) + counter (16) = 56 <= 56, should show 2 items
    // 3 items (60) + counter (16) = 76 > 56, should show 2 items with counter +1
    const itemList = wrapper.findAll('.item')
    itemList.forEach(item => {
      Object.defineProperty(item.element, 'offsetWidth', {
        configurable: true,
        get: () => 20,
      })
    })

    const counterEl = wrapper.find('.counter').element
    Object.defineProperty(counterEl, 'offsetWidth', {
      configurable: true,
      get: () => 16,
    })
    ;(wrapper.vm as any).refresh()
    await nextTick()

    // With 3 items and wrapperWidth=56, should show 2 items
    expect(itemList[0].attributes('style')).toBeUndefined()
    expect(itemList[1].attributes('style')).toBeUndefined()
    expect(itemList[2].attributes('style')).toContain('display: none;')
    expect(wrapper.find('.counter').text()).toEqual('1')

    // Now increase items to 10
    await wrapper.setProps({
      items: Array.from({ length: 10 }, (_, i) => ({ index: i + 1 })),
    })
    await nextTick()

    // wrapperWidth should remain stable at 56
    const newItemList = wrapper.findAll('.item')
    newItemList.forEach(item => {
      Object.defineProperty(item.element, 'offsetWidth', {
        configurable: true,
        get: () => 20,
      })
    })
    ;(wrapper.vm as any).refresh()
    await nextTick()

    // With 10 items and stable wrapperWidth=56, should still show 2 items
    expect(newItemList[0].attributes('style')).toBeUndefined()
    expect(newItemList[1].attributes('style')).toBeUndefined()
    expect(newItemList[2].attributes('style')).toContain('display: none;')
    expect(wrapper.find('.counter').text()).toEqual('8')
  })

  it('rest count is correct when wrapperWidth can only fit one item', async () => {
    const items = Array.from({ length: 14 }, (_, i) => ({ index: i + 1 }))
    const wrapper = mount(Overflow, {
      props: { items },
      slots: {
        default: ({ item }: { item: { index: number } }) => <div class={'item'}>{item.index}</div>,
        counter: ({ count }: { count: number }) => <div class={'counter'}>{count}</div>,
      },
    })
    const wrapperEl = wrapper.element as HTMLElement

    // Narrow container: only 1 item + counter can fit
    Object.defineProperty(wrapperEl, 'offsetWidth', {
      configurable: true,
      get: () => 40,
    })

    const itemList = wrapper.findAll('.item')
    itemList.forEach(item => {
      Object.defineProperty(item.element, 'offsetWidth', {
        configurable: true,
        get: () => 24,
      })
    })

    const counterEl = wrapper.find('.counter').element
    Object.defineProperty(counterEl, 'offsetWidth', {
      configurable: true,
      get: () => 16,
    })
    ;(wrapper.vm as any).refresh()
    await nextTick()

    // 1 item (24) + counter (16) = 40 <= 40, should show 1 item
    expect(itemList[0].attributes('style')).toBeUndefined()
    expect(itemList[1].attributes('style')).toContain('display: none;')
    expect(wrapper.find('.counter').text()).toEqual('13')
  })
})
