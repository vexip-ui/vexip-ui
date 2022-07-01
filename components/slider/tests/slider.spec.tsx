import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Slider } from '..'

describe('Slider', () => {
  it('render', () => {
    const wrapper = mount(Slider)

    expect(wrapper.classes()).toContain('vxp-slider-vars')
  })
})
