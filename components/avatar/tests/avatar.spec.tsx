import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Avatar } from '..'
import { User } from '@vexip-ui/icons'

const IMAGE = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs='

describe('AutoComplete', () => {
  it('render', () => {
    const wrapper = mount(Avatar)

    expect(wrapper.find('.vxp-avatar').classes()).toContain('vxp-avatar-vars')
  })

  it('size', async () => {
    const wrapper = mount(Avatar, {
      props: { size: 'large' }
    })

    expect(wrapper.find('.vxp-avatar').classes()).toContain('vxp-avatar--large')

    await wrapper.setProps({ size: 48 })
    expect(wrapper.find('.vxp-avatar').attributes('style')).toContain('--vxp-avatar-size: 48px;')
  })

  it('circle', () => {
    const wrapper = mount(() => <Avatar circle></Avatar>)

    expect(wrapper.find('.vxp-avatar').classes()).toContain('vxp-avatar--circle')
  })

  it('image avatar', () => {
    const wrapper = mount(() => <Avatar src={IMAGE}></Avatar>)

    expect(wrapper.find('.vxp-avatar__image').exists()).toBe(true)
  })

  it('image fallback', async () => {
    const wrapper = mount(Avatar, {
      props: {
        src: 'unknown image',
        fallbackSrc: IMAGE
      }
    })

    expect(wrapper.find('.vxp-avatar__image').attributes('src')).toEqual('unknown image')

    await wrapper.find('.vxp-avatar__image').trigger('error')
    expect(wrapper.emitted()).toHaveProperty('error')
    expect(wrapper.find('.vxp-avatar__image').attributes('src')).toEqual(IMAGE)
  })

  it('icon avatar', () => {
    const wrapper = mount(() => <Avatar icon={User}></Avatar>)

    expect(wrapper.find('.vxp-avatar__icon').exists()).toBe(true)
    expect(wrapper.findComponent(User).exists()).toBe(true)
  })

  it('text avatar', () => {
    const wrapper = mount(() => <Avatar>{'Qmhc'}</Avatar>)

    expect(wrapper.text()).toBe('Qmhc')
  })
})
