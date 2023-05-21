import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'

import { Upload } from '..'
import { FileReader, FormData, getXhr, triggerUploadFiles } from './mock'

vi.useFakeTimers()

beforeAll(() => {
  vi.stubGlobal('XMLHttpRequest', getXhr('success'))
  vi.stubGlobal('FormData', FormData)
  vi.stubGlobal('FileReader', FileReader)
})

afterAll(() => {
  vi.stubGlobal('XMLHttpRequest', undefined)
  vi.stubGlobal('FormData', undefined)
  vi.stubGlobal('FileReader', undefined)
})

describe('Upload', () => {
  it('should render', async () => {
    const wrapper = mount(() => <Upload></Upload>)
    expect(wrapper.find('.vxp-upload').exists()).toBe(true)
    expect(wrapper.find('.vxp-upload').classes()).toContain('vxp-upload-vars')
    expect(wrapper.find('input[type=file]').exists()).toBe(true)
  })

  it('should work with `file list`', async () => {
    const fileList = [
      {
        id: 1,
        name: 'file1.txt'
      }
    ]
    const wrapper = mount(() => <Upload file-list={fileList}></Upload>)
    expect(wrapper.find('.vxp-upload__files').exists()).toBe(true)
  })

  it('should work with `multiple` prop ', async () => {
    const wrapper = mount(() => <Upload multiple></Upload>)
    expect(wrapper.find('input').attributes('multiple')).toBe('')
  })

  it('should work with `tip` prop ', async () => {
    const tipText = 'test tip'
    const wrapper = mount(() => <Upload tip={tipText}></Upload>)
    expect(wrapper.find('.vxp-upload__tip').text()).toBe(tipText)
  })

  it('should work with `list-type` prop ', async () => {
    let listType = 'name'

    const wrapper = mount(() => <Upload list-type={listType}></Upload>)
    const input = wrapper.find('input')
    const fileList = [new File(['index'], 'file.txt')]

    await triggerUploadFiles(input, fileList)
    expect(wrapper.findAll('.vxp-upload__file--name').length).toBe(1)

    listType = 'thumbnail'
    await wrapper.setProps({
      listType
    })
    expect(wrapper.findAll('.vxp-upload__file--thumbnail').length).toBe(1)

    listType = 'card'
    await wrapper.setProps({
      listType
    })
    expect(wrapper.findAll('.vxp-upload__file--card').length).toBe(1)
  })

  it('should work with `block` prop ', async () => {
    const wrapper = mount(() => <Upload block></Upload>)
    expect(wrapper.find('.vxp-upload--block').exists()).toBe(true)
  })

  it('should work with `accept` prop ', async () => {
    let accept: string | string[] = 'test'
    const wrapper = mount(() => <Upload accept={accept}></Upload>)
    expect(wrapper.find('input').attributes('accept')).toBe(accept)

    accept = ['test', 'test2']
    await wrapper.setProps({
      accept
    })
    expect(wrapper.find('input').attributes('accept')).toBe(accept.join(','))
  })

  it('should work with `filter` prop and `on-filter-error` event ', async () => {
    const onFilterError = vi.fn()
    const done = vi.fn()
    const wrapper = mount(Upload, {
      props: {
        url: '//jsonplaceholder.typicode.com/posts/',
        filter: 'png',
        onFilterError,
        onChange(files: any) {
          const file = files[0]
          if (file.status === 'pending') {
            done()
          }
        }
      }
    })

    const input = wrapper.find('input')
    const fileList = [new File(['index'], 'file.svg')]

    await triggerUploadFiles(input, fileList)

    expect(onFilterError).toHaveBeenCalled()
    expect(done).toHaveBeenCalled()

    await wrapper.setProps({
      filter: ['png', 'jpg']
    })

    await triggerUploadFiles(input, [
      new File(['index'], 'file.svg'),
      new File(['index'], 'image.jpg')
    ])
    await input.trigger('change')
    await nextTick()

    expect(onFilterError).toHaveBeenCalled()
    expect(done).toHaveBeenCalled()
  })

  it('should work with `max-size` prop and `size-error` event ', async () => {
    const onSizeError = vi.fn()
    const wrapper = mount(Upload, {
      props: {
        url: '//jsonplaceholder.typicode.com/posts/',
        maxSize: 1,
        onSizeError
      }
    })

    const input = wrapper.find('input')
    const fileList = [new File([new Array(1025).fill(1).join('')], 'file.svg')]

    await triggerUploadFiles(input, fileList)
    expect(onSizeError).toHaveBeenCalled()
  })

  it('should work with normal upload', async () => {
    const onChange = vi.fn()
    const wrapper = mount(Upload, {
      props: {
        url: '//jsonplaceholder.typicode.com/posts/',
        onChange
      }
    })

    const input = wrapper.find('input')
    const fileList = [new File(['index'], 'file.txt')]

    await triggerUploadFiles(input, fileList)
    expect(onChange).toHaveBeenCalled()
  })

  it('should work with `on-before-upload` event', async () => {
    const onBeforeUpload = vi.fn(async () => true)
    const wrapper = mount(Upload, {
      props: {
        url: '//jsonplaceholder.typicode.com/posts/',
        onBeforeUpload
      }
    })

    const input = wrapper.find('input')
    const fileList = [new File(['index'], 'file.txt')]

    await triggerUploadFiles(input, fileList)
    expect(onBeforeUpload).toHaveBeenCalled()
  })

  it('should work with `on-before-select` event', async () => {
    const onBeforeSelect = vi.fn(async () => true)
    const wrapper = mount(Upload, {
      props: {
        url: '//jsonplaceholder.typicode.com/posts/',
        onBeforeSelect
      }
    })

    const input = wrapper.find('input')
    const fileList = [new File(['index'], 'file.txt')]

    await triggerUploadFiles(input, fileList)
    expect(onBeforeSelect).toHaveBeenCalled()
  })

  it('should work with delete event', async () => {
    const wrapper = mount(Upload, {
      props: {
        url: '//jsonplaceholder.typicode.com/posts/'
      }
    })

    const input = wrapper.find('input')
    const fileList = [new File(['index'], 'file.txt')]

    await triggerUploadFiles(input, fileList)
    expect(wrapper.findAll('.vxp-upload__file').length).toBe(1)

    const deleteIcon = wrapper.find('.vxp-upload__close')
    await deleteIcon.trigger('click')

    expect(wrapper.findAll('.vxp-upload__file').length).toBe(0)
  })

  it('should work with `on-progress` event', async () => {
    const onProgress = vi.fn(async () => true)
    const wrapper = mount(Upload, {
      props: {
        url: '//jsonplaceholder.typicode.com/posts/',
        onProgress
      }
    })

    const input = wrapper.find('input')
    const fileList = [new File(['index'], 'file.txt')]

    await triggerUploadFiles(input, fileList)
    expect(onProgress).toHaveBeenCalled()
  })

  it('should work with `drag` event ', async () => {
    const wrapper = mount(() => <Upload allow-drag manual></Upload>)
    const triggerItem = wrapper.find('.vxp-upload__control')
    const hasDargOver = () =>
      expect(wrapper.find('.vxp-upload__control').classes()).toContain(
        'vxp-upload__control--drag-over'
      )
    const notDragOver = () =>
      expect(wrapper.find('.vxp-upload__control').classes()).not.toContain(
        'vxp-upload__control--drag-over'
      )

    notDragOver()

    await triggerItem.trigger('dragover')
    hasDargOver()

    await triggerItem.trigger('dragleave')
    vi.runAllTimers()
    await nextTick()
    notDragOver()

    await triggerItem.trigger('dragover')
    hasDargOver()

    await triggerItem.trigger('drop')
    notDragOver()
  })

  it('should work with `on-preview` event', async () => {
    const onPreview = vi.fn()
    const wrapper = mount(Upload, {
      props: {
        url: '//jsonplaceholder.typicode.com/posts/',
        onPreview,
        listType: 'card'
      }
    })

    const input = wrapper.find('input')
    const fileList = [new File(['index'], 'file.png', { type: 'image/png' })]

    await triggerUploadFiles(input, fileList)
    const button = wrapper.findAll('.vxp-upload__action')[0]
    await button.find('i').trigger('click')

    expect(onPreview).toHaveBeenCalled()
  })

  it('default files', () => {
    const defaultFiles = [{ name: 'a.jpg' }]
    const wrapper = mount(() => <Upload default-files={defaultFiles}></Upload>)

    expect(wrapper.findAll('.vxp-upload__file--name').length).toBe(1)
  })
})
