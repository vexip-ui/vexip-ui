import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import { nextTick } from 'vue'

import { globalIcons } from '@vexip-ui/config'
import { Activity } from 'lucide-vue-next'
import { Video } from '..'

describe('Video', () => {
  it('render', () => {
    const wrapper = mount(Video)

    expect(wrapper.find('.vxp-video').classes()).toContain('vxp-video-vars')
    expect(wrapper.find('video').exists()).toBe(true)
    expect(wrapper.find('.vxp-video__controls').exists()).toBe(true)
  })

  it('extra', () => {
    const wrapper = mount(() => (
      <Video>
        {{
          extra: () => <span class={'extra'}></span>
        }}
      </Video>
    ))

    expect(wrapper.find('.extra').exists()).toBe(true)
  })

  it('src', async () => {
    const wrapper = mount(Video, {
      props: { src: 'a.mp4' }
    })

    expect(wrapper.find('video').attributes('src')).toEqual('a.mp4')

    await wrapper.setProps({ src: 'b.mp4' })
    expect(wrapper.find('video').attributes('src')).toEqual('b.mp4')
  })

  it('no controls', async () => {
    const wrapper = mount(Video)

    expect(wrapper.find('.vxp-video__controls').exists()).toBe(true)

    await wrapper.setProps({ noControls: true })
    expect(wrapper.find('.vxp-video__controls').exists()).toBe(false)
  })

  it('video attrs', () => {
    const wrapper = mount(() => <Video video-attrs={{ foo: 'baz' }}></Video>)

    expect(wrapper.find('video').attributes('foo')).toEqual('baz')
  })

  it('time', async () => {
    const wrapper = mount(Video, {
      props: { src: 'a.mp4', time: 1 }
    })
    const video = wrapper.find('video')

    await nextTick()
    expect(video.element.currentTime).toBe(1)

    await wrapper.setProps({ time: 2 })
    expect(video.element.currentTime).toBe(2)
  })

  it('volume', async () => {
    const wrapper = mount(Video, {
      props: { volume: 1 }
    })
    const video = wrapper.find('video')

    expect(video.element.volume).toBe(1)

    await wrapper.setProps({ volume: 0.5 })
    expect(video.element.volume).toBe(0.5)
  })

  it('volume', async () => {
    const wrapper = mount(Video, {
      props: { playbackRate: 1 }
    })
    const video = wrapper.find('video')

    expect(video.element.playbackRate).toBe(1)

    await wrapper.setProps({ playbackRate: 0.5 })
    expect(video.element.playbackRate).toBe(0.5)
  })

  it('poster', async () => {
    const wrapper = mount(() => <Video poster={'a.jpg'}></Video>)

    expect(wrapper.find('.vxp-video__poster').exists()).toBe(true)
    expect(wrapper.find('.vxp-video__poster').find('img').exists()).toBe(true)
    expect(wrapper.find('.vxp-video__poster').find('img').attributes('src')).toEqual('a.jpg')
  })

  it('poster slot', async () => {
    const wrapper = mount(() => (
      <Video poster={'a.jpg'}>
        {{
          poster: () => <span class={'poster'}></span>
        }}
      </Video>
    ))

    expect(wrapper.find('.vxp-video__poster').exists()).toBe(true)
    expect(wrapper.find('.vxp-video__poster').find('.poster').exists()).toBe(true)
  })

  it('loading', async () => {
    const wrapper = mount(Video)
    wrapper.vm.stateHidden = true
    await nextTick()

    expect(wrapper.find('.vxp-video__loading').exists()).toBe(false)
    expect(wrapper.find('.vxp-video').classes()).not.toContain('vxp-video--loading')
    expect(wrapper.findComponent(globalIcons.value.loading.icon).exists()).toBe(false)

    await wrapper.setProps({ loading: true })
    await nextTick()
    expect(wrapper.find('.vxp-video__loading').exists()).toBe(true)
    expect(wrapper.find('.vxp-video').classes()).toContain('vxp-video--loading')
    expect(wrapper.findComponent(globalIcons.value.loading.icon).exists()).toBe(true)
  })

  it('loading icon', async () => {
    const wrapper = mount(Video, {
      props: { loading: true, loadingIcon: Activity }
    })
    wrapper.vm.stateHidden = true
    await nextTick()

    expect(wrapper.findComponent(globalIcons.value.loading.icon).exists()).toBe(false)
    expect(wrapper.findComponent(Activity).exists()).toBe(true)
  })

  it('player slot', async () => {
    const wrapper = mount(() => (
      <Video>
        {{
          player: () => <video class={'video'}></video>
        }}
      </Video>
    ))

    expect(wrapper.find('.vxp-video__player').exists()).toBe(true)
    expect(wrapper.find('.vxp-video__video').exists()).toBe(false)
    expect(wrapper.find('.video').exists()).toBe(true)
  })

  it('shortcuts', async () => {
    const shortcuts = { refresh: 'A' }
    const onRefresh = vi.fn()
    const wrapper = mount(() => <Video shortcuts={shortcuts} onRefresh={onRefresh}></Video>)

    await nextTick()

    await wrapper.find('.vxp-video').trigger('keydown', { key: 'A' })
    expect(onRefresh).toHaveBeenCalled()
  })

  it('control layout', async () => {
    const layout = {
      left: ['flip'],
      center: ['volume'],
      right: ['play']
    }
    const wrapper = mount(() => <Video control-layout={layout}></Video>)

    await nextTick()

    expect(wrapper.find('.vxp-video__controls-left .vxp-video__flip').exists()).toBe(true)
    expect(wrapper.find('.vxp-video__controls-center .vxp-video__volume').exists()).toBe(true)
    expect(wrapper.find('.vxp-video__controls-right .vxp-video__play').exists()).toBe(true)
  })

  it('custom control', async () => {
    const layout = {
      left: ['foo']
    }
    const wrapper = mount(() => (
      <Video control-layout={layout}>
        {{
          controlFoo: () => <div class={'foo'}></div>
        }}
      </Video>
    ))

    expect(wrapper.find('.vxp-video__controls-left .foo').exists()).toBe(true)
  })
})
