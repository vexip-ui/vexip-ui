import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Badge } from '..'


describe('Badge', () => {
  it('render', () => {
    const wrapper = mount(() => <Badge content={10}><div class={'text'}>{'Text'}</div></Badge>)

    expect(wrapper.classes()).toContain('vxp-badge-vars')
    expect(wrapper.find('.text').text()).toBe('Text')
    expect(wrapper.find('.vxp-badge__content').exists()).toBe(true)
    expect(wrapper.find('.vxp-badge__content').text()).toBe('10')
  })

  it('dot', () => {
    const wrapper = mount(Badge, {
      props: { isDot: true }
    })

    expect(wrapper.classes()).toContain('vxp-badge--is-dot')
  })

  it('types', () => {
    ;(['error', 'primary', 'success', 'warning', 'info', 'disabled'] as const).forEach(type => {
      const wrapper = mount(() => <Badge type={type}></Badge>)

      if (type === 'error') {
        expect(wrapper.find('.vxp-badge__content').classes()).not.toContain(`vxp-badge__content--${type}`)
      } else {
        expect(wrapper.find('.vxp-badge__content').classes()).toContain(`vxp-badge__content--${type}`)
      }
    })
  })

  it('max', async () => {
    const wrapper = mount(Badge, {
      props: { content: 100 }
    })

    expect(wrapper.find('.vxp-badge__content').text()).toBe('100')

    await wrapper.setProps({ max: 99 })
    expect(wrapper.find('.vxp-badge__content').text()).toBe('99+')
  })

  it('color', async () => {
    const wrapper = mount(() => <Badge color={'cyan'}></Badge>)

    expect(wrapper.find('.vxp-badge__content').attributes('style')).toContain('background-color: cyan;')
  })
})
