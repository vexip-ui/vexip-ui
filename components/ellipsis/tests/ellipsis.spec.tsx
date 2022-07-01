import { describe, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { Ellipsis } from '..'

describe('Ellipsis', () => {
  it('render', () => {
    mount(Ellipsis)
  })
})
