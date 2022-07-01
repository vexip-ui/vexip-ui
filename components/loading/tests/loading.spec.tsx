import { describe, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { Loading } from '..'

describe('Loading', () => {
  it('render', () => {
    mount(Loading)
  })
})
