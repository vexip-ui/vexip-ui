import { Bubble } from '@/components/bubble'

import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import { Progress } from '..'

describe('Progress', () => {
  it('render', () => {
    const wrapper = mount(Progress)

    expect(wrapper.classes()).toContain('vxp-progress-vars')
    expect(wrapper.find('.vxp-progress__track').exists()).toBe(true)
    expect(wrapper.find('.vxp-progress__filler').exists()).toBe(true)
    expect(wrapper.find('.vxp-progress__percentage').exists()).toBe(true)
    expect(wrapper.find('.vxp-progress__percentage').text()).toEqual('0%')
  })

  it('percentage', () => {
    const wrapper = mount(() => <Progress percentage={30}></Progress>)

    expect(wrapper.attributes('style')).toContain('--vxp-progress-percentage: 30;')
    expect(wrapper.find('.vxp-progress__percentage').text()).toEqual('30%')
  })

  it('bubble info', () => {
    const wrapper = mount(() => <Progress info-type={'bubble-top'}></Progress>)

    expect(wrapper.classes()).toContain('vxp-progress--info-bubble-top')
    expect(wrapper.find('.vxp-progress__reference').exists()).toBe(true)
    expect(wrapper.findComponent(Bubble).exists()).toBe(true)
    expect(wrapper.findComponent(Bubble).classes()).toContain('vxp-bubble--top')
  })

  it('info type', () => {
    (['outside', 'inside', 'bubble', 'bubble-top', 'bubble-bottom', 'none'] as const).forEach(
      type => {
        const wrapper = mount(() => <Progress info-type={type}></Progress>)

        expect(wrapper.classes()).toContain(`vxp-progress--info-${type}`)
        expect(wrapper.find('.vxp-progress__percentage').exists()).toBe(type !== 'none')
      }
    )
  })

  it('stroke width', () => {
    const wrapper = mount(() => <Progress stroke-width={20}></Progress>)

    expect(wrapper.find('.vxp-progress__track').attributes('style')).toContain('height: 20px;')
  })

  it('default slot', () => {
    const wrapper = mount(() => <Progress>{'666'}</Progress>)

    expect(wrapper.find('.vxp-progress__info').text()).toEqual('666')
  })

  it('stroke color', async () => {
    const strokeColor = vi.fn()
    const wrapper = mount(Progress, {
      props: {
        strokeColor: 'red'
      }
    })

    expect(wrapper.find('.vxp-progress__filler').attributes('style')).toContain(
      'background-color: red;'
    )

    await wrapper.setProps({
      strokeColor: ['red', 'yellow']
    })

    expect(wrapper.vm.fillerStyle).toMatchObject({
      backgroundImage: 'linear-gradient(to right, red 0%, yellow 100%)'
    })

    await wrapper.setProps({ strokeColor })
    expect(strokeColor).toHaveBeenCalled()
    expect(strokeColor).toHaveBeenCalledWith(0)
  })

  it('activated', () => {
    const wrapper = mount(() => <Progress activated></Progress>)

    expect(wrapper.find('.vxp-progress').classes()).toContain('vxp-progress--activated')
  })
})
