import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Collapse } from '..'

describe('Collapse', () => {
  it('render', () => {
    const wrapper = mount(Collapse)

    expect(wrapper.classes()).toContain('vxp-collapse-vars')
  })
})
