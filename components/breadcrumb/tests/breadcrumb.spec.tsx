import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Breadcrumb } from '..'

describe('Breadcrumb', () => {
  it('render', () => {
    const wrapper = mount(Breadcrumb)

    expect(wrapper.classes()).toContain('vxp-breadcrumb-vars')
  })
})
