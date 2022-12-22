import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { CountTo } from '..'

describe('CountTo', () => {
  it('render', () => {
    const wrapper = mount(CountTo)

    expect(wrapper.classes()).toContain('vxp-count-to-vars')
  })
})
