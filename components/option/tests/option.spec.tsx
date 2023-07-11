import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import { Option } from '..'

const TEXT = 'Text'

describe('Option', () => {
  it('render', () => {
    const wrapper = mount(Option, {
      props: { label: TEXT }
    })

    expect(wrapper.classes()).toContain('vxp-option-vars')
    expect(wrapper.attributes('role')).toEqual('option')
    expect(wrapper.text()).toEqual(TEXT)
  })

  it('value', () => {
    const wrapper = mount(() => <Option value={TEXT}></Option>)

    expect(wrapper.find('.vxp-option').text()).toEqual(TEXT)
  })

  it('slot', () => {
    const wrapper = mount(() => (
      <Option label={TEXT}>
        {{
          default: () => <span class={'option'}></span>
        }}
      </Option>
    ))

    expect(wrapper.find('.option').exists()).toBe(true)
    expect(wrapper.text()).toEqual('')
  })

  it('select event', async () => {
    const onSelect = vi.fn()
    const wrapper = mount(() => <Option onSelect={onSelect}></Option>)

    await wrapper.trigger('click')
    expect(onSelect).toHaveBeenCalled()
  })

  it('disabled', async () => {
    const onSelect = vi.fn()
    const wrapper = mount(() => <Option disabled onSelect={onSelect}></Option>)

    expect(wrapper.find('.vxp-option').classes()).toContain('vxp-option--disabled')

    await wrapper.trigger('click')
    expect(onSelect).not.toHaveBeenCalled()
  })

  it('title', () => {
    const wrapper = mount(() => <Option value={TEXT} title={TEXT}></Option>)

    expect(wrapper.find('.vxp-option').attributes('title')).toEqual(TEXT)
  })

  it('state classes', async () => {
    const wrapper = mount(Option, {
      props: {
        divided: true,
        hitting: true,
        noHover: true,
        selected: true
      }
    })

    expect(wrapper.classes()).toContain('vxp-option--divided')
    expect(wrapper.classes()).toContain('vxp-option--hitting')
    expect(wrapper.classes()).toContain('vxp-option--no-hover')
    expect(wrapper.classes()).toContain('vxp-option--selected')

    await wrapper.setProps({ disabled: true })
    expect(wrapper.classes()).not.toContain('vxp-option--selected')
  })
})
