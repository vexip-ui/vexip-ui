import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'

import { Drawer } from '..'

vi.useFakeTimers()

const TEXT = 'Text'

describe('Drawer', () => {
  it('render', () => {
    const wrapper = mount(() => <Drawer>{TEXT}</Drawer>)

    expect(wrapper.find('.vxp-drawer').classes()).toContain('vxp-drawer-vars')
    expect(wrapper.find('.vxp-drawer__wrapper').exists()).toBe(true)
    expect(wrapper.find('.vxp-drawer__header').exists()).toBe(false)
    expect(wrapper.find('.vxp-drawer__content').exists()).toBe(true)
    expect(wrapper.find('.vxp-drawer__content').text()).toEqual(TEXT)
  })

  it('title slot', () => {
    const wrapper = mount(() => (
      <Drawer title={TEXT}>
        {{
          title: () => <span class={'title'}></span>
        }}
      </Drawer>
    ))

    expect(wrapper.find('.vxp-drawer__header').exists()).toBe(true)
    expect(wrapper.find('.title').exists()).toBe(true)
    expect(wrapper.find('.vxp-drawer__close').exists()).toBe(true)
  })

  it('close', () => {
    const wrapper = mount(() => (
      <Drawer title={TEXT}>
        {{
          close: () => <span class={'close'}></span>
        }}
      </Drawer>
    ))

    expect(wrapper.find('.vxp-drawer__header').exists()).toBe(true)
    expect(wrapper.find('.close').exists()).toBe(true)
  })

  it('inner', () => {
    const wrapper = mount(() => <Drawer inner></Drawer>)

    expect(wrapper.find('.vxp-drawer').classes()).toContain('vxp-drawer--inner')
  })

  it('drawer class', () => {
    const wrapper = mount(() => <Drawer drawer-class={'test'}></Drawer>)

    expect(wrapper.find('.vxp-drawer__wrapper').classes()).toContain('test')
  })

  it('hide mask', async () => {
    const wrapper = mount(() => <Drawer hide-mask></Drawer>)
    await nextTick()

    expect(wrapper.find('.vxp-masker__mask').exists()).toBe(false)
  })

  it('closable', async () => {
    const onToggle = vi.fn()
    const onClose = vi.fn()
    const wrapper = mount(Drawer, {
      props: {
        active: true,
        onToggle,
        onClose
      }
    })
    const mask = wrapper.find('.vxp-masker__mask')

    await mask.trigger('click')
    expect(onToggle).toHaveBeenCalled()
    expect(onClose).toHaveBeenCalled()
  })

  it('transfer', async () => {
    mount(() => <Drawer transfer></Drawer>)

    await nextTick()
    await nextTick()
    expect(document.querySelector('.vxp-drawer')).not.toBeNull()
  })

  it('placement', () => {
    ;(['top', 'right', 'bottom', 'left'] as const).forEach(placement => {
      const wrapper = mount(() => <Drawer placement={placement}></Drawer>)

      expect(wrapper.find('.vxp-drawer__wrapper').classes()).toContain(
        `vxp-drawer__wrapper--${placement}`
      )
    })
  })

  it('resize', async () => {
    const onResizeStart = vi.fn()
    const onResizeMove = vi.fn()
    const onResizeEnd = vi.fn()
    const wrapper = mount(() => (
      <Drawer
        active
        resizable
        placement={'right'}
        width={200}
        height={100}
        onResizeStart={onResizeStart}
        onResizeMove={onResizeMove}
        onResizeEnd={onResizeEnd}
      ></Drawer>
    ))
    const drawer = wrapper.find('.vxp-drawer__wrapper')
    const resizer = wrapper.find('.vxp-drawer__handler').element

    await nextTick()
    await nextTick()
    expect(wrapper.find('.vxp-drawer__handler').exists()).toBe(true)
    expect(wrapper.find('.vxp-drawer').classes()).toContain('vxp-drawer--resizable')
    expect(drawer.attributes('style')).toContain('width: 200px;')

    const downEvent = new CustomEvent('pointerdown') as any
    downEvent.button = 0
    downEvent.clientX = 0
    downEvent.clientY = 0
    resizer.dispatchEvent(downEvent)
    expect(onResizeStart).toHaveBeenCalled()
    expect(onResizeStart).toHaveBeenCalledWith(expect.objectContaining({ width: 200 }))

    await nextTick()
    expect(drawer.classes()).toContain('vxp-drawer__wrapper--resizing')

    const moveEvent = new CustomEvent('pointermove') as any
    moveEvent.clientX = 40
    moveEvent.clientY = 40
    document.dispatchEvent(moveEvent)
    vi.runOnlyPendingTimers()
    expect(onResizeMove).toHaveBeenCalled()
    expect(onResizeMove).toHaveBeenCalledWith(expect.objectContaining({ width: 160 }))
    await nextTick()
    expect(drawer.attributes('style')).toContain('width: 160px;')

    const upEvent = new CustomEvent('pointerup') as any
    document.dispatchEvent(upEvent)
    expect(onResizeEnd).toHaveBeenCalled()
    expect(onResizeEnd).toHaveBeenCalledWith(expect.objectContaining({ width: 160 }))

    await nextTick()
    expect(drawer.classes()).not.toContain('vxp-drawer__wrapper--resizing')
  })

  it('footer', () => {
    const wrapper = mount(() => <Drawer footer></Drawer>)

    expect(wrapper.find('.vxp-drawer__footer').exists()).toBe(true)
    expect(wrapper.findAllComponents('.vxp-button').length).toBe(2)
  })

  it('render', () => {
    const wrapper = mount(() => (
      <Drawer footer confirm-type={'success'} cancel-type={'error'} action-size={'large'}>
        {TEXT}
      </Drawer>
    ))
    const buttons = wrapper.findAllComponents('.vxp-button')

    expect(buttons[0].classes()).toContain('vxp-button--error')
    expect(buttons[0].classes()).toContain('vxp-button--large')
    expect(buttons[1].classes()).toContain('vxp-button--success')
    expect(buttons[1].classes()).toContain('vxp-button--large')
  })

  it('undivided', () => {
    const wrapper = mount(() => <Drawer undivided>{TEXT}</Drawer>)

    expect(wrapper.find('.vxp-drawer').classes()).toContain('vxp-drawer--undivided')
  })

  it('mask close', async () => {
    const onToggle = vi.fn()
    const onClose = vi.fn()
    const wrapper = mount(Drawer, {
      props: {
        active: true,
        onToggle,
        onClose
      }
    })

    await wrapper.find('.vxp-masker__mask').trigger('click')

    expect(onToggle).toHaveBeenCalledWith(false)
    expect(onClose).toHaveBeenCalled()
  })

  it('before close', async () => {
    const onBeforeClose = vi.fn()
    const wrapper = mount(Drawer, {
      props: { closable: true, onBeforeClose }
    })

    const openAndClose = async () => {
      wrapper.vm.currentActive = true
      await nextTick()
      await wrapper.find('.vxp-masker__mask').trigger('click')
      await nextTick()
    }

    await openAndClose()
    expect(wrapper.vm.currentActive).toBe(false)
    expect(onBeforeClose).toHaveBeenCalled()

    onBeforeClose.mockReturnValue(false)
    await openAndClose()
    expect(wrapper.vm.currentActive).toBe(true)

    let resolveRef: (value: boolean) => void
    onBeforeClose.mockReset()
    onBeforeClose.mockImplementation(
      () =>
        new Promise(resolve => {
          resolveRef = resolve
        })
    )
    await openAndClose()
    expect(wrapper.vm.currentActive).toBe(true)
    resolveRef!(true)
    await nextTick()
    await nextTick()
    expect(wrapper.vm.currentActive).toBe(false)
  })
})
