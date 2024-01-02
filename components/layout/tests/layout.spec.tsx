import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'

import { Github, Home } from 'lucide-vue-next'
import { Layout } from '..'

function waitMounted() {
  return new Promise(resolve => requestAnimationFrame(resolve))
}

describe('Layout', () => {
  it('render', async () => {
    const menus = [
      {
        label: '1',
        name: '菜单 1',
        icon: Github,
        children: [
          { label: '1-1', name: '子菜单 1' },
          { label: '1-2', name: '子菜单 2' },
          { label: '1-3', name: '子菜单 3' }
        ]
      },
      {
        label: '2',
        name: '菜单 2',
        icon: Home,
        disabled: true
      }
    ]
    const wrapper = mount(() => (
      <Layout
        logo={'logo.png'}
        sign-name={'Vexip UI'}
        user={{
          name: 'VexipUI',
          email: 'email@vexip-ui.com'
        }}
        menus={menus}
      >
        {{
          main: () => <div class={'main'}></div>
        }}
      </Layout>
    ))

    await waitMounted()

    expect(wrapper.find('.vxp-layout').classes()).toContain('vxp-layout-vars')
    expect(wrapper.find('.vxp-layout__sign').exists()).toBe(true)
    expect(wrapper.find('.vxp-layout__aside').exists()).toBe(true)
    expect(wrapper.find('.vxp-layout__aside .vxp-menu').exists()).toBe(true)
    expect(wrapper.find('.vxp-layout__header').exists()).toBe(true)
    expect(wrapper.find('.vxp-layout__header .vxp-layout__user').exists()).toBe(true)
    expect(wrapper.find('.vxp-layout__main').exists()).toBe(true)
    expect(wrapper.find('.vxp-layout__main .main').exists()).toBe(true)

    const menu = wrapper.find('.vxp-layout__aside .vxp-menu')

    expect(menu.findAll('.vxp-menu__item').length).toEqual(5)
    expect(menu.find('.vxp-menu__item').findAll('.vxp-menu__item').length).toEqual(3)
    expect(menu.findAll('.vxp-menu__item')[4].classes()).toContain('vxp-menu__item--disabled')
  })

  it('user actions', async () => {
    const actions = [
      {
        label: 'action1',
        icon: Github,
        name: 'Action 1'
      },
      {
        label: 'action2',
        icon: Home,
        name: 'Action 2'
      }
    ]
    const onUserAction = vi.fn()
    const wrapper = mount(() => (
      <Layout
        logo={'logo.png'}
        sign-name={'Vexip UI'}
        user={{
          name: 'VexipUI',
          email: 'email@vexip-ui.com'
        }}
        actions={actions}
        onUserAction={onUserAction}
      >
        {{
          main: () => <div class={'main'}></div>
        }}
      </Layout>
    ))

    await waitMounted()

    const user = wrapper.find('.vxp-layout__header .vxp-layout__user')
    const avatar = user.find('.vxp-avatar')

    expect(avatar.exists()).toBe(true)

    await avatar.trigger('click')
    const profile = document.querySelector('.vxp-layout__user-profile')!
    expect(profile).not.toBeNull()
    expect(profile.querySelector('.vxp-layout__user-name')).not.toBeNull()
    expect(profile.querySelector('.vxp-layout__user-name')!.textContent).toEqual('VexipUI')
    expect(profile.querySelector('.vxp-layout__user-email')).not.toBeNull()
    expect(profile.querySelector('.vxp-layout__user-email')!.textContent).toEqual(
      'email@vexip-ui.com'
    )

    const userActions = document.querySelectorAll('.vxp-layout__user-action')
    expect(userActions.length).toEqual(actions.length)
    expect(userActions[0].textContent).toEqual(actions[0].name)

    userActions[0].dispatchEvent(new Event('click'))
    await nextTick()

    expect(onUserAction).toHaveBeenCalled()
    expect(onUserAction).toHaveBeenCalledWith(actions[0].label, {})
  })

  it('footer', async () => {
    const links = [
      {
        name: 'Group',
        children: [
          { name: 'Github', icon: Github },
          { name: 'City', icon: Home }
        ]
      },
      {
        name: 'Group',
        children: [{ name: 'Link' }, { name: 'Link' }]
      }
    ]
    const wrapper = mount(() => (
      <Layout
        logo={'logo.png'}
        sign-name={'Vexip UI'}
        user={{
          name: 'VexipUI',
          email: 'email@vexip-ui.com'
        }}
        footer
        copyright={'copyright'}
        links={links}
      >
        {{
          main: () => <div class={'main'}></div>
        }}
      </Layout>
    ))

    await waitMounted()

    expect(wrapper.find('.vxp-layout__footer').exists()).toBe(true)

    const groups = wrapper.findAll('.vxp-layout__link-group')
    expect(groups.length).toEqual(2)
    expect(groups[0].find('.vxp-layout__link-name').text()).toEqual('Group')

    const footerLinks = groups[0].findAll('.vxp-layout__link')
    expect(footerLinks.length).toEqual(2)
    expect(footerLinks[0].text()).toEqual('Github')
    expect(footerLinks[0].findComponent(Github).exists()).toBe(true)
    expect(footerLinks[1].text()).toEqual('City')
    expect(footerLinks[1].findComponent(Home).exists()).toBe(true)

    expect(wrapper.find('.vxp-layout__copyright').exists()).toBe(true)
    expect(wrapper.find('.vxp-layout__copyright').text()).toEqual('copyright')
  })

  it('no aside', async () => {
    const menus = [
      {
        label: '1',
        name: '菜单 1',
        icon: Github,
        children: [
          { label: '1-1', name: '子菜单 1' },
          { label: '1-2', name: '子菜单 2' },
          { label: '1-3', name: '子菜单 3' }
        ]
      },
      {
        label: '2',
        name: '菜单 2',
        icon: Home,
        disabled: true
      }
    ]
    const wrapper = mount(() => (
      <Layout
        logo={'logo.png'}
        sign-name={'Vexip UI'}
        user={{
          name: 'VexipUI',
          email: 'email@vexip-ui.com'
        }}
        menus={menus}
        no-aside
      >
        {{
          main: () => <div class={'main'}></div>
        }}
      </Layout>
    ))

    await waitMounted()

    expect(wrapper.find('.vxp-layout__aside').exists()).toBe(false)
    expect(wrapper.find('.vxp-layout__header').exists()).toBe(true)
    expect(wrapper.find('.vxp-layout__header .vxp-menu').exists()).toBe(true)
  })

  it('no header', async () => {
    const menus = [
      {
        label: '1',
        name: '菜单 1',
        icon: Github,
        children: [
          { label: '1-1', name: '子菜单 1' },
          { label: '1-2', name: '子菜单 2' },
          { label: '1-3', name: '子菜单 3' }
        ]
      },
      {
        label: '2',
        name: '菜单 2',
        icon: Home,
        disabled: true
      }
    ]
    const wrapper = mount(() => (
      <Layout
        logo={'logo.png'}
        sign-name={'Vexip UI'}
        user={{
          name: 'VexipUI',
          email: 'email@vexip-ui.com'
        }}
        menus={menus}
        no-header
      >
        {{
          main: () => <div class={'main'}></div>
        }}
      </Layout>
    ))

    await waitMounted()

    expect(wrapper.find('.vxp-layout__header').exists()).toBe(false)
    expect(wrapper.find('.vxp-layout__aside').exists()).toBe(true)
    expect(wrapper.find('.vxp-layout__aside .vxp-menu').exists()).toBe(true)
  })

  it('slots', async () => {
    const wrapper = mount(() => (
      <Layout footer>
        {{
          headerLeft: () => <div class={'header-left'}></div>,
          headerMain: () => <div class={'header-main'}></div>,
          headerRight: () => <div class={'header-right'}></div>,
          asideTop: () => <div class={'aside-top'}></div>,
          asideMain: () => <div class={'aside-main'}></div>,
          asideBottom: () => <div class={'aside-bottom'}></div>,
          main: () => <div class={'main'}></div>,
          footerLinks: () => <div class={'footer-links'}></div>,
          footerCopyright: () => <div class={'footer-copyright'}></div>
        }}
      </Layout>
    ))

    await waitMounted()

    expect(wrapper.find('.header-left').exists()).toBe(true)
    expect(wrapper.find('.header-main').exists()).toBe(true)
    expect(wrapper.find('.header-right').exists()).toBe(true)
    expect(wrapper.find('.aside-top').exists()).toBe(true)
    expect(wrapper.find('.aside-main').exists()).toBe(true)
    expect(wrapper.find('.aside-bottom').exists()).toBe(true)
    expect(wrapper.find('.main').exists()).toBe(true)
    expect(wrapper.find('.footer-links').exists()).toBe(true)
    expect(wrapper.find('.footer-copyright').exists()).toBe(true)
  })
})
