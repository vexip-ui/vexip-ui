import { describe, it, expect, vi } from 'vitest'
import { nextTick } from 'vue'
import { MenuItem } from '@/components/menu-item'
import { MenuGroup } from '@/components/menu-group'
import { City, User } from '@vexip-ui/icons'
import { createRouter, createWebHistory } from 'vue-router'
import { mount } from '@vue/test-utils'
import { Menu } from '..'

describe('Menu', () => {
  it('render', () => {
    const wrapper = mount(() => (
      <Menu>
        <MenuItem>{'1'}</MenuItem>
        <MenuItem>{'2'}</MenuItem>
      </Menu>
    ))
    const items = wrapper.findAll('.vxp-menu__item')

    expect(wrapper.find('.vxp-menu').classes()).toContain('vxp-menu-vars')
    expect(items.length).toEqual(2)
    expect(items[0].text()).toEqual('1')
    expect(items[1].text()).toEqual('2')
  })

  it('active', async () => {
    const wrapper = mount(Menu, {
      props: { active: '2' },
      slots: {
        default: () => (
          <>
            <MenuItem label={'1'}>{'1'}</MenuItem>
            <MenuItem label={'2'}>{'2'}</MenuItem>
          </>
        )
      }
    })
    const items = wrapper.findAll('.vxp-menu__item')

    expect(items[0].classes()).not.toContain('vxp-menu__item--selected')
    expect(items[1].classes()).toContain('vxp-menu__item--selected')

    await wrapper.setProps({ active: '1' })
    expect(items[0].classes()).toContain('vxp-menu__item--selected')
    expect(items[1].classes()).not.toContain('vxp-menu__item--selected')
  })

  it('with icon', () => {
    const wrapper = mount(() => (
      <Menu>
        <MenuItem icon={City}>{'1'}</MenuItem>
        <MenuItem icon={User}>{'2'}</MenuItem>
      </Menu>
    ))
    const items = wrapper.findAll('.vxp-menu__item')

    expect(items[0].find('.vxp-menu__icon').exists()).toBe(true)
    expect(items[0].findComponent(City).exists()).toBe(true)
    expect(items[1].findComponent(User).exists()).toBe(true)
  })

  it('select menu', async () => {
    const onSelect = vi.fn()
    const wrapper = mount(() => (
      <Menu onSelect={onSelect}>
        <MenuItem label={'1'}>{'1'}</MenuItem>
        <MenuItem label={'2'}>{'2'}</MenuItem>
      </Menu>
    ))
    const items = wrapper.findAll('.vxp-menu__item')
    const labels = items.map(i => i.find('.vxp-menu__label'))

    expect(items[0].classes()).not.toContain('vxp-menu__item--selected')
    expect(items[1].classes()).not.toContain('vxp-menu__item--selected')

    await labels[0].trigger('click')
    expect(items[0].classes()).toContain('vxp-menu__item--selected')
    expect(items[1].classes()).not.toContain('vxp-menu__item--selected')
    expect(onSelect).toHaveBeenCalledTimes(1)
    expect(onSelect).toHaveBeenLastCalledWith('1', {})

    await labels[1].trigger('click')
    expect(items[0].classes()).not.toContain('vxp-menu__item--selected')
    expect(items[1].classes()).toContain('vxp-menu__item--selected')
    expect(onSelect).toHaveBeenCalledTimes(2)
    expect(onSelect).toHaveBeenLastCalledWith('2', {})
  })

  it('disabled', async () => {
    const onSelect = vi.fn()
    const wrapper = mount(() => (
      <Menu onSelect={onSelect}>
        <MenuItem label={'1'} disabled>
          {'1'}
        </MenuItem>
      </Menu>
    ))
    const item = wrapper.find('.vxp-menu__item')

    expect(item.classes()).toContain('vxp-menu__item--disabled')

    await item.find('.vxp-menu__label').trigger('click')
    expect(onSelect).not.toHaveBeenCalled()
    expect(item.classes()).not.toContain('vxp-menu__item--selected')
  })

  it('nesting menu', async () => {
    const onSelect = vi.fn()
    const onExpand = vi.fn()
    const onReduce = vi.fn()
    const wrapper = mount(() => (
      <Menu onSelect={onSelect} onExpand={onExpand} onReduce={onReduce}>
        <MenuItem class={'parent'} label={'1'}>
          {{
            default: () => '1',
            group: () => (
              <>
                <MenuItem label={'1-1'}>{'1-1'}</MenuItem>
                <MenuItem label={'1-2'}>{'1-2'}</MenuItem>
              </>
            )
          }}
        </MenuItem>
        <MenuItem label={'2'}>{'2'}</MenuItem>
      </Menu>
    ))
    const parent = wrapper.find('.parent')

    await parent.find('.vxp-menu__label').trigger('click')
    expect(onExpand).toHaveBeenCalled()
    expect(onExpand).toHaveBeenCalledWith('1', {})

    await parent.find('.vxp-menu__item').find('.vxp-menu__label').trigger('click')
    expect(onSelect).toHaveBeenCalled()
    expect(onSelect).toHaveBeenLastCalledWith('1-1', {})
    expect(parent.classes()).toContain('vxp-menu__item--son-selected')
    expect(parent.classes()).toContain('vxp-menu__item--group-visible')

    await parent.find('.vxp-menu__label').trigger('click')
    expect(onReduce).toHaveBeenCalled()
    expect(onReduce).toHaveBeenCalledWith('1', {})
  })

  it('accordion', async () => {
    const wrapper = mount(() => (
      <Menu accordion>
        <MenuItem class={'p1'} label={'1'}>
          {{
            default: () => '1',
            group: () => <MenuItem label={'1-1'}>{'1-1'}</MenuItem>
          }}
        </MenuItem>
        <MenuItem class={'p2'} label={'2'}>
          {{
            default: () => '2',
            group: () => <MenuItem label={'2-1'}>{'2-1'}</MenuItem>
          }}
        </MenuItem>
      </Menu>
    ))
    const parent1 = wrapper.find('.p1')
    const parent2 = wrapper.find('.p2')

    await parent1.find('.vxp-menu__label').trigger('click')
    await parent1.find('.vxp-menu__item').find('.vxp-menu__label').trigger('click')
    expect(parent1.classes()).toContain('vxp-menu__item--group-visible')
    expect(parent2.classes()).not.toContain('vxp-menu__item--group-visible')

    await parent2.find('.vxp-menu__label').trigger('click')
    await parent2.find('.vxp-menu__item').find('.vxp-menu__label').trigger('click')
    expect(parent1.classes()).not.toContain('vxp-menu__item--group-visible')
    expect(parent2.classes()).toContain('vxp-menu__item--group-visible')
  })

  it('group', () => {
    const wrapper = mount(() => (
      <Menu>
        <MenuGroup label={'group'}>
          <MenuItem>{'1'}</MenuItem>
          <MenuItem>{'2'}</MenuItem>
        </MenuGroup>
      </Menu>
    ))

    expect(wrapper.find('.vxp-menu-group').exists()).toBe(true)
    expect(wrapper.find('.vxp-menu-group').find('.vxp-menu-group__title').text()).toEqual('group')
    expect(wrapper.find('.vxp-menu-group').findAll('.vxp-menu__item').length).toEqual(2)
  })

  it('reduce', async () => {
    const wrapper = mount(() => (
      <Menu reduced>
        <MenuItem>{'1'}</MenuItem>
        <MenuItem>{'2'}</MenuItem>
      </Menu>
    ))

    await nextTick()
    await nextTick()
    expect(wrapper.find('.vxp-menu').classes()).toContain('vxp-menu--reduced')
  })

  it('horizontal', async () => {
    const wrapper = mount(() => (
      <Menu horizontal>
        <MenuItem>{'1'}</MenuItem>
        <MenuItem>{'2'}</MenuItem>
      </Menu>
    ))

    expect(wrapper.find('.vxp-menu').classes()).toContain('vxp-menu--horizontal')
  })

  it('use options', () => {
    const options = [
      {
        label: 'g1',
        group: true,
        children: [
          {
            label: '1',
            name: 'l1',
            icon: City,
            children: [{ label: '1-1' }, { label: '1-2' }]
          }
        ]
      },
      {
        label: '2',
        icon: User,
        disabled: true
      }
    ]
    const wrapper = mount(() => <Menu options={options}></Menu>)
    const group = wrapper.find('.vxp-menu-group')

    expect(group.exists()).toBe(true)
    expect(group.find('.vxp-menu-group__label').text()).toEqual('g1')
    expect(group.findAll('.vxp-menu__item').length).toEqual(3)

    const parent = group.find('.vxp-menu__item')
    expect(parent.find('.vxp-menu__label').text()).toEqual('l1')
    expect(parent.findComponent(City).exists()).toBe(true)
    expect(parent.findAll('.vxp-menu__item').length).toEqual(2)

    expect(wrapper.findAll('.vxp-menu__item')[3].exists()).toBe(true)
    expect(wrapper.findAll('.vxp-menu__item')[3].classes()).toContain('vxp-menu__item--disabled')
  })

  it('use router', async () => {
    const testRoute = {
      path: 'c1',
      component: {},
      meta: {
        label: '1-1',
        name: 's1'
      }
    }
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: '/m1',
          component: {},
          meta: {
            label: '1',
            name: 'l1',
            icon: City
          },
          children: [
            testRoute,
            {
              path: 'c2',
              component: {},
              meta: {
                label: '1-2',
                name: 's2'
              }
            }
          ]
        }
      ]
    })
    const pushRoute = vi.fn()
    router.push = pushRoute
    const wrapper = mount(Menu, {
      props: { router }
    })
    const items = wrapper.findAll('.vxp-menu__item')

    expect(items[0].find('.vxp-menu__label').text()).toEqual('l1')
    expect(items[0].findComponent(City).exists()).toBe(true)
    expect(items[0].findAll('.vxp-menu__item').length).toEqual(2)

    await items[1].find('.vxp-menu__label').trigger('click')
    expect(pushRoute).toHaveBeenCalledTimes(1)
    expect(pushRoute).toHaveBeenCalledWith(testRoute)

    await wrapper.setProps({ manualRoute: true })
    await nextTick()
    await items[2].find('.vxp-menu__label').trigger('click')
    expect(pushRoute).toHaveBeenCalledTimes(1)
  })

  it('marker type', () => {
    const types = ['top', 'right', 'bottom', 'left', 'none'] as const

    types.forEach(type => {
      const wrapper = mount(() => <Menu marker-type={type}></Menu>)

      if (type === 'top' || type === 'bottom') {
        expect(wrapper.find('.vxp-menu').classes()).toContain('vxp-menu--marker-right')
      } else {
        expect(wrapper.find('.vxp-menu').classes()).toContain(`vxp-menu--marker-${type}`)
      }
    })

    types.forEach(type => {
      const wrapper = mount(() => <Menu horizontal marker-type={type}></Menu>)

      if (type === 'left' || type === 'right') {
        expect(wrapper.find('.vxp-menu').classes()).toContain('vxp-menu--marker-bottom')
      } else {
        expect(wrapper.find('.vxp-menu').classes()).toContain(`vxp-menu--marker-${type}`)
      }
    })
  })
})
