import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { Video } from '..'

describe('Video', () => {
  it('render', () => {
    const wrapper = mount(Video)

    expect(wrapper.find('.vxp-video').classes()).toContain('vxp-video-vars')
  })
})
