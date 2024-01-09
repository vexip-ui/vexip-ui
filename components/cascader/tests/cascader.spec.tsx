import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'

import { Github } from 'lucide-vue-next'
import { globalIcons } from '@vexip-ui/config'
import { Cascader } from '..'

interface CascaderOption {
  value: string,
  label: string,
  disabled: boolean,
  children: CascaderOption[] | null
}

const icons = globalIcons.value
const TEXT = 'Text'

function createOptions(depth = 3, prefix = '', iterator = 1) {
  const options: CascaderOption[] = []
  const isLeaf = iterator === depth

  for (let i = 1; i <= 10; ++i) {
    options.push({
      value: `l${prefix}-${i}`,
      label: `v${prefix}-${i}`,
      disabled: i % 4 === 0,
      children: isLeaf ? null : createOptions(depth, `${prefix}-${i}`, iterator + 1)
    })
  }

  return options
}

function getValues(options: CascaderOption[], indexs: number[]) {
  const values: string[] = []

  indexs.slice(0, 3).forEach(i => {
    values.push(options[i].value)
    options = options[i].children!
  })

  return values
}

function getLabels(options: CascaderOption[], indexs: number[]) {
  const labels: string[] = []

  indexs.slice(0, 3).forEach(i => {
    labels.push(options[i].label)
    options = options[i].children!
  })

  return labels
}

function getData(options: CascaderOption[], indexs: number[]) {
  const values: CascaderOption[] = []

  indexs.slice(0, 3).forEach(i => {
    values.push(options[i])
    options = options[i].children!
  })

  return values
}

