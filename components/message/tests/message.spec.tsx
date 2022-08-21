import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Message from '../message.vue'
import { GithubB } from '@vexip-ui/icons'

describe('Message', () => {
  it('render', () => {
    const wrapper = mount(Message)

    expect(wrapper.find('.vxp-message').exists()).toBe(true)
  })

  it('render item', async () => {
    const wrapper = mount(Message)

    await wrapper.vm.add({
      content: 'text',
      icon: GithubB
    })
    const item = wrapper.find('.vxp-message__item')

    expect(item.exists()).toBe(true)
    expect(item.find('.vxp-message__icon').exists()).toBe(true)
    expect(item.findComponent(GithubB).exists()).toBe(true)
    expect(item.find('.vxp-message__content').exists()).toBe(true)
    expect(item.find('.vxp-message__content').text()).toBe('text')
  })
})
