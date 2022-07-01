import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Divider } from '..'

describe('Divider', () => {
  it('render', () => {
    const wrapper = mount(Divider)

    expect(wrapper.classes()).toContain('vxp-divider-vars')
  })
})
