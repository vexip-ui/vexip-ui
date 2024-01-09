import { describe, expect, it, vi } from 'vitest'
import { getCurrentInstance, nextTick } from 'vue'
import { mount } from '@vue/test-utils'

import { Github } from 'lucide-vue-next'
import Message from '../message.vue'
import { MessageManager } from '..'

vi.useFakeTimers()

const TEXT = 'Text'

function createMessage() {
  const Message = new MessageManager()

  mount({
    setup() {
      const instance = getCurrentInstance()
      const app = instance?.appContext.app

      app?.use(Message)

      return () => <div></div>
    }
  })

  return Message
}

async function messageOpened() {
  await nextTick()
  await nextTick()
  await nextTick()
}

describe('Message', () => {
  it('render', () => {
    const wrapper = mount(Message)

    expect(wrapper.find('.vxp-message').exists()).toBe(true)
  })

  it('render item', async () => {
    const wrapper = mount(Message)

    await wrapper.vm.add({
      content: TEXT,
      icon: Github
    })
    const item = wrapper.find('.vxp-message__item')

    expect(item.exists()).toBe(true)
    expect(item.find('.vxp-message__icon').exists()).toBe(true)
    expect(item.findComponent(Github).exists()).toBe(true)
    expect(item.find('.vxp-message__content').exists()).toBe(true)
    expect(item.find('.vxp-message__content').text()).toBe(TEXT)
  })

  it('open', async () => {
    const Message = createMessage()

    Message.open(TEXT)
    await messageOpened()
    expect(document.querySelector('.vxp-message__item')).toBeTruthy()
    expect(document.querySelector('.vxp-message__content')?.textContent).toEqual(TEXT)
  })

  const types = ['info', 'success', 'warning', 'error'] as const

  types.forEach(type => {
    it(`type ${type}`, async () => {
      const Message = createMessage()

      expect(type in Message)

      Message[type](TEXT)
      await messageOpened()
      expect(document.querySelector('.vxp-message__item')).toBeTruthy()
      expect(document.querySelector('.vxp-message__content')?.textContent).toEqual(TEXT)
    })
  })

  it('closable', async () => {
    const Message = createMessage()

    Message.open({
      content: TEXT,
      closable: true
    })
    await messageOpened()
    expect(document.querySelector('.vxp-message__close')).toBeTruthy()
  })

  it('icon', async () => {
    const Message = createMessage()

    Message.open({
      content: TEXT,
      icon: Github
    })
    await messageOpened()
    expect(document.querySelector('.vxp-message__icon')).toBeTruthy()

    const icon = mount(Github)
    expect(document.querySelector('.vxp-message__icon')!.querySelector('svg')?.innerHTML).toEqual(
      icon.find('svg').element.innerHTML
    )
  })

  it('parse html', async () => {
    const Message = createMessage()

    Message.open({
      content: '<div class="test"></div>',
      parseHtml: true
    })
    await messageOpened()
    expect(document.querySelector('.test')).toBeTruthy()
  })

  it('transferTo', async () => {
    const Message = createMessage()
    const el = document.createElement('div')
    Message.transferTo(el)

    await nextTick()
    expect(el.querySelector('.vxp-message')).toBeTruthy()
  })
})
