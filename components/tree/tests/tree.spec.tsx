import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Tree } from '..'

describe('Tree', () => {
  it('render', () => {
    const wrapper = mount(Tree)

    expect(wrapper.classes()).toContain('vxp-tree-vars')
  })
})
