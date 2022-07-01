import { describe, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { ConfigProvider } from '..'

describe('ConfigProvider', () => {
  it('render', () => {
    mount(ConfigProvider)
  })
})
