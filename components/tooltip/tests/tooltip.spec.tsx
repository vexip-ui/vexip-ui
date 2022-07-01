import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Tooltip } from '..'

describe('Tooltip', () => {
  it('render', () => {
    const wrapper = mount(Tooltip)

    expect(wrapper.classes()).toContain('vxp-tooltip-vars')
  })
})
