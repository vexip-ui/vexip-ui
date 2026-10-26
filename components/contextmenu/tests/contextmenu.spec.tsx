import { describe, expect, it } from 'vitest'
import { getCurrentInstance, nextTick } from 'vue'
import { mount } from '@vue/test-utils'

import { Github } from 'lucide-vue-next'
import Contextmenu from '../contextmenu.vue'
import { ContextmenuManager } from '..'

function createContextmenu() {
  const Contextmenu = new ContextmenuManager()

  mount({
    setup() {
      const instance = getCurrentInstance()
      const app = instance?.appContext.app

      app?.use(Contextmenu)

      return () => <div></div>
    },
  })

  return Contextmenu
}

describe('Contextmenu', () => {
  it('render', () => {
    const wrapper = mount(Contextmenu)

    expect(wrapper.find('.vxp-contextmenu').classes()).toContain('vxp-contextmenu-vars')
  })

  it('open menu', async () => {
    const menus = [{ key: '1' }, { key: '2' }, { key: '3' }]
    const Contextmenu = createContextmenu()

    Contextmenu.open({
      clientX: 10,
      clientY: 5,
      configs: menus,
    })
    await nextTick()
    const wrapper = document.querySelector<HTMLElement>('.vxp-contextmenu')!
    expect(wrapper).toBeTruthy()
    const items = wrapper.querySelectorAll<HTMLElement>('.vxp-contextmenu__item')

    expect(wrapper.style.cssText).toContain('top: 5px; left: 10px;')
    expect(items.length).toEqual(3)
    expect(items[0].textContent).toEqual('1')
    expect(items[2].textContent).toEqual('3')
  })

  it('select menu', async () => {
    const menus = [{ key: '1' }, { key: '2' }, { key: '3' }]
    const Contextmenu = createContextmenu()

    const promise = Contextmenu.open({
      clientX: 10,
      clientY: 5,
      configs: menus,
    })
    await nextTick()
    const wrapper = document.querySelector<HTMLElement>('.vxp-contextmenu')!
    expect(wrapper).toBeTruthy()
    const items = wrapper.querySelectorAll<HTMLElement>('.vxp-contextmenu__item')

    items[1].dispatchEvent(new Event('click'))
    await nextTick()
    await expect(promise).resolves.toEqual(['2'])
  })

  it('cancel menu', async () => {
    const menus = [{ key: '1' }, { key: '2' }, { key: '3' }]
    const Contextmenu = createContextmenu()

    const promise = Contextmenu.open({
      clientX: 10,
      clientY: 5,
      configs: menus,
    })
    await nextTick()

    const wrapper = document.querySelector<HTMLElement>('.vxp-contextmenu')!
    expect(wrapper).toBeTruthy()
    wrapper.dispatchEvent(new Event('clickoutside'))
    await nextTick()
    await expect(promise).resolves.toEqual(null)
  })

  it('menu options', async () => {
    const menus = [
      {
        key: '1',
        label: 'label',
        color: 'red',
        icon: Github,
        shortcut: 'shortcut',
      },
    ]
    const Contextmenu = createContextmenu()

    Contextmenu.open({
      clientX: 10,
      clientY: 5,
      configs: menus,
    })
    await nextTick()

    const wrapper = document.querySelector<HTMLElement>('.vxp-contextmenu')!
    expect(wrapper).toBeTruthy()
    const item = wrapper.querySelector<HTMLElement>('.vxp-contextmenu__item')!

    expect(item).toBeTruthy()
    expect(item.querySelector<HTMLElement>('.vxp-contextmenu__label')!.textContent).toEqual('label')
    expect(item.querySelector<HTMLElement>('.vxp-contextmenu__label')!.style.cssText).toContain(
      'color: red;',
    )
    expect(item.querySelector<HTMLElement>('.vxp-contextmenu__shortcut')!.textContent).toEqual(
      'shortcut',
    )
    expect(item.querySelector<HTMLElement>('.vxp-contextmenu__icon')).toBeTruthy()
    expect(item.querySelector('svg')).toBeTruthy()
  })

  it('transferTo', async () => {
    const menus = [{ key: '1' }, { key: '2' }, { key: '3' }]
    const Contextmenu = createContextmenu()
    const el = document.createElement('div')

    Contextmenu.open({
      clientX: 10,
      clientY: 5,
      configs: menus,
      target: el,
    })
    await nextTick()
    expect(el.querySelector('.vxp-contextmenu')).toBeTruthy()
  })
})
