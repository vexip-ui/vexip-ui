import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { Fence } from '..'

describe('Fence', () => {
  it('render', () => {
    const wrapper = mount(Fence)

    expect(wrapper.classes()).toContain('vxp-fence-vars')
  })
})
