import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Bubble } from '..'

describe('Bubble', () => {
  it('render', () => {
    const wrapper = mount(Bubble)

    expect(wrapper.classes()).toContain('vxp-bubble-vars')
  })
})
