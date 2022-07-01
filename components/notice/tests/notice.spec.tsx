import { describe, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { Notice } from '..'

describe('Notice', () => {
  it('render', () => {
    mount(Notice)
  })
})
