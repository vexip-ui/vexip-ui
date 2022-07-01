import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Textarea } from '..'

describe('Textarea', () => {
  it('render', () => {
    const wrapper = mount(Textarea)

    expect(wrapper.classes()).toContain('vxp-textarea-vars')
  })
})
