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

  it('empty', () => {
    const wrapper = mount(() => <Icon></Icon>)

    expect(wrapper.find('.vxp-icon').exists()).toBe(true)
    expect(wrapper.element.innerHTML).toEqual('')
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

    await wrapper.setProps({ scale: NaN })
    expect(wrapper.attributes('style')).toBeUndefined()
  })

  it('custom effect', async () => {
    const wrapper = mount(Icon, {
      props: { effect: 'effect', icon: Spinner }
    })

    expect(wrapper.classes()).toContain('effect')
  })

  it('size', async () => {
    const wrapper = mount(Icon, {
      props: { icon: Spinner }
    })

    expect(wrapper.attributes('style')).toBeUndefined()

    await wrapper.setProps({ size: '30px' })
    expect(wrapper.attributes('style')).toContain('font-size: 30px;')

    await wrapper.setProps({ scale: 2 })
    expect(wrapper.attributes('style')).toContain('font-size: 30px;')
  })

  it('color', () => {
    const wrapper = mount(() => <Icon icon={Spinner} color={'orange'}></Icon>)

    expect(wrapper.find('.vxp-icon').attributes('style')).toContain('color: orange;')
  })

  it('rotate', async () => {
    const wrapper = mount(Icon, {
      props: { icon: Spinner, rotate: 1 }
    })

    expect(wrapper.attributes('style')).toContain('--vxp-icon-rotate: 0.25turn;')

    await wrapper.setProps({ rotate: '30deg' })
    expect(wrapper.attributes('style')).toContain('--vxp-icon-rotate: 30deg;')

    await wrapper.setProps({ rotate: '1turn' })
    expect(wrapper.attributes('style')).toContain('--vxp-icon-rotate: 1turn;')

    await wrapper.setProps({ rotate: '100grad' })
    expect(wrapper.attributes('style')).toContain('--vxp-icon-rotate: 100grad;')

    await wrapper.setProps({ rotate: '1rad' })
    expect(wrapper.attributes('style')).toContain('--vxp-icon-rotate: 1rad;')

    await wrapper.setProps({ rotate: '-2abc' })
    expect(wrapper.attributes('style')).toContain('--vxp-icon-rotate: -0.5turn;')

    await wrapper.setProps({ rotate: '0deg' })
    expect(wrapper.attributes('style')).toBeUndefined()
  })
})
