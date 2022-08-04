import { describe, it, expect, vi } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { Checkbox } from '..'
import { CheckboxGroup } from '@/components/checkbox-group'

const TEXT = 'Text'
const OPTIONS = ['Option 1', 'Option 2', 'Option 3', 'Option 4']

describe('Checkbox', () => {
  it('render', () => {
    const wrapper = mount(Checkbox)

    expect(wrapper.classes()).toContain('vxp-checkbox-vars')
    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true)
  })

  it('label', async () => {
    const wrapper = mount(Checkbox)

    expect(wrapper.find('.vxp-checkbox__label').exists()).toBe(false)

    await wrapper.setProps({ label: TEXT })
    expect(wrapper.find('.vxp-checkbox__label').exists()).toBe(true)
    expect(wrapper.find('.vxp-checkbox__label').text()).toEqual(TEXT)
  })

  it('slot', () => {
    const wrapper = mount(() => (
      <Checkbox label={TEXT}>
        {{
          default: () => <span class={'label'}></span>
        }}
      </Checkbox>
    ))

    expect(wrapper.find('.label').exists()).toBe(true)
    expect(wrapper.find('.vxp-checkbox__label').text()).toEqual('')
  })

  it('size', () => {
    const wrapper = mount(() => <Checkbox size={'large'}></Checkbox>)

    expect(wrapper.find('.vxp-checkbox').classes()).toContain('vxp-checkbox--large')
  })

  it('toggle checked', async () => {
    const wrapper = mount(Checkbox)

    expect(wrapper.classes()).not.toContain('vxp-checkbox--checked')

    await wrapper.find('input[type="checkbox"]').trigger('change')
    await nextTick()
    expect(wrapper.classes()).toContain('vxp-checkbox--checked')

    await wrapper.find('input[type="checkbox"]').trigger('change')
    await nextTick()
    expect(wrapper.classes()).not.toContain('vxp-checkbox--checked')
  })

  it('change event', async () => {
    const onChange = vi.fn()
    const wrapper = mount(() => <Checkbox checked={false} onChange={onChange}></Checkbox>)

    await wrapper.find('input[type="checkbox"]').trigger('change')
    expect(onChange).toHaveBeenCalled()
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('disabled', async () => {
    const onChange = vi.fn()
    const wrapper = mount(Checkbox, {
      props: {
        checked: false,
        onChange
      }
    })

    expect(wrapper.classes()).not.toContain('vxp-checkbox--disabled')

    await wrapper.setProps({ disabled: true })
    expect(wrapper.classes()).toContain('vxp-checkbox--disabled')

    await wrapper.find('input[type="checkbox"]').trigger('change')
    await nextTick()
    expect(wrapper.classes()).not.toContain('vxp-checkbox--checked')
    expect(onChange).not.toHaveBeenCalled()
  })

  it('border', async () => {
    const wrapper = mount(Checkbox)

    expect(wrapper.classes()).not.toContain('vxp-checkbox--border')

    await wrapper.setProps({ border: true })
    expect(wrapper.classes()).toContain('vxp-checkbox--border')
  })

  it('partial', async () => {
    const wrapper = mount(Checkbox, {
      props: { partial: true }
    })

    expect(wrapper.classes()).not.toContain('vxp-checkbox--partial')

    await wrapper.setProps({ control: true })
    expect(wrapper.classes()).toContain('vxp-checkbox--partial')
  })

  it('state', () => {
    (['success', 'warning', 'error'] as const).forEach(state => {
      const wrapper = mount(() => <Checkbox state={state}></Checkbox>)

      expect(wrapper.find('.vxp-checkbox').classes()).toContain(`vxp-checkbox--${state}`)
    })
  })

  it('loading lock', async () => {
    const onChange = vi.fn()
    const wrapper = mount(Checkbox, {
      props: {
        checked: false,
        onChange
      }
    })

    expect(wrapper.classes()).not.toContain('vxp-checkbox--loading')

    await wrapper.setProps({ loading: true, loadingLock: true })
    expect(wrapper.classes()).toContain('vxp-checkbox--loading')

    await wrapper.find('input[type="checkbox"]').trigger('change')
    await nextTick()
    expect(wrapper.classes()).not.toContain('vxp-checkbox--checked')
    expect(onChange).not.toHaveBeenCalled()
  })

  it('group', () => {
    const wrapper = mount(() => (
      <CheckboxGroup>
        <Checkbox></Checkbox>
        <Checkbox></Checkbox>
      </CheckboxGroup>
    ))

    expect(wrapper.find('.vxp-checkbox-group').classes()).toContain('vxp-checkbox-vars')
    expect(wrapper.findAll('.vxp-checkbox').length).toBe(2)
  })

  it('group options', () => {
    const wrapper = mount(() => <CheckboxGroup options={OPTIONS}></CheckboxGroup>)

    expect(wrapper.findAll('.vxp-checkbox').length).toBe(OPTIONS.length)
  })

  it('group value', async () => {
    const wrapper = mount(() => (
      <CheckboxGroup value={[OPTIONS[1]]} options={OPTIONS}></CheckboxGroup>
    ))

    expect(wrapper.findAll('.vxp-checkbox--checked').length).toEqual(1)
    expect(wrapper.findAllComponents(Checkbox)[1].classes()).toContain('vxp-checkbox--checked')
  })

  it('group change event', async () => {
    const onChange = vi.fn()
    const wrapper = mount(() => (
      <CheckboxGroup options={OPTIONS} onChange={onChange}></CheckboxGroup>
    ))

    await wrapper.find('input[type="checkbox"]').trigger('change')
    await nextTick()
    expect(onChange).toHaveBeenCalled()
    expect(onChange).toHaveBeenCalledWith([OPTIONS[0]])
  })

  it('group disabled', async () => {
    const onChange = vi.fn()
    const wrapper = mount(() => (
      <CheckboxGroup disabled onChange={onChange}>
        <Checkbox></Checkbox>,<Checkbox disabled></Checkbox>,<Checkbox disabled={false}></Checkbox>
      </CheckboxGroup>
    ))

    const items = wrapper.findAllComponents(Checkbox)

    items.forEach(item => {
      expect(item.classes()).toContain('vxp-checkbox--disabled')
    })

    await wrapper.find('input[type="checkbox"]').trigger('change')
    await nextTick()
    expect(onChange).not.toHaveBeenCalled()
  })

  it('group loading lock', async () => {
    const onChange = vi.fn()
    const wrapper = mount(CheckboxGroup, {
      props: { onChange },
      slots: {
        default: () => [
          <Checkbox></Checkbox>,
          <Checkbox loading={false}></Checkbox>,
          <Checkbox loading-lock={false}></Checkbox>
        ]
      }
    })

    const items = wrapper.findAllComponents(Checkbox)

    items.forEach(item => {
      expect(item.classes()).not.toContain('vxp-checkbox--loading')
    })

    await wrapper.setProps({ loading: true, loadingLock: true })
    items.forEach(item => {
      expect(item.classes()).toContain('vxp-checkbox--loading')
    })

    await wrapper.find('input[type="checkbox"]').trigger('change')
    await nextTick()
    expect(onChange).not.toHaveBeenCalled()
  })

  it('group state', () => {
    (['success', 'warning', 'error'] as const).forEach(state => {
      const wrapper = mount(() => (
        <CheckboxGroup state={state}>
          <Checkbox></Checkbox>,<Checkbox state={'default'}></Checkbox>
        </CheckboxGroup>
      ))

      const items = wrapper.findAllComponents(Checkbox)
      items.forEach(item => {
        expect(item.classes()).toContain(`vxp-checkbox--${state}`)
      })
    })
  })

  it('group size', () => {
    const wrapper = mount(() => (
      <CheckboxGroup size={'large'}>
        <Checkbox></Checkbox>,<Checkbox size={'default'}></Checkbox>
      </CheckboxGroup>
    ))

    const items = wrapper.findAllComponents(Checkbox)
    items.forEach(item => {
      expect(item.classes()).toContain('vxp-checkbox--large')
    })
  })

  it('group vertical', () => {
    const wrapper = mount(() => <CheckboxGroup vertical></CheckboxGroup>)

    expect(wrapper.find('.vxp-checkbox-group').classes()).toContain('vxp-checkbox-group--vertical')
  })

  it('group border', () => {
    const wrapper = mount(() => <CheckboxGroup border></CheckboxGroup>)

    expect(wrapper.find('.vxp-checkbox-group').classes()).toContain('vxp-checkbox-group--border')
  })

  it('group check all', async () => {
    const onChange = vi.fn()
    const wrapper = mount(() => (
      <CheckboxGroup onChange={onChange}>
        <Checkbox control></Checkbox>
        {OPTIONS.map(value => (
          <Checkbox value={value}></Checkbox>
        ))}
      </CheckboxGroup>
    ))

    const items = wrapper.findAllComponents(Checkbox)
    const control = items[0]
    const others = items.slice(1)

    await others[1].find('input[type="checkbox"]').trigger('change')
    await nextTick()

    expect(control.classes()).toContain('vxp-checkbox--partial')

    await control.find('input[type="checkbox"]').trigger('change')
    await nextTick()

    expect(control.classes()).not.toContain('vxp-checkbox--partial')
    items.forEach(item => {
      expect(item.classes()).toContain('vxp-checkbox--checked')
    })
  })
})
