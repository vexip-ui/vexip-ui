import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Anchor } from '..'

describe('Anchor', () => {
  it('render', () => {
    const wrapper = mount(Anchor)

    expect(wrapper.classes()).toContain('vxp-anchor-vars')
  })
})
