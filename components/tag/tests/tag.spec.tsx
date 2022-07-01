import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Tag } from '..'

describe('Tag', () => {
  it('render', () => {
    const wrapper = mount(Tag)

    expect(wrapper.classes()).toContain('vxp-tag-vars')
  })
})
