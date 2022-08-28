import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Notice from '../notice.vue'
import { GithubB } from '@vexip-ui/icons'

describe('Notice', () => {
  it('render', () => {
    const wrapper = mount(Notice)

    expect(wrapper.find('.vxp-notice').exists()).toBe(true)
  })

  it('render item', async () => {
    const wrapper = mount(Notice)

    await wrapper.vm.add({
      title: 'title',
      content: 'text',
      icon: GithubB
    })
    const item = wrapper.find('.vxp-notice__item')

    expect(item.exists()).toBe(true)
    expect(item.find('.vxp-notice__icon').exists()).toBe(true)
    expect(item.findComponent(GithubB).exists()).toBe(true)
    expect(item.find('.vxp-notice__title').exists()).toBe(true)
    expect(item.find('.vxp-notice__title').text()).toBe('title')
    expect(item.find('.vxp-notice__content').exists()).toBe(true)
    expect(item.find('.vxp-notice__content').text()).toBe('text')
  })
})
