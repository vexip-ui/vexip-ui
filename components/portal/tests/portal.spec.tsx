import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { Portal } from '..'

const TEXT = 'Text'

describe('Portal', () => {
  it('render', () => {
    const wrapper = mount(() => (
      <Portal>
        <span class={'test'}>{TEXT}</span>
      </Portal>
    ))

    expect(wrapper.find('.test').exists()).toBe(true)
    expect(wrapper.find('.test').text()).toEqual(TEXT)
  })

  it('transfer', async () => {
    mount(() => (
      <Portal to={'body'}>
        <span class={'test'}>{TEXT}</span>
      </Portal>
    ))

    expect(document.body.querySelector('.test')).toBeTruthy()
  })
})
