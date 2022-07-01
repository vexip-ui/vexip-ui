import { describe, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { NativeScroll } from '..'

describe('NativeScroll', () => {
  it('render', () => {
    mount(NativeScroll)
  })
})
