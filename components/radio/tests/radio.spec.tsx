import { describe, it, expect, vi } from 'vitest'
import { RadioGroup } from '@/components/radio-group'
import { mount } from '@vue/test-utils'
import { Radio } from '..'

const TEXT = 'Text'
const OPTIONS = ['Option 1', 'Option 2', 'Option 3', 'Option 4']

describe('Radio', () => {
  it('render', () => {
    const wrapper = mount(Radio, {
      props: { label: TEXT }
    })

    expect(wrapper.classes()).toContain('vxp-radio-vars')
    expect(wrapper.find('.vxp-radio__signal').exists()).toBe(true)
    expect(wrapper.find('.vxp-radio__label').exists()).toBe(true)
    expect(wrapper.find('.vxp-radio__label').text()).toEqual(TEXT)
    expect(wrapper.find('input[type="radio"]').exists()).toBe(true)
  })

  it('slot', () => {
    const wrapper = mount(() => (
      <Radio label={TEXT}>
        {{
          default: () => <span class={'label'}></span>
        }}
      </Radio>
    ))

    expect(wrapper.find('.label').exists()).toBe(true)
    expect(wrapper.find('.vxp-radio__label').text()).toEqual('')
  })

  it('size', async () => {
    const wrapper = mount(Radio, {
      props: { label: TEXT, size: 'large' }
    })

    expect(wrapper.find('.vxp-radio').classes()).toContain('vxp-radio--large')

    await wrapper.setProps({ size: 'small' })
    expect(wrapper.find('.vxp-radio').classes()).toContain('vxp-radio--small')
  })

  it('toggle checked', async () => {
    const wrapper = mount(Radio, {
      props: { label: TEXT }
    })

    expect(wrapper.classes()).not.toContain('vxp-radio--checked')

    await wrapper.find('input[type="radio"]').trigger('change')
    expect(wrapper.classes()).toContain('vxp-radio--checked')

    await wrapper.find('input[type="radio"]').trigger('change')
    expect(wrapper.classes()).toContain('vxp-radio--checked')
  })

  it('change event', async () => {
    const onChange = vi.fn()
    const wrapper = mount(() => <Radio label={TEXT} onChange={onChange}></Radio>)

    await wrapper.find('input[type="radio"]').trigger('change')
    expect(onChange).toHaveBeenCalled()
    expect(onChange).toHaveBeenCalledWith(TEXT)
  })

  it('disabled', async () => {
    const onChange = vi.fn()
    const wrapper = mount(Radio, {
      props: {
        label: TEXT,
        onChange
      }
    })

    expect(wrapper.classes()).not.toContain('vxp-radio--disabled')

    await wrapper.setProps({ disabled: true })
    expect(wrapper.classes()).toContain('vxp-radio--disabled')

    await wrapper.find('input[type="radio"]').trigger('change')
    expect(wrapper.classes()).not.toContain('vxp-radio--checked')
    expect(onChange).not.toHaveBeenCalled()
  })

  it('border', async () => {
    const wrapper = mount(Radio, {
      props: { label: TEXT }
    })

    expect(wrapper.classes()).not.toContain('vxp-radio--border')

    await wrapper.setProps({ border: true })
    expect(wrapper.classes()).toContain('vxp-radio--border')
  })

  it('state', () => {
    (['success', 'warning', 'error'] as const).forEach(state => {
      const wrapper = mount(() => <Radio label={TEXT} state={state}></Radio>)

      expect(wrapper.find('.vxp-radio').classes()).toContain(`vxp-radio--${state}`)
    })
  })

  it('loading', async () => {
    const wrapper = mount(Radio, {
      props: { label: TEXT }
    })

    expect(wrapper.find('.vxp-radio__signal--active').exists()).toBe(false)

    await wrapper.setProps({ loading: true })
    expect(wrapper.find('.vxp-radio__signal--active').exists()).toBe(true)
  })

  it('group', () => {
    const wrapper = mount(() => (
      <RadioGroup>
        <Radio label={'1'}></Radio>
        <Radio label={'2'}></Radio>
      </RadioGroup>
    ))

    expect(wrapper.find('.vxp-radio-group').classes()).toContain('vxp-radio-vars')
    expect(wrapper.findAll('.vxp-radio').length).toBe(2)
  })

  it('group options', () => {
    const wrapper = mount(() => <RadioGroup options={OPTIONS}></RadioGroup>)

    expect(wrapper.findAll('.vxp-radio').length).toBe(OPTIONS.length)
  })

  it('group value', async () => {
    const wrapper = mount(() => <RadioGroup value={OPTIONS[1]} options={OPTIONS}></RadioGroup>)

    expect(wrapper.findAll('.vxp-radio--checked').length).toEqual(1)
    expect(wrapper.findAllComponents(Radio)[1].classes()).toContain('vxp-radio--checked')
  })

  it('group change event', async () => {
    const onChange = vi.fn()
    const wrapper = mount(() => <RadioGroup options={OPTIONS} onChange={onChange}></RadioGroup>)

    await wrapper.find('input[type="radio"]').trigger('change')
    expect(onChange).toHaveBeenCalled()
    expect(onChange).toHaveBeenCalledWith(OPTIONS[0])
  })

  it('group disabled', async () => {
    const onChange = vi.fn()
    const wrapper = mount(() => (
      <RadioGroup disabled onChange={onChange}>
        <Radio label={'1'}></Radio>,<Radio label={'2'} disabled></Radio>,
        <Radio label={'3'} disabled={false}></Radio>
      </RadioGroup>
    ))

    const items = wrapper.findAllComponents(Radio)

    items.forEach(item => {
      expect(item.classes()).toContain('vxp-radio--disabled')
    })

    await wrapper.find('input[type="radio"]').trigger('change')
    expect(onChange).not.toHaveBeenCalled()
  })

  it('group loading lock', async () => {
    const onChange = vi.fn()
    const wrapper = mount(RadioGroup, {
      props: { onChange },
      slots: {
        default: () => [
          <Radio label={'1'}></Radio>,
          <Radio label={'2'} loading={false}></Radio>,
          <Radio label={'3'} loading></Radio>
        ]
      }
    })

    const items = wrapper.findAllComponents(Radio)

    items.forEach(item => {
      expect(item.classes()).not.toContain('vxp-radio--loading')
    })

    await wrapper.setProps({ loading: true, loadingLock: true })
    items.forEach(item => {
      expect(item.classes()).toContain('vxp-radio--loading')
    })

    await wrapper.find('input[type="radio"]').trigger('change')
    expect(onChange).not.toHaveBeenCalled()
  })

  it('group state', () => {
    (['success', 'warning', 'error'] as const).forEach(state => {
      const wrapper = mount(() => (
        <RadioGroup state={state}>
          <Radio label={'1'}></Radio>
          <Radio label={'2'} state={'default'}></Radio>
        </RadioGroup>
      ))

      const items = wrapper.findAllComponents(Radio)
      items.forEach(item => {
        expect(item.classes()).toContain(`vxp-radio--${state}`)
      })
    })
  })

  it('group size', () => {
    const wrapper = mount(() => (
      <RadioGroup size={'large'}>
        <Radio label={'1'}></Radio>
        <Radio label={'2'} size={'default'}></Radio>
      </RadioGroup>
    ))

    const items = wrapper.findAllComponents(Radio)
    items.forEach(item => {
      expect(item.classes()).toContain('vxp-radio--large')
    })
  })

  it('group vertical', () => {
    const wrapper = mount(() => <RadioGroup vertical></RadioGroup>)

    expect(wrapper.find('.vxp-radio-group').classes()).toContain('vxp-radio-group--vertical')
  })

  it('group border', () => {
    const wrapper = mount(() => <RadioGroup border></RadioGroup>)

    expect(wrapper.find('.vxp-radio-group').classes()).toContain('vxp-radio-group--border')
  })

  it('group button', () => {
    const wrapper = mount(() => <RadioGroup button></RadioGroup>)

    expect(wrapper.find('.vxp-radio-group').classes()).toContain('vxp-radio-group--button')
  })
})
