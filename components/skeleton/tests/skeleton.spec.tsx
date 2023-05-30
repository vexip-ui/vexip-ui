import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { Skeleton } from '..'

const TEXT = 'TEXT'
describe('Skeleton', () => {
  it('render', () => {
    const wrapper = mount(Skeleton)

    expect(wrapper.classes()).toContain('vxp-skeleton-vars')
  })

  it('block', async () => {
    const wrapper = mount(Skeleton, {
      props: {
        block: true
      }
    })
    expect(wrapper.classes()).toContain('vxp-skeleton--block')
  })

  it('image', async () => {
    const wrapper = mount(Skeleton, {
      props: {
        image: true
      }
    })
    expect(wrapper.classes()).toContain('vxp-skeleton--image')
  })

  it('circle', async () => {
    const wrapper = mount(Skeleton, {
      props: {
        circle: true
      }
    })
    expect(wrapper.classes()).toContain('vxp-skeleton--circle')
  })

  it('width', async () => {
    const wrapper = mount(Skeleton, {
      props: {
        block: true,
        width: 20
      }
    })

    expect(wrapper.find('.vxp-skeleton').attributes('style')).toContain(
      '--vxp-skeleton-width: 20px;'
    )
  })

  it('height', async () => {
    const wrapper = mount(Skeleton, {
      props: {
        block: true,
        height: 20
      }
    })

    expect(wrapper.find('.vxp-skeleton').attributes('style')).toContain(
      '--vxp-skeleton-height: 20px;'
    )
  })

  it('spread', async () => {
    const wrapper = mount(Skeleton, {
      props: {
        block: true,
        spread: 20
      }
    })

    expect(wrapper.find('.vxp-skeleton').attributes('style')).toContain(
      '--vxp-skeleton-spread: 20px;'
    )
  })

  it('tag', () => {
    const wrapper = mount(Skeleton, {
      props: {
        tag: 'xxx'
      }
    })
    expect(wrapper.find('.vxp-skeleton').element.tagName).toEqual('XXX')
  })

  it('repeat', () => {
    const wrapper = mount(Skeleton, {
      props: {
        repeat: 2
      }
    })
    expect(wrapper.findAll('.vxp-skeleton').length).toBe(2)
  })

  it('slot', async () => {
    const wrapper = mount(Skeleton, {
      props: {
        loading: true
      },
      slots: {
        default: () => <span class={'content'}>{TEXT}</span>
      }
    })

    expect(wrapper.find('.content').exists()).toBe(false)
    await wrapper.setProps({
      loading: false
    })
    expect(wrapper.find('.content').exists()).toBe(true)
  })

  it('activated', () => {
    const wrapper = mount(() => <Skeleton activated></Skeleton>)

    expect(wrapper.find('.vxp-skeleton').classes()).toContain('vxp-skeleton--activated')
  })
})
