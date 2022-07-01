import { describe, it, expect, vi } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { AutoComplete } from '..'
import { Select } from '@/components/select'

import type { DOMWrapper } from '@vue/test-utils'

const OPTIONS = [
  'Option 1',
  'Option 2',
  'Option 3',
  'Option 4'
]

function getValue(wrapper: DOMWrapper<Element>) {
  return (wrapper.element as HTMLInputElement).value
}

describe('AutoComplete', () => {
  it('render', () => {
    const wrapper = mount(AutoComplete, {
      props: { value: '1', options: OPTIONS }
    })

    expect(wrapper.find('.vxp-auto-complete__input').exists()).toBe(true)
    expect(getValue(wrapper.find('.vxp-auto-complete__input'))).toBe('1')
  })

  it('disabled', async () => {
    const wrapper = mount(AutoComplete)

    expect(wrapper.find('.vxp-auto-complete__input').attributes('disabled')).toBe(undefined)

    await wrapper.setProps({ disabled: true })
    expect(wrapper.find('.vxp-auto-complete__input').attributes('disabled')).toBe('')
  })

  it('placeholder', async () => {
    const wrapper = mount(AutoComplete, {
      props: { placeholder: '1' }
    })

    expect(wrapper.find('.vxp-auto-complete__input').attributes('placeholder')).toBe('1')

    await wrapper.setProps({ placeholder: '2' })
    expect(wrapper.find('.vxp-auto-complete__input').attributes('placeholder')).toBe('2')
  })

  it('clearable', async () => {
    const handleClear = vi.fn()
    const wrapper = mount(AutoComplete, {
      props: {
        clearable: true,
        options: OPTIONS,
        onClear: handleClear
      }
    })

    expect(wrapper.find('.vxp-select__clear').exists()).toBe(false)

    await wrapper.setProps({ value: OPTIONS[0] })
    await wrapper.find('.vxp-select__selector').trigger('mouseenter')

    expect(wrapper.find('.vxp-select__clear').exists()).toBe(true)

    wrapper.getComponent(Select).vm.handleClear()
    await nextTick()

    expect(wrapper.emitted()).toHaveProperty('clear')
    expect(handleClear).toHaveBeenCalled()
    expect(getValue(wrapper.find('.vxp-auto-complete__input'))).toEqual('')
  })

  it('transfer', async () => {
    const wrapper = mount(AutoComplete)

    expect(document.body.querySelector('.vxp-select__popper')).toBeNull()

    await wrapper.setProps({ transfer: true })
    expect(document.body.querySelector('.vxp-select__popper')).toBeDefined()
  })
})
