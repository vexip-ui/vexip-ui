import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import { Popup } from '..'

describe('Popup', () => {
  it('render', () => {
    mount(Popup)
  })

  it('placement', () => {
    ;(
      [
        'top-right',
        'top-center',
        'top-left',
        'bottom-right',
        'bottom-center',
        'bottom-left',
      ] as const
    ).forEach(placement => {
      const wrapper = mount(() => <Popup placement={placement}></Popup>)

      expect(wrapper.find('.vxp-popup').classes()).toContain(`vxp-popup--${placement}`)
    })
  })

  it('add item', async () => {
    const wrapper = mount(Popup)

    await wrapper.vm.add({})
    expect(wrapper.find('.vxp-popup__item').exists()).toBe(true)
  })

  it('remove item', async () => {
    const onClose = vi.fn()
    const wrapper = mount(Popup)

    const key = await wrapper.vm.add({ onClose })
    expect(wrapper.find('.vxp-popup__item').exists()).toBe(true)

    await wrapper.vm.remove(key)
    expect(onClose).toHaveBeenCalled()
    expect(onClose).toHaveBeenCalledWith(true)
  })
})
