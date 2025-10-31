import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { ObjectFit } from '..'

const TEXT = 'Test Content'

describe('ObjectFit', () => {
  it('render', () => {
    const wrapper = mount(() => <ObjectFit>{TEXT}</ObjectFit>)

    expect(wrapper.find('.vxp-object-fit').exists()).toBe(true)
    expect(wrapper.find('.vxp-object-fit__inner').exists()).toBe(true)
    expect(wrapper.find('.vxp-object-fit__scale').exists()).toBe(true)
    expect(wrapper.find('.vxp-object-fit__scale').text()).toEqual(TEXT)
  })

  it('default props', () => {
    const wrapper = mount(() => <ObjectFit>{TEXT}</ObjectFit>)

    expect(wrapper.find('.vxp-object-fit').exists()).toBe(true)
    expect(wrapper.find('.vxp-object-fit__inner').attributes('style')).toContain('width: 0px')
    expect(wrapper.find('.vxp-object-fit__inner').attributes('style')).toContain('height: 0px')
  })

  it('width and height props', () => {
    const wrapper = mount(() => (
      <ObjectFit width={200} height={150}>
        {TEXT}
      </ObjectFit>
    ))

    expect(wrapper.find('.vxp-object-fit').exists()).toBe(true)
  })

  it('fit modes', () => {
    const fits = ['contain', 'cover', 'fill', 'none', 'scale-down'] as const

    fits.forEach(fit => {
      const wrapper = mount(() => (
        <ObjectFit width={200} height={150} fit={fit}>
          {TEXT}
        </ObjectFit>
      ))

      expect(wrapper.find('.vxp-object-fit').exists()).toBe(true)
    })
  })

  it('scaleDisabled prop', () => {
    const wrapper = mount(() => (
      <ObjectFit width={200} height={150} scaleDisabled={true}>
        {TEXT}
      </ObjectFit>
    ))

    expect(wrapper.find('.vxp-object-fit').exists()).toBe(true)
  })

  it('exposed properties', async () => {
    const wrapper = mount(() => (
      <ObjectFit width={200} height={150}>
        {TEXT}
      </ObjectFit>
    ))

    await wrapper.vm.$nextTick()
    expect(wrapper.vm).toBeDefined()
  })

  it('slot content', () => {
    const wrapper = mount(() => (
      <ObjectFit>
        <div class={'custom-content'}>{TEXT}</div>
      </ObjectFit>
    ))

    expect(wrapper.find('.custom-content').exists()).toBe(true)
    expect(wrapper.find('.custom-content').text()).toEqual(TEXT)
  })

  it('responsive behavior', async () => {
    const wrapper = mount(() => (
      <ObjectFit width={200} height={150} fit={'contain'}>
        {TEXT}
      </ObjectFit>
    ))

    expect(wrapper.find('.vxp-object-fit').exists()).toBe(true)
    expect(wrapper.find('.vxp-object-fit__inner').exists()).toBe(true)
    expect(wrapper.find('.vxp-object-fit__scale').exists()).toBe(true)
  })

  it('fit prop change', async () => {
    const wrapper = mount(() => (
      <ObjectFit width={200} height={150} fit={'none'}>
        {TEXT}
      </ObjectFit>
    ))

    await wrapper.setProps({ fit: 'contain' })
    expect(wrapper.find('.vxp-object-fit').exists()).toBe(true)
  })
})
