import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Bubble } from '..'
import { placementWhileList } from '@vexip-ui/mixins'

describe('Bubble', () => {
  it('render', () => {
    const wrapper = mount(Bubble)

    expect(wrapper.classes()).toContain('vxp-bubble-vars')
    expect(wrapper.find('.vxp-bubble__content').exists()).toBe(true)
    expect(wrapper.find('.vxp-bubble__arrow').exists()).toBe(true)
  })

  it('placement', () => {
    placementWhileList.forEach(placement => {
      const wrapper = mount(() => <Bubble placement={placement}></Bubble>)

      expect(wrapper.find('.vxp-bubble').classes()).toContain(`vxp-bubble--${placement}`)
    })
  })

  it('background', () => {
    const wrapper = mount(() => <Bubble background={'cyan'} placement={'right'}></Bubble>)

    expect(wrapper.find('.vxp-bubble').classes()).toContain('vxp-bubble--background')
    expect(wrapper.find('.vxp-bubble__content').attributes('style')).toContain(
      'background-color: cyan;'
    )
    expect(wrapper.find('.vxp-bubble__arrow').attributes('style')).toContain(
      'border-right-color: cyan;'
    )
  })

  it('shadow', () => {
    const wrapper = mount(() => <Bubble shadow={'cyan'}></Bubble>)

    expect(wrapper.find('.vxp-bubble').classes()).toContain('vxp-bubble--shadow')
    expect(wrapper.find('.vxp-bubble__content').attributes('style')).toContain(
      'box-shadow: 0 0 4px cyan;'
    )
  })

  it('content class', () => {
    const wrapper = mount(() => <Bubble content-class={'content'}></Bubble>)

    expect(wrapper.find('.vxp-bubble__content').classes()).toContain('content')
  })
})
