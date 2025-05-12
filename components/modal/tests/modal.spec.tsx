import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'

import { Modal } from '..'

vi.useFakeTimers()

const TEXT = 'Text'

describe('Modal', () => {
  it('render', () => {
    const wrapper = mount(() => <Modal>{TEXT}</Modal>)

    expect(wrapper.find('.vxp-modal').classes()).toContain('vxp-modal-vars')
    expect(wrapper.find('.vxp-modal__wrapper').exists()).toBe(true)
    expect(wrapper.find('.vxp-modal__header').exists()).toBe(false)
    expect(wrapper.find('.vxp-modal__content').exists()).toBe(true)
    expect(wrapper.find('.vxp-modal__content').text()).toEqual(TEXT)
    expect(wrapper.find('.vxp-modal__footer').exists()).toBe(true)
    expect(wrapper.findAllComponents('.vxp-button').length).toEqual(2)
  })

  it('title', () => {
    const wrapper = mount(() => <Modal title={TEXT}></Modal>)

    expect(wrapper.find('.vxp-modal__header').exists()).toBe(true)
    expect(wrapper.find('.vxp-modal__header').text()).toEqual(TEXT)
    expect(wrapper.find('.vxp-modal__close').exists()).toBe(true)
  })

  it('title slot', () => {
    const wrapper = mount(() => (
      <Modal title={TEXT}>
        {{
          title: () => <span class={'title'}></span>,
        }}
      </Modal>
    ))

    expect(wrapper.find('.vxp-modal__header').exists()).toBe(true)
    expect(wrapper.find('.title').exists()).toBe(true)
    expect(wrapper.find('.vxp-modal__close').exists()).toBe(true)
  })

  it('close slot', () => {
    const wrapper = mount(() => (
      <Modal title={TEXT}>
        {{
          close: () => <span class={'close'}></span>,
        }}
      </Modal>
    ))

    expect(wrapper.find('.vxp-modal__header').exists()).toBe(true)
    expect(wrapper.find('.close').exists()).toBe(true)
  })

  it('header slot', () => {
    const wrapper = mount(() => (
      <Modal title={TEXT}>
        {{
          header: () => <span class={'header'}></span>,
        }}
      </Modal>
    ))

    expect(wrapper.find('.vxp-modal__header').exists()).toBe(true)
    expect(wrapper.find('.title').exists()).toBe(false)
    expect(wrapper.find('.close').exists()).toBe(false)
  })

  it('footer slot', () => {
    const wrapper = mount(() => (
      <Modal>
        {{
          footer: () => <span class={'footer'}></span>,
        }}
      </Modal>
    ))

    expect(wrapper.find('.vxp-modal__footer').exists()).toBe(true)
    expect(wrapper.find('.footer').exists()).toBe(true)
    expect(wrapper.findAllComponents('.vxp-button').length).toEqual(0)
  })

  it('no footer', () => {
    const wrapper = mount(() => <Modal no-footer></Modal>)

    expect(wrapper.find('.vxp-modal__footer').exists()).toBe(false)
  })

  it('inner', () => {
    const wrapper = mount(() => <Modal inner></Modal>)

    expect(wrapper.find('.vxp-modal').classes()).toContain('vxp-modal--inner')
  })

  it('modal class', () => {
    const wrapper = mount(() => <Modal modal-class={'test'}></Modal>)

    expect(wrapper.find('.vxp-modal__wrapper').classes()).toContain('test')
  })

  it('loading', () => {
    const wrapper = mount(() => <Modal loading></Modal>)

    expect(wrapper.findAllComponents('.vxp-button')[1].classes()).toContain('vxp-button--loading')
  })

  it('transfer', async () => {
    mount(() => <Modal transfer></Modal>)

    await nextTick()
    await nextTick()
    expect(document.querySelector('.vxp-modal')).not.toBeNull()
  })

  it('closable', async () => {
    const onToggle = vi.fn()
    const onClose = vi.fn()
    const onConfirm = vi.fn()
    const onCancel = vi.fn()
    const wrapper = mount(Modal, {
      props: {
        active: true,
        onToggle,
        onClose,
        onConfirm,
        onCancel,
      },
    })
    const buttons = wrapper.findAllComponents('.vxp-button')

    ;(buttons[0].element as HTMLButtonElement).click()
    await nextTick()
    // await nextTick()
    expect(onToggle).toHaveBeenLastCalledWith(false)
    expect(onClose).toHaveBeenCalledTimes(1)
    expect(onCancel).toHaveBeenCalled()

    wrapper.vm.currentActive = true
    ;(buttons[1].element as HTMLButtonElement).click()
    await nextTick()
    expect(onClose).toHaveBeenCalledTimes(2)
    expect(onConfirm).toHaveBeenCalled()
  })

  it('confirm/cancel text', () => {
    const wrapper = mount(() => <Modal confirm-text={TEXT} cancel-text={TEXT}></Modal>)
    const buttons = wrapper.findAllComponents('.vxp-button')

    expect(buttons[0].text()).toEqual(TEXT)
    expect(buttons[1].text()).toEqual(TEXT)
  })

  it('hide mask', async () => {
    const wrapper = mount(() => <Modal hide-mask></Modal>)
    await nextTick()

    expect(wrapper.find('.vxp-masker__mask').exists()).toBe(false)
  })

  it('draggable', async () => {
    const onDragStart = vi.fn()
    const onDragMove = vi.fn()
    const onDragEnd = vi.fn()
    const wrapper = mount(() => (
      <Modal
        active
        draggable
        title={TEXT}
        top={0}
        left={0}
        onDragStart={onDragStart}
        onDragMove={onDragMove}
        onDragEnd={onDragEnd}
      ></Modal>
    ))
    const modal = wrapper.find('.vxp-modal__wrapper')
    const header = wrapper.find('.vxp-modal__header').element

    await nextTick()
    await nextTick()
    expect(wrapper.find('.vxp-modal').classes()).toContain('vxp-modal--draggable')
    expect(modal.attributes('style')).toContain('top: 0px;')
    expect(modal.attributes('style')).toContain('left: 0px;')

    const downEvent = new CustomEvent('pointerdown') as any
    downEvent.button = 0
    downEvent.clientX = 0
    downEvent.clientY = 0
    header.dispatchEvent(downEvent)
    expect(onDragStart).toHaveBeenCalled()
    expect(onDragStart).toHaveBeenCalledWith(expect.objectContaining({ top: 0, left: 0 }))

    await nextTick()
    expect(modal.classes()).toContain('vxp-modal__wrapper--dragging')

    const moveEvent = new CustomEvent('pointermove') as any
    moveEvent.clientX = 40
    moveEvent.clientY = 40
    document.dispatchEvent(moveEvent)
    vi.runOnlyPendingTimers()
    await nextTick()
    expect(onDragMove).toHaveBeenCalled()
    expect(onDragMove).toHaveBeenCalledWith(expect.objectContaining({ top: 40, left: 40 }))
    expect(modal.attributes('style')).toContain('top: 40px;')
    expect(modal.attributes('style')).toContain('left: 40px;')

    const upEvent = new CustomEvent('pointerup') as any
    upEvent.clientX = 40
    upEvent.clientY = 40
    document.dispatchEvent(upEvent)
    expect(onDragEnd).toHaveBeenCalled()
    expect(onDragEnd).toHaveBeenCalledWith(expect.objectContaining({ top: 40, left: 40 }))

    await nextTick()
    expect(modal.classes()).not.toContain('vxp-modal__wrapper--dragging')
  })

  it('resize', async () => {
    const onResizeStart = vi.fn()
    const onResizeMove = vi.fn()
    const onResizeEnd = vi.fn()
    const wrapper = mount(() => (
      <Modal
        active
        resizable
        min-width={40}
        min-height={40}
        onResizeStart={onResizeStart}
        onResizeMove={onResizeMove}
        onResizeEnd={onResizeEnd}
      ></Modal>
    ))
    const modal = wrapper.find('.vxp-modal__wrapper')
    const resizer = wrapper.find('.vxp-modal__resizer').element

    await nextTick()
    await nextTick()
    expect(wrapper.find('.vxp-modal__resizer').exists()).toBe(true)
    expect(wrapper.find('.vxp-modal').classes()).toContain('vxp-modal--resizable')

    const downEvent = new CustomEvent('pointerdown') as any
    downEvent.button = 0
    downEvent.clientX = 0
    downEvent.clientY = 0
    resizer.dispatchEvent(downEvent)
    expect(onResizeStart).toHaveBeenCalled()
    expect(onResizeStart).toHaveBeenCalledWith(expect.objectContaining({ width: 0, height: 0 }))

    await nextTick()
    expect(modal.classes()).toContain('vxp-modal__wrapper--resizing')

    const moveEvent = new CustomEvent('pointermove') as any
    moveEvent.clientX = 80
    moveEvent.clientY = 80
    document.dispatchEvent(moveEvent)
    vi.runOnlyPendingTimers()
    await nextTick()
    expect(onResizeMove).toHaveBeenCalled()
    expect(onResizeMove).toHaveBeenCalledWith(expect.objectContaining({ width: 80, height: 80 }))
    expect(modal.attributes('style')).toContain('width: 80px;')
    expect(modal.attributes('style')).toContain('height: 80px;')

    const upEvent = new CustomEvent('pointerup') as any
    upEvent.clientX = 80
    upEvent.clientY = 80
    document.dispatchEvent(upEvent)
    expect(onResizeEnd).toHaveBeenCalled()
    expect(onResizeEnd).toHaveBeenCalledWith(expect.objectContaining({ width: 80, height: 80 }))

    await nextTick()
    expect(modal.classes()).not.toContain('vxp-modal__wrapper--resizing')
  })

  it('position', async () => {
    const wrapper = mount(Modal, {
      props: {
        active: true,
        right: 10,
        width: 100,
        bottom: 10,
        height: 100,
      },
    })
    const modal = wrapper.find('.vxp-modal__wrapper')

    expect(modal.attributes('style')).toContain('top: auto;')
    expect(modal.attributes('style')).toContain('bottom: 10px;')
    expect(modal.attributes('style')).toContain('height: 100px;')
    expect(modal.attributes('style')).toContain('right: 10px;')
    expect(modal.attributes('style')).toContain('width: 100px;')
    expect(modal.attributes('style')).toContain('left: auto;')
  })

  it('adjust buttons', () => {
    const wrapper = mount(() => (
      <Modal confirm-type={'success'} cancel-type={'error'} action-size={'large'}>
        {TEXT}
      </Modal>
    ))
    const buttons = wrapper.findAllComponents('.vxp-button')

    expect(buttons[0].classes()).toContain('vxp-button--error')
    expect(buttons[0].classes()).toContain('vxp-button--large')
    expect(buttons[1].classes()).toContain('vxp-button--success')
    expect(buttons[1].classes()).toContain('vxp-button--large')
  })

  it('undivided', () => {
    const wrapper = mount(() => <Modal undivided>{TEXT}</Modal>)

    expect(wrapper.find('.vxp-modal').classes()).toContain('vxp-modal--undivided')
  })

  it('mask close', async () => {
    const onToggle = vi.fn()
    const onClose = vi.fn()
    const wrapper = mount(Modal, {
      props: {
        active: true,
        onToggle,
        onClose,
      },
    })

    await wrapper.find('.vxp-masker__mask').trigger('click')

    expect(onToggle).toHaveBeenCalledWith(false)
    expect(onClose).toHaveBeenCalled()
  })

  it('before close', async () => {
    const onBeforeClose = vi.fn()
    const wrapper = mount(Modal, {
      props: { closable: true, onBeforeClose },
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
        }),
    )
    await openAndClose()
    expect(wrapper.vm.currentActive).toBe(true)
    resolveRef!(true)
    await nextTick()
    await nextTick()
    expect(wrapper.vm.currentActive).toBe(false)
  })
})
