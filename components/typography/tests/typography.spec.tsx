import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Typography } from '..'

describe('Typography', () => {
  it('render', () => {
    const wrapper = mount(Typography)

    expect(wrapper.classes()).toContain('vxp-typography-vars')
  })
})
