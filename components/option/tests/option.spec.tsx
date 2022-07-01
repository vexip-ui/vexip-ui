import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Option } from '..'

describe('Option', () => {
  it('render', () => {
    const wrapper = mount(Option)

    expect(wrapper.classes()).toContain('vxp-option-vars')
  })
})
