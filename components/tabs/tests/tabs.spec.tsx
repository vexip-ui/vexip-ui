import { describe, it, expect, vi } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { Tabs } from '..'
import { TabPanel } from '@/components/tab-panel'

describe('Tabs', () => {
  it('render', () => {
    const wrapper = mount(() => (
      <Tabs>
        <TabPanel>{'content'}</TabPanel>
      </Tabs>
    ))

    expect(wrapper.find('.vxp-tabs__header').exists()).toBe(true)
    expect(wrapper.find('.vxp-tab-nav').exists()).toBe(true)
    expect(wrapper.find('.vxp-tabs__main').exists()).toBe(true)
    expect(wrapper.find('.vxp-tabs__panel').exists()).toBe(true)
    expect(wrapper.find('.vxp-tabs__panel').text()).toEqual('content')
  })

  it('active', async () => {
    const wrapper = mount(Tabs, {
      props: { active: '2' },
      slots: {
        default: () => (
          <>
            <TabPanel label={'1'}>{'1'}</TabPanel>
            <TabPanel label={'2'}>{'2'}</TabPanel>
          </>
        )
      }
    })
    const panels = wrapper.findAll('.vxp-tabs__panel')

    await nextTick()
    await nextTick()
    expect(panels[0].classes()).not.toContain('vxp-tabs__panel--active')
    expect(panels[1].classes()).toContain('vxp-tabs__panel--active')

    await wrapper.setProps({ active: '1' })
    expect(panels[0].classes()).toContain('vxp-tabs__panel--active')
    expect(panels[1].classes()).not.toContain('vxp-tabs__panel--active')
  })

  it('toggle active', async () => {
    const onChange = vi.fn()
    const wrapper = mount(() => (
      <Tabs onChange={onChange}>
        <TabPanel label={'1'}>{'1'}</TabPanel>
        <TabPanel label={'2'}>{'2'}</TabPanel>
      </Tabs>
    ))

    await nextTick()
    const items = wrapper.findAll('.vxp-tab-nav__item')
    const panels = wrapper.findAll('.vxp-tabs__panel')

    await items[1].find('.vxp-tab-nav__content').trigger('click')
    expect(panels[1].classes()).toContain('vxp-tabs__panel--active')
    expect(onChange).toHaveBeenCalled()
    expect(onChange).toHaveBeenCalledWith('2')

    await items[0].find('.vxp-tab-nav__content').trigger('click')
    expect(panels[0].classes()).toContain('vxp-tabs__panel--active')
  })

  it('item disabled', async () => {
    const onChange = vi.fn()
    const wrapper = mount(() => (
      <Tabs onChange={onChange}>
        <TabPanel label={'1'}>{'1'}</TabPanel>
        <TabPanel label={'2'} disabled>
          {'2'}
        </TabPanel>
      </Tabs>
    ))

    await nextTick()
    const items = wrapper.findAll('.vxp-tab-nav__item')
    const panels = wrapper.findAll('.vxp-tabs__panel')

    await nextTick()
    expect(panels[1].classes()).toContain('vxp-tabs__panel--disabled')
    await items[1].find('.vxp-tab-nav__content').trigger('click')
    expect(panels[1].classes()).not.toContain('vxp-tabs__panel--active')
    expect(onChange).not.toHaveBeenCalled()
  })

  it('placement', () => {
    (['top', 'right', 'bottom', 'left'] as const).forEach(placement => {
      const wrapper = mount(() => (
        <Tabs placement={placement}>
          <TabPanel label={'1'}>{'1'}</TabPanel>
        </Tabs>
      ))

      expect(wrapper.find('.vxp-tabs').classes()).toContain(`vxp-tabs--${placement}`)
    })
  })
})
