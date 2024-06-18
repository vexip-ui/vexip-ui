import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { FrameArea } from '..'

describe('FrameArea', () => {
  it('render', () => {
    const wrapper = mount(FrameArea)

    expect(wrapper.classes()).toContain('vxp-frame-area-vars')
  })
})
