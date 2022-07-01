import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Masker } from '..'

describe('Masker', () => {
  it('render', () => {
    const wrapper = mount(Masker)

    expect(wrapper.find('.vxp-masker').classes()).toContain('vxp-masker-vars')
  })
})
