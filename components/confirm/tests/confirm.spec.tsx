import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'

import { GithubB } from '@vexip-ui/icons'
import Confirm from '../confirm.vue'

describe('Confirm', () => {
  it('render', () => {
    const wrapper = mount(Confirm)

    expect(wrapper.find('.vxp-confirm').classes()).toContain('vxp-confirm-vars')
    expect(wrapper.find('.vxp-confirm__body').exists()).toBe(true)
    expect(wrapper.find('.vxp-confirm__content').exists()).toBe(true)
    expect(wrapper.find('.vxp-confirm__footer').exists()).toBe(true)
    expect(wrapper.findAll('.vxp-confirm__button').length).toEqual(2)
  })

  it('open', async () => {
    const wrapper = mount(Confirm)
    const buttons = wrapper.findAll('.vxp-confirm__button')

    await nextTick()
    wrapper.vm.openConfirm({
      content: 'content',
      icon: GithubB,
      confirmText: 'ok',
      cancelText: 'no'
    })
    await nextTick()
    await nextTick()
    expect(wrapper.find('.vxp-confirm__content').text()).toEqual('content')
    expect(wrapper.findComponent(GithubB).exists()).toBe(true)
    expect(buttons[0].text()).toEqual('no')
    expect(buttons[1].text()).toEqual('ok')
  })

  it('cancel', async () => {
    const wrapper = mount(Confirm)
    const buttons = wrapper.findAll('.vxp-confirm__button')

    await nextTick()
    const promise = wrapper.vm.openConfirm({
      content: 'content',
      icon: GithubB,
      confirmText: 'ok',
      cancelText: 'no'
    })
    await nextTick()
    await nextTick()
    ;(buttons[0].element as HTMLButtonElement).click()
    await nextTick()
    await expect(promise).resolves.toEqual(false)
  })

  it('confirm', async () => {
    const wrapper = mount(Confirm)
    const buttons = wrapper.findAll('.vxp-confirm__button')

    await nextTick()
    const promise = wrapper.vm.openConfirm({
      content: 'content',
      icon: GithubB,
      confirmText: 'ok',
      cancelText: 'no'
    })
    await nextTick()
    await nextTick()
    ;(buttons[1].element as HTMLButtonElement).click()
    await nextTick()
    await expect(promise).resolves.toEqual(true)
  })

  it('title', async () => {
    const wrapper = mount(Confirm)

    await nextTick()
    wrapper.vm.openConfirm({
      title: 'title',
      content: 'content'
    })
    await nextTick()
    await nextTick()
    expect(wrapper.find('.vxp-confirm__title').exists()).toBe(true)
    expect(wrapper.find('.vxp-confirm__title').text()).toEqual('title')
  })

  it('closable', async () => {
    const wrapper = mount(Confirm)

    await nextTick()
    wrapper.vm.openConfirm({
      content: 'content',
      closable: true
    })
    await nextTick()
    await nextTick()
    expect(wrapper.find('.vxp-confirm__close').exists()).toBe(true)
  })

  it('content align and actions align', async () => {
    const wrapper = mount(Confirm)

    await nextTick()
    wrapper.vm.openConfirm({
      content: 'content',
      contentAlign: 'left',
      actionsAlign: 'right'
    })
    await nextTick()
    await nextTick()
    expect(wrapper.find('.vxp-confirm__body').classes()).toContain('vxp-confirm__body--left')
    expect(wrapper.find('.vxp-confirm__footer').classes()).toContain('vxp-confirm__footer--right')
  })
})
