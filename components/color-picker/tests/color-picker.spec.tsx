import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { ColorPicker } from '..'

describe('ColorPicker', () => {
  it('render', () => {
    const wrapper = mount(ColorPicker)

    expect(wrapper.classes()).toContain('vxp-color-picker-vars')
  })
})
