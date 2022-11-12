import { describe, it, expect, vi } from 'vitest'
import { nextTick } from 'vue'
import { BreadcrumbItem } from '@/components/breadcrumb-item'
import { mount } from '@vue/test-utils'
import { Breadcrumb } from '..'

describe('Breadcrumb', () => {
  it('render', () => {
    const wrapper = mount(Breadcrumb)

    expect(wrapper.classes()).toContain('vxp-breadcrumb-vars')
  })

  it('items', () => {
    const wrapper = mount(() => (
      <Breadcrumb>
        <BreadcrumbItem>item1</BreadcrumbItem>
        <BreadcrumbItem>item2</BreadcrumbItem>
      </Breadcrumb>
    ))

    expect(wrapper.findAll('.vxp-breadcrumb__item').length).toBe(2)
  })

  it('separator', () => {
    const wrapper = mount(() => (
      <Breadcrumb separator={'-'}>
        <BreadcrumbItem>item1</BreadcrumbItem>
        <BreadcrumbItem>item2</BreadcrumbItem>
      </Breadcrumb>
    ))

    expect(wrapper.find('.vxp-breadcrumb__separator').text()).toEqual('-')
  })

  it('separator slot', async () => {
    const wrapper = mount(() => (
      <Breadcrumb>
        {{
          default: () => <BreadcrumbItem>item</BreadcrumbItem>,
          separator: () => <span class={'sep'}>666</span>
        }}
      </Breadcrumb>
    ))

    await nextTick()
    expect(wrapper.find('.sep').exists()).toBe(true)
    expect(wrapper.find('.vxp-breadcrumb__separator').text()).toEqual('666')
  })

  it('click', async () => {
    const onSelect = vi.fn()
    const wrapper = mount(Breadcrumb, {
      props: {
        onSelect
      },
      slots: {
        default: () => <BreadcrumbItem label={'item'}>item</BreadcrumbItem>
      }
    })

    await wrapper.find('.vxp-breadcrumb__label').trigger('click')
    expect(onSelect).toHaveBeenCalled()
    expect(onSelect).toBeCalledWith('item')
  })

  it('enter down', async () => {
    const onSelect = vi.fn()
    const wrapper = mount(Breadcrumb, {
      props: {
        onSelect
      },
      slots: {
        default: () => <BreadcrumbItem label={'item'}>item</BreadcrumbItem>
      }
    })

    await wrapper.find('.vxp-breadcrumb__label').trigger('keydown.enter')
    expect(onSelect).toHaveBeenCalled()
    expect(onSelect).toBeCalledWith('item')
  })

  it('separator click', async () => {
    const onSeparatorClick = vi.fn()
    const wrapper = mount(Breadcrumb, {
      props: {
        onSeparatorClick
      },
      slots: {
        default: () => <BreadcrumbItem label={'item'}>item</BreadcrumbItem>
      }
    })

    await wrapper.find('.vxp-breadcrumb__separator').trigger('click')
    expect(onSeparatorClick).toHaveBeenCalled()
    expect(onSeparatorClick).toBeCalledWith('item')
  })
})
