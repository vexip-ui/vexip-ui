import { describe, it, expect, vi } from 'vitest'
import { nextTick } from 'vue'
import { ImageViewer } from '@/components/image-viewer'
import { ImageGroup } from '@/components/image-group'
import { mount } from '@vue/test-utils'
import { Image } from '..'

const IMAGE = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs='
const TEXT = 'text'

describe('Image', () => {
  it('render', () => {
    const wrapper = mount(() => <Image src={IMAGE}></Image>)

    expect(wrapper.find('.vxp-image').classes()).toContain('vxp-image-vars')
    expect(wrapper.find('.vxp-image__img').exists()).toBe(true)
    expect(wrapper.find('.vxp-image__img').attributes('src')).toEqual(IMAGE)
  })

  it('alt', () => {
    const wrapper = mount(() => <Image alt={TEXT}></Image>)

    expect(wrapper.find('.vxp-image__img').attributes('alt')).toEqual(TEXT)
    expect(wrapper.find('.vxp-image__img').attributes('aria-label')).toEqual(TEXT)
  })

  it('width', async () => {
    const wrapper = mount(Image, {
      props: { width: 200 }
    })

    expect(wrapper.find('.vxp-image__img').attributes('width')).toEqual('200')

    await wrapper.setProps({ width: '123' })
    expect(wrapper.find('.vxp-image__img').attributes('width')).toEqual('123')
  })

  it('height', async () => {
    const wrapper = mount(Image, {
      props: { height: 200 }
    })

    expect(wrapper.find('.vxp-image__img').attributes('height')).toEqual('200')

    await wrapper.setProps({ height: '123' })
    expect(wrapper.find('.vxp-image__img').attributes('height')).toEqual('123')
  })

  it('border', async () => {
    const wrapper = mount(Image, {
      props: { border: true }
    })

    expect(wrapper.classes()).toContain('vxp-image--border')

    await wrapper.setProps({ border: '#fff' })
    expect(wrapper.attributes('style')).toContain('--vxp-image-b-color: #fff;')
  })

  it('radius', () => {
    const wrapper = mount(() => <Image radius={4}></Image>)

    expect(wrapper.find('.vxp-image').attributes('style')).toContain('--vxp-image-radius: 4px;')
  })

  it('placeholder', async () => {
    const onLoad = vi.fn()
    const wrapper = mount(() => <Image src={IMAGE} placeholder={TEXT} onLoad={onLoad}></Image>)
    const img = wrapper.find('.vxp-image__img')

    expect(wrapper.find('.vxp-image__placeholder').exists()).toBe(true)
    expect(wrapper.find('.vxp-image__placeholder').text()).toEqual(TEXT)

    await img.trigger('load')
    expect(wrapper.find('.vxp-image__placeholder').exists()).toBe(false)
    expect(onLoad).toHaveBeenCalled()
  })

  it('placeholder slot', () => {
    const wrapper = mount(Image, {
      props: { src: IMAGE },
      slots: {
        placeholder: () => <span class={'test'}></span>
      }
    })

    expect(wrapper.find('.test').exists()).toBe(true)
  })

  it('skeleton', () => {
    const wrapper = mount(() => <Image src={IMAGE} skeleton></Image>)

    expect(wrapper.find('.vxp-skeleton').exists()).toBe(true)
  })

  it('skeleton props', () => {
    const wrapper = mount(() => <Image src={IMAGE} skeleton={{ class: 'test' }}></Image>)

    expect(wrapper.find('.vxp-skeleton').exists()).toBe(true)
    expect(wrapper.find('.vxp-skeleton').classes()).toContain('test')
  })

  it('error', async () => {
    const onError = vi.fn()
    const wrapper = mount(() => <Image src={'unknown'} error-tip={TEXT} onError={onError}></Image>)
    const img = wrapper.find('.vxp-image__img')

    expect(wrapper.find('.vxp-image__error').exists()).toBe(false)

    await img.trigger('error')
    expect(wrapper.find('.vxp-image__error').exists()).toBe(true)
    expect(wrapper.find('.vxp-image__error').text()).toEqual(TEXT)
    expect(onError).toHaveBeenCalled()
  })

  it('error slot', async () => {
    const wrapper = mount(Image, {
      props: { src: IMAGE },
      slots: {
        error: () => <span class={'test'}></span>
      }
    })
    const img = wrapper.find('.vxp-image__img')

    expect(wrapper.find('.test').exists()).toBe(false)

    await img.trigger('error')
    expect(wrapper.find('.test').exists()).toEqual(true)
  })

  it('object fit', async () => {
    (['fill', 'contain', 'cover', 'none', 'scale-down'] as const).forEach(fit => {
      const wrapper = mount(() => <Image src={IMAGE} fit={fit}></Image>)

      expect(wrapper.find('.vxp-image').attributes('style')).toContain(`--vxp-image-fit: ${fit};`)
    })
  })

  it('fallback src', async () => {
    const wrapper = mount(() => <Image src={'unknown'} fallback-src={IMAGE}></Image>)

    expect(wrapper.find('.vxp-image__img').attributes('src')).toEqual('unknown')

    await wrapper.find('.vxp-image__img').trigger('error')
    expect(wrapper.find('.vxp-image__img').attributes('src')).toEqual(IMAGE)
  })

  it('preview', async () => {
    const onPreview = vi.fn()
    const wrapper = mount(() => <Image src={IMAGE} preview onPreview={onPreview}></Image>)
    const img = wrapper.find('.vxp-image__img')

    await img.trigger('click')

    const viewer = wrapper.find('.vxp-image-viewer')
    expect(viewer.exists()).toBe(true)
    expect(viewer.find('img').exists()).toBe(true)
    expect(viewer.find('img').attributes('src')).toEqual(IMAGE)
    expect(onPreview).toHaveBeenCalled()
    expect(onPreview).toHaveBeenCalledWith(IMAGE)
  })

  it('preview src', async () => {
    const wrapper = mount(() => <Image src={IMAGE} preview preview-src={'unknown'}></Image>)
    const img = wrapper.find('.vxp-image__img')

    await img.trigger('click')

    const viewer = wrapper.find('.vxp-image-viewer')
    expect(viewer.find('img').attributes('src')).toEqual('unknown')
  })

  it('img attrs', () => {
    const wrapper = mount(() => <Image src={IMAGE} img-attrs={{ 'data-test': '123' }}></Image>)
    const img = wrapper.find('.vxp-image__img')

    expect(img.attributes('data-test')).toEqual('123')
  })

  it('group render', () => {
    const wrapper = mount(() => (
      <ImageGroup>
        <Image src={IMAGE}></Image>
        <Image src={IMAGE}></Image>
      </ImageGroup>
    ))

    expect(wrapper.find('.vxp-image-group').classes()).toContain('vxp-image-vars')
    expect(wrapper.findAll('.vxp-image').length).toBe(2)
  })

  it('group show all', async () => {
    const wrapper = mount(ImageGroup, {
      slots: {
        default: () => (
          <>
            <Image src={IMAGE}></Image>
            <Image src={IMAGE}></Image>
          </>
        )
      }
    })

    await nextTick()

    let images = wrapper.findAll('.vxp-image')

    expect(images[0].attributes('style')).not.toContain('display: none;')
    expect(images[1].attributes('style')).toContain('display: none;')

    await wrapper.setProps({ showAll: true })
    images = wrapper.findAll('.vxp-image')
    expect(images[0].attributes('style')).not.toContain('display: none;')
    expect(images[1].attributes('style')).not.toContain('display: none;')
  })

  it('group preview', async () => {
    const onPreview = vi.fn()
    const wrapper = mount(() => (
      <ImageGroup preview onPreview={onPreview}>
        <Image src={'1'}></Image>
        <Image src={IMAGE}></Image>
      </ImageGroup>
    ))
    const images = wrapper.findAll('.vxp-image')

    await nextTick()
    await images[1].find('.vxp-image__img').trigger('click')

    const viewer = wrapper.find('.vxp-image-viewer')
    expect(viewer.exists()).toBe(true)
    expect(viewer.find('img').exists()).toBe(true)
    expect(viewer.find('img').attributes('src')).toEqual(IMAGE)
    expect(onPreview).toHaveBeenCalled()
    expect(onPreview).toHaveBeenCalledWith(IMAGE, ['1', IMAGE])
  })

  it('viewer render', () => {
    const wrapper = mount(() => <ImageViewer active srcs={IMAGE}></ImageViewer>)

    expect(wrapper.find('.vxp-image-viewer').classes()).toContain('vxp-image-vars')
    expect(wrapper.find('.vxp-image-viewer__wrapper').exists()).toBe(true)
    expect(wrapper.find('.vxp-viewer').exists()).toBe(true)
    expect(wrapper.find('.vxp-image-viewer__close').exists()).toBe(true)
    expect(wrapper.find('img').attributes('src')).toEqual(IMAGE)
    expect(wrapper.find('.vxp-image-viewer__prev').exists()).toBe(false)
    expect(wrapper.find('.vxp-image-viewer__next').exists()).toBe(false)
  })

  it('viewer toggle active', async () => {
    const onToggle = vi.fn()
    const wrapper = mount(ImageViewer, {
      props: { onToggle }
    })

    await wrapper.setProps({ active: true })
    expect(onToggle).toHaveBeenCalledTimes(1)
    expect(onToggle).toHaveBeenLastCalledWith(true)
    expect(wrapper.emitted()).toHaveProperty('update:active')
    expect(wrapper.emitted()['update:active'][0]).toEqual([true])

    await wrapper.find('.vxp-image-viewer__close').trigger('click')
    expect(onToggle).toHaveBeenCalledTimes(2)
    expect(onToggle).toHaveBeenLastCalledWith(false)
  })

  it('viewer multiple images', () => {
    const wrapper = mount(() => <ImageViewer active srcs={[IMAGE, IMAGE]}></ImageViewer>)

    expect(wrapper.find('.vxp-image-viewer__prev').exists()).toBe(true)
    expect(wrapper.find('.vxp-image-viewer__next').exists()).toBe(true)
  })

  it('viewer switch image', async () => {
    const onPrev = vi.fn()
    const onNext = vi.fn()
    const onChange = vi.fn()
    const wrapper = mount(ImageViewer, {
      props: {
        active: true,
        srcs: ['1', '2'],
        onPrev,
        onNext,
        onChange
      }
    })
    const prev = wrapper.find('.vxp-image-viewer__prev')
    const next = wrapper.find('.vxp-image-viewer__next')

    expect(prev.classes()).toContain('vxp-image-viewer__prev--disabled')
    expect(next.classes()).not.toContain('vxp-image-viewer__next--disabled')

    await prev.trigger('click')
    expect(onPrev).not.toHaveBeenCalled()
    expect(onChange).not.toHaveBeenCalled()

    await next.trigger('click')
    expect(onNext).toHaveBeenCalledTimes(1)
    expect(onNext).toHaveBeenLastCalledWith(1, '2')
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenLastCalledWith(1, '2')
    expect(prev.classes()).not.toContain('vxp-image-viewer__prev--disabled')
    expect(next.classes()).toContain('vxp-image-viewer__next--disabled')
    expect(wrapper.emitted()).toHaveProperty('update:index')
    expect(wrapper.emitted()['update:index'][0]).toEqual([1])

    await prev.trigger('click')
    expect(onPrev).toHaveBeenCalledTimes(1)
    expect(onPrev).toHaveBeenLastCalledWith(0, '1')
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenLastCalledWith(0, '1')
    expect(prev.classes()).toContain('vxp-image-viewer__prev--disabled')
    expect(next.classes()).not.toContain('vxp-image-viewer__next--disabled')
  })

  it('viewer prev slot', () => {
    const wrapper = mount(ImageViewer, {
      props: {
        active: true,
        srcs: ['1', '2']
      },
      slots: {
        prev: () => <span class={'test'}></span>
      }
    })

    expect(wrapper.find('.vxp-image-viewer__prev').find('.test').exists()).toBe(true)
  })

  it('viewer next slot', () => {
    const wrapper = mount(ImageViewer, {
      props: {
        active: true,
        srcs: ['1', '2']
      },
      slots: {
        next: () => <span class={'test'}></span>
      }
    })

    expect(wrapper.find('.vxp-image-viewer__next').find('.test').exists()).toBe(true)
  })

  it('viewer close slot', () => {
    const wrapper = mount(ImageViewer, {
      props: { active: true },
      slots: {
        close: () => <span class={'test'}></span>
      }
    })

    expect(wrapper.find('.vxp-image-viewer__close').find('.test').exists()).toBe(true)
  })

  it('transfer', async () => {
    mount(() => <ImageViewer active transfer></ImageViewer>)

    await nextTick()
    await nextTick()
    expect(document.querySelector('.vxp-image-viewer')).not.toBeNull()
  })
})
