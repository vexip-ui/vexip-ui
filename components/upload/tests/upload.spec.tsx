import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import { Upload } from '..'

const sleep = async (ms: number): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

const getMockFile = (element: Element, files: File[]): void => {
  Object.defineProperty(element, 'files', {
    get() {
      return files
    },
    set() {
      return true
    }
  })
}

function FormDataMock(this: any) {
  this.append = vi.fn()
}

vi.stubGlobal('FormData', FormDataMock)

describe('Upload', () => {
  it('should render', async () => {
    const wrapper = mount(() => <Upload></Upload>)
    expect(wrapper.find('.vxp-upload').exists()).toBe(true)
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

    getMockFile(input.element, fileList)
    await input.trigger('change')
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

    getMockFile(input.element, fileList)
    await input.trigger('change')
    await sleep(0)

    expect(onFilterError).toHaveBeenCalled()
    expect(done).toHaveBeenCalled()

    await wrapper.setProps({
      filter: ['png', 'jpg']
    })

    getMockFile(input.element, [new File(['index'], 'file.svg'), new File(['index'], 'image.jpg')])
    await input.trigger('change')
    await sleep(0)

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

    getMockFile(input.element, fileList)
    await input.trigger('change')
    await sleep(0)

    expect(onSizeError).toHaveBeenCalled()
  })
  it('should work with normal upload', async () => {
    const done = vi.fn()
    const wrapper = mount(Upload, {
      props: {
        url: '//jsonplaceholder.typicode.com/posts/',
        onChange() {
          done()
        }
      }
    })

    const input = wrapper.find('input')
    const fileList = [new File(['index'], 'file.txt')]

    getMockFile(input.element, fileList)
    await input.trigger('change')
    await sleep(0)

    expect(done).toHaveBeenCalled()
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

    getMockFile(input.element, fileList)
    await input.trigger('change')
    await sleep(0)

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

    getMockFile(input.element, fileList)
    await input.trigger('change')
    await sleep(0)

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

    getMockFile(input.element, fileList)
    await input.trigger('change')
    await sleep(0)

    expect(wrapper.findAll('.vxp-upload__file').length).toBe(1)

    const deleteIcon = wrapper.find('.vxp-upload__close')
    await deleteIcon.trigger('click')

    expect(wrapper.findAll('.vxp-upload__file').length).toBe(0)
  })
  it('should work with `on-progress` event', async () => {
    class xhr {
      status = 0
      upload = {
        // eslint-disable-next-line @typescript-eslint/member-delimiter-style
        onprogress(event: { loaded: number; total: number }) {
          // mock xhr progress
          console.log(event)
        }
      }

      open() {
        // start mock xhr
      }

      setRequestHeader() {
        // set mock xhr header
      }

      send() {
        // send mock xhr
        this.status = 200
        this.onload()
        this.upload.onprogress({
          loaded: 50,
          total: 100
        })
      }

      onload() {
        // mock xhr onload
      }
    }
    vi.stubGlobal('XMLHttpRequest', xhr)

    const onProgress = vi.fn(async () => true)
    const wrapper = mount(Upload, {
      props: {
        url: '//jsonplaceholder.typicode.com/posts/',
        onProgress
      }
    })

    const input = wrapper.find('input')
    const fileList = [new File(['index'], 'file.txt')]

    getMockFile(input.element, fileList)
    await input.trigger('change')
    await sleep(0)

    expect(onProgress).toHaveBeenCalled()
    vi.stubGlobal('XMLHttpRequest', undefined)
  })

  it('should work with `on-preview` event', async () => {
    const onPreview = vi.fn(async () => true)
    const wrapper = mount(Upload, {
      props: {
        url: '//jsonplaceholder.typicode.com/posts/',
        onPreview,
        listType: 'card',
        onChange(file) {
          console.log(file)
        }
      }
    })

    const input = wrapper.find('input')
    const fileList = [
      new File(['index'], 'file.png', {
        type: 'image/png',
        base64:'dasdasdas'
      })
    ]

    getMockFile(input.element, fileList)
    await input.trigger('change')
    await sleep(0)

    const button = wrapper.findAll('.vxp-upload__actions > button')[0]
    console.log(button.attributes())
    await button.trigger('click')

    expect(onPreview).toHaveBeenCalled()
  })
})