describe('Cascader', () => {
  it('render', () => {
    const wrapper = mount(Cascader, {
      props: { visible: true }
    })

    expect(wrapper.classes()).toContain('vxp-cascader-vars')
    expect(wrapper.classes()).toContain('vxp-input-vars')
    expect(wrapper.find('.vxp-cascader__selector').exists()).toBe(true)
    expect(wrapper.find('.vxp-cascader__control').exists()).toBe(true)
    expect(wrapper.find('.vxp-cascader__popper').exists()).toBe(true)
    expect(wrapper.find('.vxp-cascader__panels').exists()).toBe(true)
  })

  it('has empty', async () => {
    const wrapper = mount(Cascader, {
      props: { visible: true, options: createOptions() }
    })

    expect(wrapper.find('.vxp-cascader__empty').exists()).toBe(false)

    await wrapper.setProps({ options: [] })
    expect(wrapper.find('.vxp-cascader__empty').exists()).toBe(true)
  })

  it('transfer', async () => {
    const wrapper = mount(Cascader, {
      props: { visible: true, transfer: true, options: createOptions() }
    })

    await nextTick()
    await nextTick()
    expect(wrapper.find('.vxp-cascader__popper').exists()).toBe(false)
    expect(document.querySelector('.vxp-cascader__popper')).not.toBeNull()
  })

  it('single value', () => {
    const options = createOptions()
    const wrapper = mount(Cascader, {
      props: {
        visible: true,
        value: getValues(options, [2, 2, 2]),
        options
      }
    })

    expect(wrapper.find('.vxp-cascader__control').text()).toEqual(
      getLabels(options, [2, 2, 2]).join('/')
    )
    expect(wrapper.findAll('.vxp-option--selected').length).toBe(3)
  })

  it('placeholder', async () => {
    const wrapper = mount(Cascader)

    expect(wrapper.find('.vxp-cascader__placeholder').exists()).toBe(true)

    await wrapper.setProps({ placeholder: TEXT })
    expect(wrapper.find('.vxp-cascader__placeholder').text()).toEqual(TEXT)
  })

  it('toggle visible', async () => {
    const wrapper = mount(Cascader)
    const selector = wrapper.find('.vxp-cascader__selector')

    expect(selector.classes()).not.toContain('vxp-cascader__selector--focused')

    await wrapper.trigger('click')
    expect(selector.classes()).toContain('vxp-cascader__selector--focused')

    await wrapper.trigger('click')
    expect(selector.classes()).not.toContain('vxp-cascader__selector--focused')
  })

  it('key toggle visible', async () => {
    const wrapper = mount(Cascader)
    const selector = wrapper.find('.vxp-cascader__selector')

    await nextTick()
    await selector.trigger('keydown', { key: 'Space' })
    expect(selector.classes()).toContain('vxp-cascader__selector--focused')

    await selector.trigger('keydown', { key: 'Space' })
    expect(selector.classes()).not.toContain('vxp-cascader__selector--focused')

    await wrapper.setProps({ visible: true })
    await selector.trigger('keydown', { key: 'Tab' })
    expect(selector.classes()).not.toContain('vxp-cascader__selector--focused')
  })

  it('disabled', async () => {
    const wrapper = mount(Cascader)
    const selector = wrapper.find('.vxp-cascader__selector')

    expect(selector.classes()).not.toContain('vxp-cascader__selector--disabled')

    await wrapper.setProps({ visible: true })
    expect(selector.classes()).toContain('vxp-cascader__selector--focused')

    await wrapper.setProps({ disabled: true })
    expect(selector.classes()).toContain('vxp-cascader__selector--disabled')
    expect(selector.classes()).not.toContain('vxp-cascader__selector--focused')
  })

  it('toggle event', async () => {
    const onToggle = vi.fn()
    const wrapper = mount(Cascader, {
      props: { onToggle }
    })

    await wrapper.trigger('click')
    expect(onToggle).toHaveBeenCalledTimes(1)
    expect(onToggle).toHaveBeenLastCalledWith(true)
    expect(wrapper.emitted()).toHaveProperty('update:visible')
    expect(wrapper.emitted('update:visible')![0]).toEqual([true])

    await wrapper.trigger('click')
    expect(onToggle).toHaveBeenCalledTimes(2)
    expect(onToggle).toHaveBeenLastCalledWith(false)
    expect(wrapper.emitted('update:visible')![1]).toEqual([false])

    await wrapper.setProps({ disabled: true })
    await wrapper.trigger('click')
    expect(onToggle).toHaveBeenCalledTimes(2)
    expect(wrapper.emitted('update:visible')!.length).toBe(2)
  })

  it('popper show', async () => {
    const wrapper = mount(Cascader, {
      props: { options: createOptions() }
    })

    expect(wrapper.find('.vxp-cascader__popper').attributes('style')).toContain('display: none;')

    await wrapper.trigger('click')
    expect(wrapper.find('.vxp-cascader__popper').attributes('style') || '').not.toContain(
      'display: none;'
    )
  })

  it('popper will be removed when alive false', async () => {
    const wrapper = mount(Cascader, {
      props: { popperAlive: false, options: createOptions() }
    })

    expect(wrapper.find('.vxp-cascader__popper').exists()).toBe(false)

    await wrapper.trigger('click')
    expect(wrapper.find('.vxp-cascader__popper').exists()).toBe(true)
  })

  it('multiple', async () => {
    const wrapper = mount(Cascader)

    expect(wrapper.classes()).not.toContain('vxp-cascader--multiple')

    await wrapper.setProps({ multiple: true })
    expect(wrapper.classes()).toContain('vxp-cascader--multiple')
  })

  it('multiple value', () => {
    const options = createOptions()
    const value = [getValues(options, [2, 2, 2]), getValues(options, [2, 3, 3])]
    const wrapper = mount(() => <Cascader value={value} multiple options={options}></Cascader>)
    const tags = wrapper.findAll('.vxp-cascader__tag:not(.vxp-cascader__counter)')

    expect(tags.length).toEqual(2)
    expect(tags[0].text()).toEqual(getLabels(options, [2, 2, 2]).join('/'))
    expect(tags[1].text()).toEqual(getLabels(options, [2, 3, 3]).join('/'))
  })

  it('tag close', async () => {
    const options = createOptions()
    const value = [getValues(options, [2, 2, 2]), getValues(options, [2, 3, 3])]
    const wrapper = mount(() => <Cascader value={value} multiple options={options}></Cascader>)

    await wrapper.find('.vxp-tag__close').trigger('click')
    await nextTick()
    expect(wrapper.findAll('.vxp-cascader__tag:not(.vxp-cascader__counter)').length).toEqual(1)
  })

  it('prefix', () => {
    const wrapper = mount(() => <Cascader prefix={Github}></Cascader>)

    expect(wrapper.find('.vxp-cascader__prefix').exists()).toBe(true)
    expect(wrapper.findComponent(Github).exists()).toBe(true)
  })

  it('prefix color', async () => {
    const wrapper = mount(() => <Cascader prefix={Github} prefix-color={'red'}></Cascader>)

    expect(wrapper.find('.vxp-cascader__prefix').attributes('style')).toContain('color: red;')
  })

  it('prefix slot', async () => {
    const wrapper = mount(() => (
      <Cascader prefix={Github}>
        {{
          prefix: () => <span class={'prefix'}></span>
        }}
      </Cascader>
    ))

    expect(wrapper.find('.vxp-cascader__prefix').exists()).toBe(true)
    expect(wrapper.findComponent(Github).exists()).toBe(false)
    expect(wrapper.find('.prefix').exists()).toBe(true)
  })

  it('suffix', async () => {
    const wrapper = mount(Cascader)

    expect(wrapper.find('.vxp-cascader__suffix').exists()).toBe(true)
    expect(wrapper.findComponent(icons.angleDown.icon).exists()).toBe(true)

    await wrapper.setProps({ suffix: Github })
    expect(wrapper.findComponent(icons.angleDown.icon).exists()).toBe(false)
    expect(wrapper.findComponent(Github).exists()).toBe(true)
  })

  it('suffix color', async () => {
    const wrapper = mount(() => <Cascader suffix={Github} suffix-color={'red'}></Cascader>)

    expect(wrapper.find('.vxp-cascader__suffix').attributes('style')).toContain('color: red;')
  })

  it('suffix slot', async () => {
    const wrapper = mount(() => (
      <Cascader suffix={Github}>
        {{
          suffix: () => <span class={'suffix'}></span>
        }}
      </Cascader>
    ))

    expect(wrapper.find('.vxp-cascader__suffix').exists()).toBe(true)
    expect(wrapper.findComponent(Github).exists()).toBe(false)
    expect(wrapper.find('.suffix').exists()).toBe(true)
  })

  it('size', () => {
    const wrapper = mount(() => <Cascader size={'large'}></Cascader>)

    expect(wrapper.find('.vxp-cascader__selector').classes()).toContain(
      'vxp-cascader__selector--large'
    )
  })

  it('state', () => {
    ;(['success', 'warning', 'error'] as const).forEach(state => {
      const wrapper = mount(() => <Cascader state={state}></Cascader>)

      expect(wrapper.find('.vxp-cascader__selector').classes()).toContain(
        `vxp-cascader__selector--${state}`
      )
    })
  })

  it('loading', async () => {
    const wrapper = mount(Cascader)

    expect(wrapper.find('.vxp-cascader__loading').exists()).toBe(false)
    expect(wrapper.findComponent(icons.loading.icon).exists()).toBe(false)

    await wrapper.setProps({ loading: true })
    expect(wrapper.find('.vxp-cascader__loading').exists()).toBe(true)
    expect(wrapper.findComponent(icons.loading.icon).exists()).toBe(true)
  })

  it('loading lock', async () => {
    const wrapper = mount(Cascader)
    const selector = wrapper.find('.vxp-cascader__selector')

    expect(selector.classes()).not.toContain('vxp-cascader__selector--loading')

    await wrapper.setProps({ loading: true, loadingLock: true })
    expect(selector.classes()).toContain('vxp-cascader__selector--loading')
  })

  it('loading icon', () => {
    const wrapper = mount(() => <Cascader loading loading-icon={Github}></Cascader>)

    expect(wrapper.findComponent(icons.loading.icon).exists()).toBe(false)
    expect(wrapper.findComponent(Github).exists()).toBe(true)
  })

  it('select options', async () => {
    const options = createOptions()
    const onChange = vi.fn()
    const wrapper = mount(Cascader, {
      props: {
        visible: true,
        popperAlive: false,
        options,
        onChange
      }
    })
    const getPanels = () => wrapper.findAll('.vxp-cascader__panel')

    expect(getPanels().length).toEqual(1)

    await getPanels()[0].find('.vxp-option').trigger('click')
    expect(getPanels().length).toEqual(2)

    await getPanels()[1].find('.vxp-option').trigger('click')
    expect(getPanels().length).toEqual(3)

    await getPanels()[2].find('.vxp-option').trigger('click')
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenLastCalledWith(
      getValues(options, [0, 0, 0]),
      getData(options, [0, 0, 0])
    )
    expect(getPanels().length).toEqual(0)

    await wrapper.trigger('click')
    expect(getPanels().length).toEqual(3)
  })

  it('clearable', async () => {
    const options = createOptions()
    const onClear = vi.fn()
    const wrapper = mount(Cascader, {
      props: {
        clearable: true,
        placeholder: TEXT,
        options,
        onClear
      }
    })
    const selector = wrapper.find('.vxp-cascader__selector')

    expect(wrapper.find('.vxp-cascader__clear').exists()).toBe(false)

    await wrapper.setProps({ value: getValues(options, [0, 0, 0]) })
    await selector.trigger('mouseenter')
    expect(wrapper.find('.vxp-cascader__clear').exists()).toBe(true)
    expect(wrapper.find('.vxp-cascader__suffix').exists()).toBe(true)
    expect(wrapper.find('.vxp-cascader__suffix').attributes('style')).toContain('opacity: 0%;')

    await wrapper.find('.vxp-cascader__clear').trigger('click')
    expect(onClear).toHaveBeenCalled()
    expect(selector.text()).toEqual(TEXT)
  })

  it('key config', () => {
    const wrapper = mount(Cascader, {
      props: {
        visible: true,
        options: [
          {
            l: 'l-1',
            v: 'v-1',
            c: [
              {
                l: 'l-1-1',
                v: 'v-1-1'
              }
            ]
          }
        ],
        value: ['v-1', 'v-1-1'],
        keyConfig: {
          label: 'l',
          value: 'v',
          children: 'c'
        }
      }
    })

    expect(wrapper.find('.vxp-cascader__control').text()).toEqual('l-1/l-1-1')
    expect(wrapper.findAll('.vxp-option--selected').length).toBe(2)
  })
})
