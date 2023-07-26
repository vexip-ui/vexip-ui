import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { Tour } from '..'

describe('Tour', () => {
  it('render', () => {
    const wrapper = mount(Tour)

    expect(wrapper.classes()).toContain('vxp-tour-vars')
  })
})
