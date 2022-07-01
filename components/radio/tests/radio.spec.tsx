import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Radio } from '..'

describe('Radio', () => {
  it('render', () => {
    const wrapper = mount(Radio)

    expect(wrapper.classes()).toContain('vxp-radio-vars')
  })
})
