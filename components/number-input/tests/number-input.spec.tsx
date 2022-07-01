import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { NumberInput } from '..'

describe('NumberInput', () => {
  it('render', () => {
    const wrapper = mount(NumberInput)

    expect(wrapper.classes()).toContain('vxp-input-vars')
  })
})
