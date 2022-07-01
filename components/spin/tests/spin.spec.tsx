import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Spin } from '..'

describe('Spin', () => {
  it('render', () => {
    const wrapper = mount(Spin)

    expect(wrapper.classes()).toContain('vxp-spin-vars')
  })
})
