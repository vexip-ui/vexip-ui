import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Dropdown } from '..'

describe('Dropdown', () => {
  it('render', () => {
    const wrapper = mount(Dropdown)

    expect(wrapper.classes()).toContain('vxp-dropdown-vars')
  })
})
