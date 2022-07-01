import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Viewer } from '..'

describe('Viewer', () => {
  it('render', () => {
    const wrapper = mount(Viewer)

    expect(wrapper.classes()).toContain('vxp-viewer-vars')
  })
})
