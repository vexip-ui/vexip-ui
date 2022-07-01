import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Highlight } from '..'

describe('Highlight', () => {
  it('render', () => {
    const wrapper = mount(Highlight)

    expect(wrapper.classes()).toContain('vxp-highlight-vars')
  })
})
