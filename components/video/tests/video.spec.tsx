import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { Video } from '..'

describe('Video', () => {
  it('render', () => {
    const wrapper = mount(Video)

    expect(wrapper.classes()).toContain('vxp-video-vars')
  })
})
