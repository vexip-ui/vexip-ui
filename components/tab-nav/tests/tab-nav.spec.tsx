import { describe, it, expect, vi } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { TabNav } from '..'
import { TabNavItem } from '@/components/tab-nav-item'
import { GithubB } from '@vexip-ui/icons'

describe('TabNav', () => {
  it('render', () => {
    const wrapper = mount(() => (
      <TabNav>
        <TabNavItem>{'tab'}</TabNavItem>
      </TabNav>
    ))

    expect(wrapper.classes()).toContain('vxp-tab-nav-vars')
    expect(wrapper.find('.vxp-tab-nav__list').exists()).toBe(true)
    expect(wrapper.find('.vxp-tab-nav__track').exists()).toBe(true)
    expect(wrapper.find('.vxp-tab-nav__marker').exists()).toBe(true)
    expect(wrapper.find('.vxp-tab-nav__item').exists()).toBe(true)
    expect(wrapper.find('.vxp-tab-nav__item').text()).toEqual('tab')
  })

  it('active', async () => {
    const wrapper = mount(TabNav, {
      slots: {
        default: () => (
          <>
            <TabNavItem label={'1'}>{'1'}</TabNavItem>
            <TabNavItem label={'2'}>{'2'}</TabNavItem>
          </>
        )
      }
    })
    const items = wrapper.findAll('.vxp-tab-nav__item')

    await nextTick()
    expect(items[0].find('.vxp-tab-nav__content').classes()).toContain(
      'vxp-tab-nav__content--active'
    )
    expect(items[1].find('.vxp-tab-nav__content').classes()).not.toContain(
      'vxp-tab-nav__content--active'
    )

    await wrapper.setProps({ active: '2' })
    expect(items[0].find('.vxp-tab-nav__content').classes()).not.toContain(
      'vxp-tab-nav__content--active'
    )
    expect(items[1].find('.vxp-tab-nav__content').classes()).toContain(
      'vxp-tab-nav__content--active'
    )
  })

  it('toggle active', async () => {
    const onChange = vi.fn()
    const wrapper = mount(() => (
      <TabNav onChange={onChange}>
        <TabNavItem label={'1'}>{'1'}</TabNavItem>
        <TabNavItem label={'2'}>{'2'}</TabNavItem>
      </TabNav>
    ))
    const items = wrapper.findAll('.vxp-tab-nav__item')

    await nextTick()
    await items[1].find('.vxp-tab-nav__content').trigger('click')
    expect(items[1].find('.vxp-tab-nav__content').classes()).toContain(
      'vxp-tab-nav__content--active'
    )
    expect(onChange).toHaveBeenCalled()
    expect(onChange).toHaveBeenCalledWith('2')

    await items[0].find('.vxp-tab-nav__content').trigger('click')
    expect(items[0].find('.vxp-tab-nav__content').classes()).toContain(
      'vxp-tab-nav__content--active'
    )
  })

  it('item disabled', async () => {
    const onChange = vi.fn()
    const wrapper = mount(() => (
      <TabNav onChange={onChange}>
        <TabNavItem label={'1'}>{'1'}</TabNavItem>
        <TabNavItem label={'2'} disabled>
          {'2'}
        </TabNavItem>
      </TabNav>
    ))
    const items = wrapper.findAll('.vxp-tab-nav__item')

    await nextTick()
    expect(items[1].find('.vxp-tab-nav__content').classes()).toContain(
      'vxp-tab-nav__content--disabled'
    )
    await items[1].find('.vxp-tab-nav__content').trigger('click')
    expect(items[1].find('.vxp-tab-nav__content').classes()).not.toContain(
      'vxp-tab-nav__content--active'
    )
    expect(onChange).not.toHaveBeenCalled()
  })

  it('icon', () => {
    const wrapper = mount(() => (
      <TabNav>
        <TabNavItem icon={GithubB}>{'content'}</TabNavItem>
      </TabNav>
    ))

    expect(wrapper.find('.vxp-tab-nav__icon').exists()).toBe(true)
    expect(wrapper.findComponent(GithubB).exists()).toBe(true)
  })

  it('card', async () => {
    const wrapper = mount(() => (
      <TabNav card>
        <TabNavItem>{'tab'}</TabNavItem>
      </TabNav>
    ))

    expect(wrapper.find('.vxp-tab-nav').classes()).toContain('vxp-tab-nav--card')
  })
})
