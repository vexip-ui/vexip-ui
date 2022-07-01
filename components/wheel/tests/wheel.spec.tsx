import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Wheel } from '..'

describe('Wheel', () => {
  it('render', () => {
    const wrapper = mount(Wheel)

    expect(wrapper.classes()).toContain('vxp-wheel-vars')
  })
})
