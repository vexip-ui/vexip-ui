import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Pagination } from '..'

describe('Pagination', () => {
  it('render', () => {
    const wrapper = mount(Pagination)

    expect(wrapper.classes()).toContain('vxp-pagination-vars')
  })
})
