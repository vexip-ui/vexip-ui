import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Linker } from '..'

describe('Linker', () => {
  it('render', () => {
    const wrapper = mount(Linker)

    expect(wrapper.classes()).toContain('vxp-linker-vars')
  })
})
