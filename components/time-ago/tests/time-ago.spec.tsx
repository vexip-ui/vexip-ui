import { describe, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { TimeAgo } from '..'

describe('TimeAgo', () => {
  it('render', () => {
    mount(TimeAgo)
  })
})
