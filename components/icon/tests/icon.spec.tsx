import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { Spinner } from '@vexip-ui/icons'
import { Icon } from '..'

describe('Icon', () => {
  it('render', () => {
    const wrapper = mount(() => (
      <Icon>
        <Spinner></Spinner>
      </Icon>
    ))

    expect(wrapper.find('.vxp-icon').exists()).toBe(true)
    expect(wrapper.findComponent(Spinner).exists()).toBe(true)
    expect(wrapper.find('.vxp-icon').attributes('aria-hidden')).toEqual('true')
  })

  it('icon prop', () => {
    const wrapper = mount(() => <Icon icon={Spinner}></Icon>)

    expect(wrapper.findComponent(Spinner).exists()).toBe(true)
  })

  it('label', () => {
    const wrapper = mount(() => (
      <Icon label={'icon'}>
        <Spinner></Spinner>
      </Icon>
    ))

    expect(wrapper.find('.vxp-icon').attributes('aria-label')).toEqual('icon')
    expect(wrapper.find('.vxp-icon').attributes('role')).toEqual('img')
  })

  it('title', () => {
    const wrapper = mount(() => (
      <Icon title={'icon'}>
        <Spinner></Spinner>
      </Icon>
    ))

    expect(wrapper.find('.vxp-icon').attributes('title')).toEqual('icon')
    expect(wrapper.find('.vxp-icon').attributes('role')).toEqual('img')
  })

  it('spin', async () => {
    const wrapper = mount(Icon, {
      props: { effect: 'spin-in', icon: Spinner }
    })

    expect(wrapper.classes()).toContain('vxp-icon--spin-in')

    await wrapper.setProps({ effect: 'spin-out' })
    expect(wrapper.classes()).toContain('vxp-icon--spin-out')
  })

  it('pulse', async () => {
    const wrapper = mount(Icon, {
      props: { effect: 'pulse-in', icon: Spinner }
    })

    expect(wrapper.classes()).toContain('vxp-icon--pulse-in')

    await wrapper.setProps({ effect: 'pulse-out' })
    expect(wrapper.classes()).toContain('vxp-icon--pulse-out')
  })

  it('flip', () => {
    (['horizontal', 'vertical', 'both'] as const).forEach(flip => {
      const wrapper = mount(Icon, {
        props: { flip, icon: Spinner }
      })

      expect(wrapper.classes()).toContain(`vxp-icon--flip-${flip}`)
    })
  })

  it('scale', async () => {
    const wrapper = mount(Icon, {
      props: { icon: Spinner }
    })

    expect(wrapper.attributes('style')).toBeUndefined()

    await wrapper.setProps({ scale: 2 })
    expect(wrapper.attributes('style')).toContain('font-size: 2em;')
  })
})
