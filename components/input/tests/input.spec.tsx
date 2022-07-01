import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Input } from '..'

describe('Input', () => {
  it('render', () => {
    const wrapper = mount(Input)

    expect(wrapper.classes()).toContain('vxp-input-vars')
  })
})
