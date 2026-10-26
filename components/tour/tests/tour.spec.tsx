import { TourStep } from '@/components/tour-step'

import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import { Tour } from '..'

import type { DOMWrapper } from '@vue/test-utils'

describe('Tour', () => {
  const TOP = 30
  const LEFT = 50
  const WIDTH = 100
  const HEIGHT = 40

  const target = () => {
    return {
      getBoundingClientRect() {
        return {
          top: TOP,
          left: LEFT,
          width: WIDTH,
          height: HEIGHT,
        }
      },
    }
  }

  it('render', async () => {
    const steps = [
      {
        target,
        title: 'Title',
        content: 'Content',
      },
    ]
    const wrapper = mount(() => <Tour active steps={steps}></Tour>)

    expect(wrapper.find('.vxp-tour').classes()).toContain('vxp-tour-vars')
    expect(wrapper.find('.vxp-tour__bubble').exists()).toBe(true)
    expect(wrapper.find('.vxp-tour__header').exists()).toBe(true)
    expect(wrapper.find('.vxp-tour__title').exists()).toBe(true)
    expect(wrapper.find('.vxp-tour__title').text()).toEqual('Title')
    expect(wrapper.find('.vxp-tour__content').exists()).toBe(true)
    expect(wrapper.find('.vxp-tour__content').text()).toEqual('Content')
    expect(wrapper.find('.vxp-tour__footer').exists()).toBe(true)
    expect(wrapper.findAllComponents('.vxp-button').length).toEqual(1)
  })

  it('index', async () => {
    const steps = [
      {
        target,
        title: '1',
        content: '1',
      },
      {
        target,
        title: '2',
        content: '2',
      },
    ]
    const wrapper = mount(() => <Tour active index={1} steps={steps}></Tour>)

    expect(wrapper.find('.vxp-tour__title').text()).toEqual('2')
    expect(wrapper.find('.vxp-tour__content').text()).toEqual('2')
  })

  it('template steps', async () => {
    const wrapper = mount(() => (
      <Tour active>
        <TourStep target={target} title={'Title'} content={'Content'}></TourStep>
      </Tour>
    ))

    expect(wrapper.find('.vxp-tour__title').text()).toEqual('Title')
    expect(wrapper.find('.vxp-tour__content').text()).toEqual('Content')
  })

  it('mixed steps', async () => {
    const steps = [
      {
        target,
        title: '1',
        content: '1',
      },
    ]
    const wrapper = mount(Tour, {
      props: {
        active: true,
        steps,
      },
      slots: {
        default: () => <TourStep target={target} title={'2'} content={'2'}></TourStep>,
      },
    })

    expect(wrapper.find('.vxp-tour__title').text()).toEqual('2')
    expect(wrapper.find('.vxp-tour__content').text()).toEqual('2')

    await wrapper.setProps({ index: 1 })
    expect(wrapper.find('.vxp-tour__title').text()).toEqual('1')
    expect(wrapper.find('.vxp-tour__content').text()).toEqual('1')
  })

  it('step order', async () => {
    const steps = [
      {
        target,
        title: '1',
        content: '1',
      },
      {
        target,
        title: '3',
        content: '3',
        order: -1,
      },
    ]
    const wrapper = mount(Tour, {
      props: {
        active: true,
        steps,
      },
      slots: {
        default: () => <TourStep target={target} title={'2'} content={'2'}></TourStep>,
      },
    })

    expect(wrapper.find('.vxp-tour__title').text()).toEqual('3')
    expect(wrapper.find('.vxp-tour__content').text()).toEqual('3')
  })

  it('no target', async () => {
    const steps = [
      {
        title: 'Title',
        content: 'Content',
      },
    ]
    const wrapper = mount(() => <Tour active steps={steps} padding={20}></Tour>)

    expect(wrapper.find('.vxp-tour__bubble').classes()).toContain('vxp-tour__bubble--center')
  })

  it('title slot', async () => {
    const steps = [
      {
        target,
        title: 'Title',
        content: 'Content',
      },
    ]
    const wrapper = mount(() => (
      <Tour active steps={steps}>
        {{
          title: () => <span class={'title'}></span>,
        }}
      </Tour>
    ))

    expect(wrapper.find('.vxp-tour__title').exists()).toBe(true)
    expect(wrapper.find('.title').exists()).toBe(true)
  })

  it('close slot', async () => {
    const steps = [
      {
        target,
        title: 'Title',
        content: 'Content',
      },
    ]
    const wrapper = mount(() => (
      <Tour active steps={steps}>
        {{
          close: () => <span class={'close'}></span>,
        }}
      </Tour>
    ))

    expect(wrapper.find('.vxp-tour__close').exists()).toBe(true)
    expect(wrapper.find('.close').exists()).toBe(true)
  })

  it('header slot', async () => {
    const steps = [
      {
        target,
        title: 'Title',
        content: 'Content',
      },
    ]
    const wrapper = mount(() => (
      <Tour active steps={steps}>
        {{
          header: () => <span class={'header'}></span>,
        }}
      </Tour>
    ))

    expect(wrapper.find('.vxp-tour__header').exists()).toBe(true)
    expect(wrapper.find('.header').exists()).toBe(true)
  })

  it('body slot', async () => {
    const steps = [
      {
        target,
        title: 'Title',
        content: 'Content',
      },
    ]
    const wrapper = mount(() => (
      <Tour active steps={steps}>
        {{
          title: () => <span class={'body'}></span>,
        }}
      </Tour>
    ))

    expect(wrapper.find('.vxp-tour__content').exists()).toBe(true)
    expect(wrapper.find('.body').exists()).toBe(true)
  })

  it('footer slot', async () => {
    const steps = [
      {
        target,
        title: 'Title',
        content: 'Content',
      },
    ]
    const wrapper = mount(() => (
      <Tour active steps={steps}>
        {{
          footer: () => <span class={'footer'}></span>,
        }}
      </Tour>
    ))

    expect(wrapper.find('.vxp-tour__footer').exists()).toBe(true)
    expect(wrapper.find('.footer').exists()).toBe(true)
  })

  it('sign slot', async () => {
    const steps = [
      {
        target,
        title: 'Title',
        content: 'Content',
      },
    ]
    const wrapper = mount(() => (
      <Tour active steps={steps}>
        {{
          sign: () => <span class={'sign'}></span>,
        }}
      </Tour>
    ))

    expect(wrapper.find('.vxp-tour__sign').exists()).toBe(true)
    expect(wrapper.find('.sign').exists()).toBe(true)
  })

  it('actions slot', async () => {
    const steps = [
      {
        target,
        title: 'Title',
        content: 'Content',
      },
    ]
    const wrapper = mount(() => (
      <Tour active steps={steps}>
        {{
          actions: () => <span class={'actions'}></span>,
        }}
      </Tour>
    ))

    expect(wrapper.find('.vxp-tour__footer').exists()).toBe(true)
    expect(wrapper.find('.actions').exists()).toBe(true)
  })

  it('active', async () => {
    const steps = [
      {
        target,
        title: 'Title',
        content: 'Content',
      },
    ]
    const wrapper = mount(Tour, {
      props: { steps },
    })

    expect(wrapper.find('.vxp-tour__bubble').exists()).toBe(false)

    await wrapper.setProps({ active: true })
    expect(wrapper.find('.vxp-tour__bubble').exists()).toBe(true)
  })

  it('complete a tour', async () => {
    const steps = [
      {
        target,
        title: '1',
        content: '1',
      },
      {
        target,
        title: '2',
        content: '2',
      },
      {
        target,
        title: '3',
        content: '3',
      },
    ]
    const onToggle = vi.fn()
    const onChange = vi.fn()
    const wrapper = mount(Tour, {
      props: {
        active: true,
        steps,
        onToggle,
        onChange,
      },
    })

    let prev!: DOMWrapper<any>
    let next!: DOMWrapper<any>

    const refreshActions = () => {
      prev = wrapper.find('.vxp-tour__action--prev')
      next = wrapper.find('.vxp-tour__action--next')
    }

    refreshActions()
    expect(prev.exists()).toBe(false)
    expect(next.exists()).toBe(true)
    expect(wrapper.find('.vxp-tour__title').text()).toEqual('1')

    await next.trigger('click')
    refreshActions()
    expect(prev.exists()).toBe(true)
    expect(next.exists()).toBe(true)
    expect(wrapper.find('.vxp-tour__title').text()).toEqual('2')
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenLastCalledWith(1, expect.objectContaining({ title: '2' }))
    expect(wrapper.emitted()).toHaveProperty('update:index')
    expect(wrapper.emitted('update:index')![0]).toEqual([1])

    await prev.trigger('click')
    refreshActions()
    expect(prev.exists()).toBe(false)
    expect(next.exists()).toBe(true)
    expect(wrapper.find('.vxp-tour__title').text()).toEqual('1')
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenLastCalledWith(0, expect.objectContaining({ title: '1' }))

    await next.trigger('click')
    await next.trigger('click')
    await next.trigger('click')
    expect(wrapper.find('.vxp-tour__bubble').exists()).toBe(false)
    expect(onToggle).toHaveBeenCalledTimes(1)
    expect(onToggle).toHaveBeenLastCalledWith(false)
    expect(wrapper.emitted()).toHaveProperty('update:active')
    expect(wrapper.emitted('update:active')![0]).toEqual([false])
  })

  it('closable', async () => {
    const steps = [
      {
        target,
        title: 'Title',
        content: 'Content',
      },
    ]
    const onClose = vi.fn()
    const wrapper = mount(Tour, {
      props: {
        active: true,
        closable: false,
        steps,
        onClose,
      },
    })

    expect(wrapper.find('.vxp-tour__close').exists()).toBe(false)

    await wrapper.setProps({ closable: true })
    expect(wrapper.find('.vxp-tour__close').exists()).toBe(true)

    await wrapper.find('.vxp-tour__close').trigger('click')
    expect(wrapper.find('.vxp-tour__bubble').exists()).toBe(false)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('padding', async () => {
    const steps = [
      {
        target,
        title: 'Title',
        content: 'Content',
      },
    ]
    const wrapper = mount(() => <Tour active steps={steps} padding={20}></Tour>)
    const hollow = wrapper.find('.vxp-tour__hollow')

    expect(hollow.exists()).toBe(true)
    expect(hollow.attributes('x')).toEqual(`${LEFT - 20}`)
    expect(hollow.attributes('y')).toEqual(`${TOP - 20}`)
    expect(hollow.attributes('width')).toEqual(`${WIDTH + 40}`)
    expect(hollow.attributes('height')).toEqual(`${HEIGHT + 40}`)
  })

  it('types', async () => {
    const steps = [
      {
        target,
        title: '1',
        content: '1',
      },
      {
        target,
        title: '2',
        content: '2',
        type: 'success',
      },
    ]
    const wrapper = mount(Tour, {
      props: {
        active: true,
        steps,
        type: 'primary',
      },
    })

    expect(wrapper.find('.vxp-tour__bubble').classes()).toContain('vxp-tour__bubble--primary')

    await wrapper.setProps({ index: 1 })
    expect(wrapper.find('.vxp-tour__bubble').classes()).toContain('vxp-tour__bubble--success')
  })
})
