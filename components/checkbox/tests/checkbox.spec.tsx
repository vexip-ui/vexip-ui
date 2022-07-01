import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Checkbox } from '..'

describe('Checkbox', () => {
  it('render', () => {
    const wrapper = mount(Checkbox)

    expect(wrapper.classes()).toContain('vxp-checkbox-vars')
  })
})
