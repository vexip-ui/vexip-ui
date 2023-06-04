import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { placementWhileList } from '@vexip-ui/hooks'
import { Bubble } from '..'

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
    const wrapper = mount(Bubble, {
      props: {
        background: 'cyan',
        placement: 'right'
      }
    })

    expect(wrapper.find('.vxp-bubble').classes()).toContain('vxp-bubble--background')
    // expect(wrapper.find('.vxp-bubble__content').attributes('style')).toContain(
    //   'background-color: cyan;'
    // )
    // expect(wrapper.find('.vxp-bubble__arrow').attributes('style')).toContain(
    //   'border-inline-end-color: cyan;'
    // )
    expect(wrapper.vm.contentStyle).toMatchObject({ backgroundColor: 'cyan' })
    expect(wrapper.vm.arrowStyle).toMatchObject({ 'border-inline-end-color': 'cyan' })
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
