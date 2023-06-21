import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { Affix } from '..'

describe('Affix', () => {
  it('render', () => {
    const wrapper = mount(Affix)

    expect(wrapper.classes()).toContain('vxp-affix-vars')
  })
})
