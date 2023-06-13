import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'

import { Pagination } from '..'

describe('Pagination', () => {
  it('render', async () => {
    const wrapper = mount(() => <Pagination total={50} page-size={10}></Pagination>)

    expect(wrapper.find('.vxp-pagination').classes()).toContain('vxp-pagination-vars')

    await nextTick()
    await nextTick()
    const items = wrapper.findAll('.vxp-pagination__item')

    expect(items.length).toEqual(7)
    expect(items[0].classes()).toContain('vxp-pagination__item--prev')
    expect(items[6].classes()).toContain('vxp-pagination__item--next')
    items.slice(1, 6).forEach((item, i) => {
      expect(item.text()).toEqual(`${i + 1}`)
    })
  })

  it('size', async () => {
    const wrapper = mount(Pagination, {
      props: { size: 'small' }
    })

    expect(wrapper.classes()).toContain('vxp-pagination--small')

    await wrapper.setProps({ size: 'large' })
    expect(wrapper.classes()).toContain('vxp-pagination--large')
  })

  it('active', async () => {
    const wrapper = mount(Pagination, {
      props: {
        active: 3,
        total: 50,
        pageSize: 10
      }
    })
    await nextTick()
    await nextTick()
    const items = wrapper.findAll('.vxp-pagination__item')

    expect(items[3].classes()).toContain('vxp-pagination__item--active')

    await wrapper.setProps({ active: 2 })
    expect(items[3].classes()).not.toContain('vxp-pagination__item--active')
    expect(items[2].classes()).toContain('vxp-pagination__item--active')
  })

  it('change page', async () => {
    const onChange = vi.fn()
    const wrapper = mount(() => (
      <Pagination total={50} page-size={10} onChange={onChange}></Pagination>
    ))
    await nextTick()
    await nextTick()
    const items = wrapper.findAll('.vxp-pagination__item')

    await items[3].trigger('click')
    expect(items[3].classes()).toContain('vxp-pagination__item--active')
    expect(onChange).toHaveBeenCalled()
    expect(onChange).toHaveBeenCalledWith(3)
  })

  it('prev/next page', async () => {
    const onChange = vi.fn()
    const wrapper = mount(() => (
      <Pagination total={50} page-size={10} onChange={onChange}></Pagination>
    ))
    await nextTick()
    await nextTick()
    const items = wrapper.findAll('.vxp-pagination__item')

    expect(items[0].classes()).toContain('vxp-pagination__item--disabled')
    expect(items[6].classes()).not.toContain('vxp-pagination__item--disabled')

    await items[0].trigger('click')
    expect(items[1].classes()).toContain('vxp-pagination__item--active')
    expect(onChange).not.toHaveBeenCalled()

    await items[6].trigger('click')
    expect(items[2].classes()).toContain('vxp-pagination__item--active')
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenLastCalledWith(2)
    expect(items[0].classes()).not.toContain('vxp-pagination__item--disabled')
    expect(items[6].classes()).not.toContain('vxp-pagination__item--disabled')

    await items[0].trigger('click')
    expect(items[1].classes()).toContain('vxp-pagination__item--active')
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenLastCalledWith(1)
    expect(items[0].classes()).toContain('vxp-pagination__item--disabled')

    await items[5].trigger('click')
    await items[6].trigger('click')
    expect(items[6].classes()).toContain('vxp-pagination__item--disabled')
  })

  it('many pages', async () => {
    const wrapper = mount(() => <Pagination total={100} page-size={10}></Pagination>)
    await nextTick()
    await nextTick()

    expect(wrapper.find('.vxp-pagination__item--more').exists()).toBe(true)

    await wrapper.find('.vxp-pagination__item--more').trigger('click')
    expect(wrapper.find('.vxp-pagination__item--active').text()).toEqual('6')
  })

  it('turn page count', async () => {
    const wrapper = mount(() => (
      <Pagination total={100} page-size={10} turn-page-count={7}></Pagination>
    ))
    await nextTick()
    await nextTick()

    await wrapper.find('.vxp-pagination__item--more').trigger('click')
    expect(wrapper.find('.vxp-pagination__item--active').text()).toEqual('8')
  })

  it('plugins', () => {
    // eslint-disable-next-line no-sparse-arrays
    const wrapper = mount(() => <Pagination plugins={['total', , 'size', 'jump']}></Pagination>)

    expect(wrapper.find('.vxp-pagination__total').exists()).toBe(true)
    expect(wrapper.find('.vxp-pagination__size').exists()).toBe(true)
    expect(wrapper.find('.vxp-pagination__jump').exists()).toBe(true)
  })

  it('disabled', async () => {
    const onChange = vi.fn()
    const wrapper = mount(() => (
      <Pagination disabled total={50} page-size={10} onChange={onChange}></Pagination>
    ))
    await nextTick()
    await nextTick()
    const items = wrapper.findAll('.vxp-pagination__item')

    await items[3].trigger('click')
    expect(items[3].classes()).not.toContain('vxp-pagination__item--active')
    expect(onChange).not.toHaveBeenCalled()
  })

  it('item disabled', async () => {
    const onChange = vi.fn()
    const disableItem = (page: number) => page === 3
    const wrapper = mount(() => (
      <Pagination
        total={50}
        page-size={10}
        disable-item={disableItem}
        onChange={onChange}
      ></Pagination>
    ))
    await nextTick()
    await nextTick()
    const items = wrapper.findAll('.vxp-pagination__item')

    expect(items[3].classes()).toContain('vxp-pagination__item--disabled')

    await items[3].trigger('click')
    expect(items[3].classes()).not.toContain('vxp-pagination__item--active')
    expect(onChange).not.toHaveBeenCalled()
  })
})
