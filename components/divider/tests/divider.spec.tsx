import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Divider } from '..'

const TEXT = 'Text'

describe('Divider', () => {
  it('render', () => {
    const wrapper = mount(Divider)

    expect(wrapper.classes()).toContain('vxp-divider-vars')
    expect(wrapper.classes()).toContain('vxp-divider--horizontal')
  })

  it('vertical', () => {
    const wrapper = mount(() => <Divider vertical></Divider>)

    expect(wrapper.find('.vxp-divider').classes()).toContain('vxp-divider--vertical')
  })

  it('with text', async () => {
    const wrapper = mount(Divider, {
      slots: {
        default: () => TEXT
      }
    })

    expect(wrapper.classes()).toContain('vxp-divider--with-text')

    await wrapper.setProps({ vertical: true })
    expect(wrapper.classes()).not.toContain('vxp-divider--with-text')
  })

  it('text position', () => {
    (['center', 'left', 'right'] as const).forEach(position => {
      const wrapper = mount(() => <Divider text-position={position}>{TEXT}</Divider>)

      if (position === 'center') {
        expect(wrapper.find('.vxp-divider').classes()).not.toContain(
          'vxp-divider--with-text-center'
        )
      } else {
        expect(wrapper.find('.vxp-divider').classes()).toContain(
          `vxp-divider--with-text-${position}`
        )
      }
    })
  })
})
