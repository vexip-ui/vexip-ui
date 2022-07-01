import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Select } from '..'

describe('Select', () => {
  it('render', () => {
    const wrapper = mount(Select)

    expect(wrapper.classes()).toContain('vxp-select-vars')
  })
})
