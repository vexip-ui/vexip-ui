import { describe, expect, it } from 'vitest'
import { getCurrentInstance, nextTick } from 'vue'
import { mount } from '@vue/test-utils'

import { Github } from 'lucide-vue-next'
import Confirm from '../confirm.vue'
import { ConfirmManager } from '..'

function createConfirm() {
  const Confirm = new ConfirmManager()

  mount({
    setup() {
      const instance = getCurrentInstance()
      const app = instance?.appContext.app

      app?.use(Confirm)

      return () => <div></div>
    }
  })

  return Confirm
}

async function waitRender() {
  await nextTick()
  await nextTick()
  await nextTick()
}

describe('Confirm', () => {
  it('render', async () => {
    const wrapper = mount(Confirm)
    await nextTick()
    wrapper.vm.openConfirm('content')
    await nextTick()
    await nextTick()

    expect(wrapper.find('.vxp-confirm').classes()).toContain('vxp-confirm-vars')
    expect(wrapper.find('.vxp-confirm__body').exists()).toBe(true)
    expect(wrapper.find('.vxp-confirm__content').exists()).toBe(true)
    expect(wrapper.find('.vxp-confirm__footer').exists()).toBe(true)
    expect(wrapper.findAll('.vxp-confirm__button').length).toEqual(2)
  })

  it('open', async () => {
    const Confirm = createConfirm()

    Confirm.open({
      content: 'content',
      icon: Github,
      confirmText: 'ok',
      cancelText: 'no'
    })
    await waitRender()

    const wrapper = document.querySelector<HTMLElement>('.vxp-confirm')!
    expect(wrapper).toBeTruthy()
    const buttons = wrapper.querySelectorAll<HTMLButtonElement>('.vxp-confirm__button')
    expect(wrapper.querySelector<HTMLElement>('.vxp-confirm__content')!.textContent).toEqual(
      'content'
    )
    expect(wrapper.querySelector('svg')).toBeTruthy()
    expect(buttons[0].textContent).toEqual('no')
    expect(buttons[1].textContent).toEqual('ok')
  })

  it('cancel', async () => {
    const Confirm = createConfirm()

    const promise = Confirm.open({
      content: 'content',
      icon: Github,
      confirmText: 'ok',
      cancelText: 'no'
    })
    await waitRender()

    const wrapper = document.querySelector<HTMLElement>('.vxp-confirm')!
    expect(wrapper).toBeTruthy()
    const buttons = wrapper.querySelectorAll<HTMLButtonElement>('.vxp-confirm__button')
    buttons[0].click()
    await nextTick()
    await expect(promise).resolves.toEqual(false)
  })

  it('confirm', async () => {
    const Confirm = createConfirm()

    const promise = Confirm.open({
      content: 'content',
      icon: Github,
      confirmText: 'ok',
      cancelText: 'no'
    })
    await waitRender()

    const wrapper = document.querySelector<HTMLElement>('.vxp-confirm')!
    expect(wrapper).toBeTruthy()
    const buttons = wrapper.querySelectorAll<HTMLButtonElement>('.vxp-confirm__button')
    buttons[1].click()
    await nextTick()
    await expect(promise).resolves.toEqual(true)
  })

  it('title', async () => {
    const Confirm = createConfirm()

    Confirm.open({
      title: 'title',
      content: 'content'
    })
    await waitRender()

    const wrapper = document.querySelector<HTMLElement>('.vxp-confirm')!
    expect(wrapper).toBeTruthy()
    expect(wrapper.querySelector<HTMLElement>('.vxp-confirm__title')).toBeTruthy()
    expect(wrapper.querySelector<HTMLElement>('.vxp-confirm__title')!.textContent).toEqual('title')
  })

  it('closable', async () => {
    const Confirm = createConfirm()

    Confirm.open({
      title: 'title',
      content: 'content',
      closable: true
    })
    await waitRender()

    const wrapper = document.querySelector<HTMLElement>('.vxp-confirm')!
    expect(wrapper).toBeTruthy()
    expect(wrapper.querySelector<HTMLElement>('.vxp-confirm__close')).toBeTruthy()
  })

  it('content align and actions align', async () => {
    const Confirm = createConfirm()

    Confirm.open({
      content: 'content',
      contentAlign: 'left',
      actionsAlign: 'right'
    })
    await waitRender()

    const wrapper = document.querySelector<HTMLElement>('.vxp-confirm')!
    expect(wrapper).toBeTruthy()
    expect(
      wrapper
        .querySelector<HTMLElement>('.vxp-confirm__body')!
        .classList.contains('vxp-confirm__body--left')
    ).toBe(true)
    expect(
      wrapper
        .querySelector<HTMLElement>('.vxp-confirm__footer')!
        .classList.contains('vxp-confirm__footer--right')
    ).toBe(true)
  })

  it('cancelable false', async () => {
    const Confirm = createConfirm()

    Confirm.open({
      content: 'content',
      cancelable: false
    })
    await waitRender()

    const wrapper = document.querySelector<HTMLElement>('.vxp-confirm')!
    expect(wrapper).toBeTruthy()
    const buttons = wrapper.querySelectorAll<HTMLButtonElement>('.vxp-confirm__button')
    expect(buttons.length).toBe(1)
    expect(buttons[0].classList.contains('vxp-confirm__button--confirm')).toBe(true)
  })

  it('transferTo', async () => {
    const Confirm = createConfirm()
    const el = document.createElement('div')
    Confirm.transferTo(el)

    await nextTick()
    expect(el.querySelector('.vxp-confirm')).toBeTruthy()
  })
})
