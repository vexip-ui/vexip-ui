import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Switch } from '..'

describe('Switch', () => {
  it('render', () => {
    const wrapper = mount(Switch)

    expect(wrapper.classes()).toContain('vxp-switch-vars')
  })
})
