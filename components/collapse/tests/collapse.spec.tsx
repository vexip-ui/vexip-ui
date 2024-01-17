import { CollapsePanel } from '@/components/collapse-panel'

import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'

import { Github } from 'lucide-vue-next'
import { Collapse } from '..'

describe('Collapse', () => {
  it('render', () => {
    const wrapper = mount(() => (
      <Collapse>
        <CollapsePanel></CollapsePanel>
      </Collapse>
    ))

    expect(wrapper.find('.vxp-collapse').classes()).toContain('vxp-collapse-vars')
    expect(wrapper.find('.vxp-collapse__panel').exists()).toBe(true)
    expect(wrapper.find('.vxp-collapse__header').exists()).toBe(true)
    expect(wrapper.find('.vxp-collapse__arrow').exists()).toBe(true)
  })

  it('toggle active', async () => {
    const wrapper = mount(() => (
      <Collapse expanded={['2']}>
        <CollapsePanel label={'1'}>{'1'}</CollapsePanel>
        <CollapsePanel label={'2'}>{'2'}</CollapsePanel>
        <CollapsePanel label={'3'}>{'3'}</CollapsePanel>
      </Collapse>
    ))
    const panels = wrapper.findAll('.vxp-collapse__panel')

    expect(panels.length).toEqual(3)

    await nextTick()
    expect(panels[1].classes()).toContain('vxp-collapse__panel--expanded')
    expect(panels[1].find('.vxp-collapse__content').exists()).toBe(true)

    await panels[0].find('.vxp-collapse__header').trigger('click')
    expect(panels[0].classes()).toContain('vxp-collapse__panel--expanded')
    expect(panels[0].find('.vxp-collapse__content').exists()).toBe(true)
    expect(panels[1].classes()).toContain('vxp-collapse__panel--expanded')

    await panels[1].find('.vxp-collapse__header').trigger('click')
    expect(panels[0].classes()).toContain('vxp-collapse__panel--expanded')
    expect(panels[1].classes()).not.toContain('vxp-collapse__panel--expanded')
  })

  it('accordion', async () => {
    const wrapper = mount(() => (
      <Collapse accordion expanded={'2'}>
        <CollapsePanel label={'1'}>{'1'}</CollapsePanel>
        <CollapsePanel label={'2'}>{'2'}</CollapsePanel>
        <CollapsePanel label={'3'}>{'3'}</CollapsePanel>
      </Collapse>
    ))
    const panels = wrapper.findAll('.vxp-collapse__panel')

    await nextTick()
    expect(panels[1].classes()).toContain('vxp-collapse__panel--expanded')

    await panels[0].find('.vxp-collapse__header').trigger('click')
    expect(panels[0].classes()).toContain('vxp-collapse__panel--expanded')
    expect(panels[1].classes()).not.toContain('vxp-collapse__panel--expanded')
  })

  it('change event', async () => {
    const onChange = vi.fn()
    const wrapper = mount(() => (
      <Collapse onChange={onChange}>
        <CollapsePanel label={'1'}>{'1'}</CollapsePanel>
        <CollapsePanel label={'2'}>{'2'}</CollapsePanel>
      </Collapse>
    ))
    const panels = wrapper.findAll('.vxp-collapse__panel')

    await nextTick()
    await panels[0].find('.vxp-collapse__header').trigger('click')
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenLastCalledWith(['1'])

    await panels[1].find('.vxp-collapse__header').trigger('click')
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenLastCalledWith(['1', '2'])

    await panels[0].find('.vxp-collapse__header').trigger('click')
    expect(onChange).toHaveBeenCalledTimes(3)
    expect(onChange).toHaveBeenLastCalledWith(['2'])
  })

  it('disabled', async () => {
    const onChange = vi.fn()
    const wrapper = mount(() => (
      <Collapse onChange={onChange}>
        <CollapsePanel label={'1'}>{'1'}</CollapsePanel>
        <CollapsePanel label={'2'} disabled>
          {'2'}
        </CollapsePanel>
      </Collapse>
    ))
    const panels = wrapper.findAll('.vxp-collapse__panel')

    await nextTick()
    expect(panels[1].classes()).toContain('vxp-collapse__panel--disabled')

    await panels[1].find('.vxp-collapse__header').trigger('click')
    expect(onChange).not.toHaveBeenCalled()
  })

  it('card', () => {
    const wrapper = mount(() => (
      <Collapse card>
        <CollapsePanel></CollapsePanel>
      </Collapse>
    ))

    expect(wrapper.find('.vxp-collapse').classes()).toContain('vxp-collapse--card')
    expect(wrapper.find('.vxp-collapse__panel').classes()).not.toContain(
      'vxp-collapse__panel--card'
    )
  })

  it('ghost', () => {
    const wrapper = mount(() => (
      <Collapse ghost>
        <CollapsePanel></CollapsePanel>
      </Collapse>
    ))

    expect(wrapper.find('.vxp-collapse').classes()).toContain('vxp-collapse--ghost')
    expect(wrapper.find('.vxp-collapse__panel').classes()).not.toContain(
      'vxp-collapse__panel--ghost'
    )
  })

  it('arrow type', () => {
    ;(['right', 'left', 'none'] as const).forEach(type => {
      const wrapper = mount(() => (
        <Collapse arrow-type={type}>
          <CollapsePanel></CollapsePanel>
        </Collapse>
      ))

      expect(wrapper.find('.vxp-collapse').classes()).toContain(`vxp-collapse--arrow-${type}`)
      expect(wrapper.find('.vxp-collapse__panel').classes()).toContain(
        `vxp-collapse__panel--arrow-${type}`
      )
    })
  })

  it('panel only', async () => {
    const wrapper = mount(() => <CollapsePanel title={'title'}>{'content'}</CollapsePanel>)

    expect(wrapper.find('.vxp-collapse__panel').classes()).toContain('vxp-collapse-vars')
    expect(wrapper.find('.vxp-collapse__header').exists()).toBe(true)
    expect(wrapper.find('.vxp-collapse__header').text()).toEqual('title')
    expect(wrapper.find('.vxp-collapse__arrow').exists()).toBe(true)

    await wrapper.find('.vxp-collapse__header').trigger('click')
    expect(wrapper.find('.vxp-collapse__panel').classes()).toContain(
      'vxp-collapse__panel--expanded'
    )
    expect(wrapper.find('.vxp-collapse__content').exists()).toBe(true)
    expect(wrapper.find('.vxp-collapse__content').text()).toEqual('content')
  })

  it('panel card', () => {
    const wrapper = mount(() => <CollapsePanel card></CollapsePanel>)

    expect(wrapper.find('.vxp-collapse__panel').classes()).toContain('vxp-collapse__panel--card')
  })

  it('panel ghost', () => {
    const wrapper = mount(() => <CollapsePanel ghost></CollapsePanel>)

    expect(wrapper.find('.vxp-collapse__panel').classes()).toContain('vxp-collapse__panel--ghost')
  })

  it('panel arrow type', () => {
    ;(['right', 'left', 'none'] as const).forEach(type => {
      const wrapper = mount(() => <CollapsePanel arrow-type={type}></CollapsePanel>)

      expect(wrapper.find('.vxp-collapse__panel').classes()).toContain(
        `vxp-collapse__panel--arrow-${type}`
      )
    })
  })

  it('panel icon', () => {
    const wrapper = mount(() => <CollapsePanel icon={Github}></CollapsePanel>)

    expect(wrapper.find('.vxp-collapse__icon').exists()).toBe(true)
    expect(wrapper.findComponent(Github).exists()).toBe(true)
  })

  it('panel toggle event', async () => {
    const onToggle = vi.fn()
    const wrapper = mount(CollapsePanel, {
      props: { onToggle }
    })

    await wrapper.find('.vxp-collapse__header').trigger('click')
    expect(onToggle).toHaveBeenCalled()
    expect(onToggle).toHaveBeenLastCalledWith(true)

    await wrapper.find('.vxp-collapse__header').trigger('click')
    expect(onToggle).toHaveBeenLastCalledWith(false)
  })

  it('panel disabled', async () => {
    const onToggle = vi.fn()
    const wrapper = mount(CollapsePanel, {
      props: { onToggle }
    })

    expect(wrapper.classes()).not.toContain('vxp-collapse__panel--disabled')

    await wrapper.setProps({ disabled: true })
    expect(wrapper.classes()).toContain('vxp-collapse__panel--disabled')

    await wrapper.find('.vxp-collapse__header').trigger('click')
    expect(onToggle).not.toHaveBeenCalled()
  })
})
