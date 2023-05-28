import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'

import { GithubB } from '@vexip-ui/icons'
import Contextmenu from '../contextmenu.vue'

describe('Contextmenu', () => {
  it('render', () => {
    const wrapper = mount(Contextmenu)

    expect(wrapper.find('.vxp-contextmenu').classes()).toContain('vxp-contextmenu-vars')
  })

  it('open menu', async () => {
    const menus = [{ key: '1' }, { key: '2' }, { key: '3' }]
    const wrapper = mount(Contextmenu)

    wrapper.vm.openContextmenu({
      clientX: 10,
      clientY: 5,
      configs: menus
    })
    await nextTick()
    const items = wrapper.findAll('.vxp-contextmenu__item')

    expect(wrapper.attributes('style')).toContain('top: 5px; left: 10px;')
    expect(items.length).toEqual(3)
    expect(items[0].text()).toEqual('1')
    expect(items[2].text()).toEqual('3')
  })

  it('select menu', async () => {
    const menus = [{ key: '1' }, { key: '2' }, { key: '3' }]
    const wrapper = mount(Contextmenu)

    const promise = wrapper.vm.openContextmenu({
      configs: menus
    })
    await nextTick()
    const items = wrapper.findAll('.vxp-contextmenu__item')

    await items[1].trigger('click')
    await expect(promise).resolves.toEqual(['2'])
  })

  it('cancel menu', async () => {
    const menus = [{ key: '1' }, { key: '2' }, { key: '3' }]
    const wrapper = mount(Contextmenu)

    const promise = wrapper.vm.openContextmenu({
      configs: menus
    })
    await nextTick()

    await wrapper.trigger('clickoutside')
    await expect(promise).resolves.toEqual(null)
  })

  it('menu options', async () => {
    const menus = [
      {
        key: '1',
        label: 'label',
        color: 'red',
        icon: GithubB,
        shortcut: 'shortcut'
      }
    ]
    const wrapper = mount(Contextmenu)

    wrapper.vm.openContextmenu({
      configs: menus
    })
    await nextTick()

    const item = wrapper.find('.vxp-contextmenu__item')

    expect(item.find('.vxp-contextmenu__label').text()).toEqual('label')
    expect(item.find('.vxp-contextmenu__label').attributes('style')).toContain('color: red;')
    expect(item.find('.vxp-contextmenu__shortcut').text()).toEqual('shortcut')
    expect(item.find('.vxp-contextmenu__icon').exists()).toBe(true)
    expect(item.findComponent(GithubB).exists()).toBe(true)
  })
})
