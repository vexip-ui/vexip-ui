import { describe, expect, it } from 'vitest'
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
    ;(['center', 'left', 'right'] as const).forEach(position => {
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

  it('margin', async () => {
    const wrapper = mount(Divider, {
      props: { margin: 10 }
    })

    expect(wrapper.attributes('style')).toContain('margin-top: 10px;')
    expect(wrapper.attributes('style')).toContain('margin-bottom: 10px;')

    await wrapper.setProps({ vertical: true })
    expect(wrapper.attributes('style')).not.toContain('margin-top')
    expect(wrapper.attributes('style')).not.toContain('margin-bottom')
    expect(wrapper.attributes('style')).toContain('margin-right: 10px;')
    expect(wrapper.attributes('style')).toContain('margin-left: 10px;')
  })
})
