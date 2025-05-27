import { DropdownList } from '@/components/dropdown-list'
import { DropdownItem } from '@/components/dropdown-item'

import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'

import { Dropdown } from '..'

vi.useFakeTimers()

describe('Dropdown', () => {
  it('render', () => {
    const wrapper = mount(() => (
      <Dropdown visible>
        {{
          default: () => 'Dropdown',
          drop: () => (
            <DropdownList>
              <DropdownItem>{'1'}</DropdownItem>
              <DropdownItem>{'2'}</DropdownItem>
              <DropdownItem>{'3'}</DropdownItem>
            </DropdownList>
          ),
        }}
      </Dropdown>
    ))

    expect(wrapper.find('.vxp-dropdown').classes()).toContain('vxp-dropdown-vars')
    expect(wrapper.find('.vxp-dropdown__trigger').exists()).toBe(true)
    expect(wrapper.find('.vxp-dropdown__trigger').text()).toEqual('Dropdown')
    expect(wrapper.find('.vxp-dropdown__popper').exists()).toBe(true)
    expect(wrapper.find('.vxp-dropdown__list').exists()).toBe(true)

    const items = wrapper.findAll('.vxp-dropdown__item')
    expect(items.length).toEqual(3)
    expect(items[0].text()).toEqual('1')
    expect(items[1].text()).toEqual('2')
  })

  it('transfer', async () => {
    const wrapper = mount(() => <Dropdown transfer visible></Dropdown>)

    await nextTick()
    await nextTick()
    expect(wrapper.find('.vxp-dropdown__popper').exists()).toBe(false)
    expect(document.querySelector('.vxp-dropdown__popper')).not.toBeNull()
  })

  it('visible', async () => {
    const wrapper = mount(Dropdown)

    expect(wrapper.classes()).not.toContain('vxp-dropdown--visible')

    await wrapper.setProps({ visible: true })
    expect(wrapper.classes()).toContain('vxp-dropdown--visible')
  })

  it('toggle visible', async () => {
    const onToggle = vi.fn()
    const wrapper = mount(() => (
      <Dropdown onToggle={onToggle}>
        {{
          default: () => 'Dropdown',
          drop: () => (
            <DropdownList>
              <DropdownItem>{'1'}</DropdownItem>
            </DropdownList>
          ),
        }}
      </Dropdown>
    ))

    expect(wrapper.find('.vxp-dropdown').classes()).not.toContain('vxp-dropdown--visible')
    expect(wrapper.find('.vxp-dropdown__popper').exists()).toBe(false)

    await wrapper.find('.vxp-dropdown').trigger('mouseenter')
    vi.runOnlyPendingTimers()
    await nextTick()
    expect(wrapper.find('.vxp-dropdown').classes()).toContain('vxp-dropdown--visible')
    expect(wrapper.find('.vxp-dropdown__popper').exists()).toBe(true)
    expect(onToggle).toHaveBeenCalledTimes(1)
    expect(onToggle).toHaveBeenLastCalledWith(true)

    await wrapper.find('.vxp-dropdown').trigger('mouseleave')
    vi.runOnlyPendingTimers()
    await nextTick()
    expect(wrapper.find('.vxp-dropdown').classes()).not.toContain('vxp-dropdown--visible')
    expect(wrapper.find('.vxp-dropdown__popper').exists()).toBe(false)
    expect(onToggle).toHaveBeenCalledTimes(2)
    expect(onToggle).toHaveBeenLastCalledWith(false)
  })

  it('item select', async () => {
    const onSelect = vi.fn()
    const wrapper = mount(() => (
      <Dropdown visible onSelect={onSelect}>
        {{
          default: () => 'Dropdown',
          drop: () => (
            <DropdownList>
              <DropdownItem label={'1'}>{'1'}</DropdownItem>
              <DropdownItem label={'2'}>{'2'}</DropdownItem>
              <DropdownItem label={'3'}>{'3'}</DropdownItem>
            </DropdownList>
          ),
        }}
      </Dropdown>
    ))
    const items = wrapper.findAll('.vxp-dropdown__item')

    await items[1].trigger('click')
    expect(onSelect).toHaveBeenCalled()
    expect(onSelect).toHaveBeenCalledWith(['2'], [{}])
    expect(wrapper.find('.vxp-dropdown').classes()).not.toContain('vxp-dropdown--visible')
  })

  it('item disabled', async () => {
    const onSelect = vi.fn()
    const wrapper = mount(() => (
      <Dropdown visible onSelect={onSelect}>
        {{
          default: () => 'Dropdown',
          drop: () => (
            <DropdownList>
              <DropdownItem label={'1'}>{'1'}</DropdownItem>
              <DropdownItem label={'2'}>{'2'}</DropdownItem>
              <DropdownItem label={'3'} disabled>
                {'3'}
              </DropdownItem>
            </DropdownList>
          ),
        }}
      </Dropdown>
    ))
    const items = wrapper.findAll('.vxp-dropdown__item')

    expect(items[2].classes()).toContain('vxp-dropdown__item--disabled')

    await items[2].trigger('click')
    expect(onSelect).not.toHaveBeenCalled()
    expect(wrapper.find('.vxp-dropdown').classes()).toContain('vxp-dropdown--visible')
  })

  it('click trigger', async () => {
    const onToggle = vi.fn()
    const wrapper = mount(() => (
      <Dropdown trigger={'click'} onToggle={onToggle}>
        {{
          default: () => 'Dropdown',
          drop: () => (
            <DropdownList>
              <DropdownItem>{'1'}</DropdownItem>
            </DropdownList>
          ),
        }}
      </Dropdown>
    ))

    expect(wrapper.find('.vxp-dropdown').classes()).not.toContain('vxp-dropdown--visible')
    expect(wrapper.find('.vxp-dropdown__popper').exists()).toBe(false)

    await wrapper.find('.vxp-dropdown__trigger').trigger('click')
    vi.runOnlyPendingTimers()
    await nextTick()
    expect(wrapper.find('.vxp-dropdown').classes()).toContain('vxp-dropdown--visible')
    expect(wrapper.find('.vxp-dropdown__popper').exists()).toBe(true)
    expect(onToggle).toHaveBeenCalledTimes(1)
    expect(onToggle).toHaveBeenLastCalledWith(true)

    await wrapper.find('.vxp-dropdown__trigger').trigger('click')
    vi.runOnlyPendingTimers()
    await nextTick()
    expect(wrapper.find('.vxp-dropdown').classes()).not.toContain('vxp-dropdown--visible')
    expect(wrapper.find('.vxp-dropdown__popper').exists()).toBe(false)
    expect(onToggle).toHaveBeenCalledTimes(2)
    expect(onToggle).toHaveBeenLastCalledWith(false)
  })

  it('nesting select', async () => {
    const onSelect = vi.fn()
    const wrapper = mount(() => (
      <Dropdown visible onSelect={onSelect}>
        {{
          default: () => 'Dropdown',
          drop: () => (
            <DropdownList>
              <DropdownItem label={'1'}>{'1'}</DropdownItem>
              <Dropdown class={'inner-dropdown'}>
                {{
                  default: () => <DropdownItem label={'2'}>{'2'}</DropdownItem>,
                  drop: () => (
                    <DropdownList>
                      <DropdownItem label={'2-1'}>{'2-1'}</DropdownItem>
                      <DropdownItem label={'2-2'}>{'2-2'}</DropdownItem>
                    </DropdownList>
                  ),
                }}
              </Dropdown>
            </DropdownList>
          ),
        }}
      </Dropdown>
    ))
    const innerDropdown = wrapper.find('.inner-dropdown')

    expect(innerDropdown.exists()).toBe(true)

    await innerDropdown.trigger('mouseenter')
    vi.runOnlyPendingTimers()
    await nextTick()
    expect(innerDropdown.classes()).toContain('vxp-dropdown--visible')
    expect(onSelect).not.toHaveBeenCalled()

    await innerDropdown.find('.vxp-dropdown__popper').find('.vxp-dropdown__item').trigger('click')
    expect(onSelect).toHaveBeenCalled()
    expect(onSelect).toHaveBeenCalledWith(['2', '2-1'], [{}, {}])
    expect(wrapper.find('.vxp-dropdown').classes()).not.toContain('vxp-dropdown--visible')
    expect(wrapper.find('.inner-dropdown').exists()).toBe(false)
  })

  it('item divided', () => {
    const wrapper = mount(() => (
      <Dropdown visible>
        {{
          default: () => 'Dropdown',
          drop: () => (
            <DropdownList>
              <DropdownItem divided>{'1'}</DropdownItem>
            </DropdownList>
          ),
        }}
      </Dropdown>
    ))

    expect(wrapper.find('.vxp-dropdown__item').classes()).toContain('vxp-dropdown__item--divided')
  })

  it('drop class', () => {
    const wrapper = mount(() => <Dropdown visible drop-class={'test'}></Dropdown>)

    expect(wrapper.find('.vxp-dropdown__popper').classes()).toContain('test')
  })

  it('meta data', async () => {
    const onSelect = vi.fn()
    const wrapper = mount(() => (
      <Dropdown visible onSelect={onSelect}>
        {{
          default: () => 'Dropdown',
          drop: () => (
            <DropdownList>
              <DropdownItem label={'1'}>{'1'}</DropdownItem>
              <DropdownItem label={'2'} meta={{ a: 2 }}>
                {'2'}
              </DropdownItem>
            </DropdownList>
          ),
        }}
      </Dropdown>
    ))
    const items = wrapper.findAll('.vxp-dropdown__item')

    await items[1].trigger('click')
    expect(onSelect).toHaveBeenCalledWith(['2'], [{ a: 2 }])
  })

  it('alive', () => {
    const wrapper = mount(() => <Dropdown alive></Dropdown>)

    expect(wrapper.find('.vxp-dropdown__popper').exists()).toBe(true)
    expect(wrapper.find('.vxp-dropdown__popper').attributes('style')).toContain('display: none;')
  })
})
