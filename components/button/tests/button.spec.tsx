import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Button } from '..'

describe('Button', () => {
  it('render', () => {
    const wrapper = mount(Button)

    expect(wrapper.classes()).toContain('vxp-button-vars')
  })
})
