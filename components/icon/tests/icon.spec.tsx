import { describe, it, expect } from 'vitest'
import { Spinner } from '@vexip-ui/icons'
import { mount } from '@vue/test-utils'
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
      props: { spin: true, icon: Spinner }
    })

    expect(wrapper.classes()).toContain('vxp-icon--spin-in')

    await wrapper.setProps({ spin: 'out' })
    expect(wrapper.classes()).toContain('vxp-icon--spin-out')
  })

  it('pulse', async () => {
    const wrapper = mount(Icon, {
      props: { pulse: true, icon: Spinner }
    })

    expect(wrapper.classes()).toContain('vxp-icon--pulse-in')

    await wrapper.setProps({ pulse: 'out' })
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
