import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Split } from '..'

describe('Split', () => {
  it('render', () => {
    const wrapper = mount(Split)

    expect(wrapper.classes()).toContain('vxp-split-vars')
  })
})
