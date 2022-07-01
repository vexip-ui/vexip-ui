import { describe, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { Message } from '..'

describe('Message', () => {
  it('render', () => {
    mount(Message)
  })
})
