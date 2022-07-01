import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Table } from '..'

describe('Table', () => {
  it('render', () => {
    const wrapper = mount(Table)

    expect(wrapper.classes()).toContain('vxp-table-vars')
  })
})
