import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Cascader } from '..'

describe('Cascader', () => {
  it('render', () => {
    const wrapper = mount(Cascader)

    expect(wrapper.classes()).toContain('vxp-cascader-vars')
  })
})
