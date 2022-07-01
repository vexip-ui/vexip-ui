import { describe, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { ResizeObserver } from '..'

describe('ResizeObserver', () => {
  it('render', () => {
    mount(ResizeObserver)
  })
})
