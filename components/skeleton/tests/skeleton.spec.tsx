import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Skeleton } from '..'

describe('Skeleton', () => {
  it('render', () => {
    const wrapper = mount(Skeleton)

    expect(wrapper.classes()).toContain('vxp-skeleton-vars')
  })
})
