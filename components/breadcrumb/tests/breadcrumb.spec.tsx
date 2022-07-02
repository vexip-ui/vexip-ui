import { describe, it, expect } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { Breadcrumb } from '..'
import { BreadcrumbItem } from '@/components/breadcrumb-item'

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

    expect(wrapper.find('.vxp-breadcrumb__separator').text()).toBe('-')
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
    expect(wrapper.find('.vxp-breadcrumb__separator').text()).toBe('666')
  })

  it('click', async () => {
    const wrapper = mount(Breadcrumb, {
      slots: {
        default: () => <BreadcrumbItem label={'item'}>item</BreadcrumbItem>
      }
    })

    await wrapper.find('.vxp-breadcrumb__label').trigger('click')
    expect(wrapper.findComponent(BreadcrumbItem).emitted()).toHaveProperty('select')
    expect(wrapper.findComponent(BreadcrumbItem).emitted('select')![0]).toEqual(['item'])
    expect(wrapper.emitted()).toHaveProperty('select')
    expect(wrapper.emitted('select')![0]).toEqual(['item'])
  })

  it('separator click', async () => {
    const wrapper = mount(Breadcrumb, {
      slots: {
        default: () => <BreadcrumbItem label={'item'}>item</BreadcrumbItem>
      }
    })

    await wrapper.find('.vxp-breadcrumb__separator').trigger('click')
    expect(wrapper.findComponent(BreadcrumbItem).emitted()).toHaveProperty('separator-click')
    expect(wrapper.findComponent(BreadcrumbItem).emitted('separator-click')![0]).toEqual(['item'])
    expect(wrapper.emitted()).toHaveProperty('separator-click')
    expect(wrapper.emitted('separator-click')![0]).toEqual(['item'])
  })
})
