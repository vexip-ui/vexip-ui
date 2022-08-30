import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { Renderer } from '..'

describe('Renderer', () => {
  it('render', () => {
    const renderer = () => <span class={'test'}></span>
    const wrapper = mount(() => <Renderer renderer={renderer}></Renderer>)

    expect(wrapper.find('.test').exists()).toBe(true)
  })
})
