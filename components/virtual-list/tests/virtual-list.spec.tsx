import { describe, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { VirtualList } from '..'

describe('VirtualList', () => {
  it('render', () => {
    mount(VirtualList)
  })
})
