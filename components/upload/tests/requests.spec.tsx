import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach, afterAll } from 'vitest'
import { Upload } from '..'
import { formData, getXhr, triggerUploadFiles } from './mock'

vi.stubGlobal('FormData', formData)

afterAll(() => {
  vi.stubGlobal('XMLHttpRequest', undefined)
})

describe('Successful Requests', () => {
  beforeEach(() => {
    vi.stubGlobal('XMLHttpRequest', getXhr('success'))
  })

  it('requests result with `responseText`', async () => {
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

  it('requests result with `response`', async () => {
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

    await triggerUploadFiles(input, fileList)
    expect(done).toHaveBeenCalled()
  })

  it('should work with `withCredentials` prop', async () => {
    const done = vi.fn()
    const wrapper = mount(Upload, {
      props: {
        url: '//jsonplaceholder.typicode.com/posts/',
        onChange() {
          done()
        },
        withCredentials: true
      }
    })

    const input = wrapper.find('input')
    const fileList = [new File(['index'], 'file.txt')]

    await triggerUploadFiles(input, fileList)
    expect(done).toHaveBeenCalled()
  })

  it('should work with `headers` prop', async () => {
    const done = vi.fn()
    const wrapper = mount(Upload, {
      props: {
        url: '//jsonplaceholder.typicode.com/posts/',
        onChange() {
          done()
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }
    })

    const input = wrapper.find('input')
    const fileList = [new File(['index'], 'file.txt')]

    await triggerUploadFiles(input, fileList)
    expect(done).toHaveBeenCalled()
  })

  it('should work with `data` prop', async () => {
    const done = vi.fn()
    const wrapper = mount(Upload, {
      props: {
        url: '//jsonplaceholder.typicode.com/posts/',
        onChange() {
          done()
        },
        data: {
          name: 'test'
        }
      }
    })

    const input = wrapper.find('input')
    const fileList = [new File(['index'], 'file.txt')]

    await triggerUploadFiles(input, fileList)
    expect(done).toHaveBeenCalled()
  })
})

describe('Failed Requests', () => {
  beforeEach(() => {
    vi.stubGlobal('XMLHttpRequest', getXhr('error'))
  })

  it('should work with `on-error` event', async () => {
    const onError = vi.fn()
    const wrapper = mount(Upload, {
      props: {
        url: '//jsonplaceholder.typicode.com/posts/',
        onError
      }
    })

    const input = wrapper.find('input')
    const fileList = [new File(['index'], 'file.txt')]

    await triggerUploadFiles(input, fileList)
    expect(onError).toHaveBeenCalled()
  })

  it('should work with upload failed event', async () => {
    try {
      const onError = vi.fn()
      const wrapper = mount(Upload, {
        props: {
          url: '//jsonplaceholder.typicode.com/posts/',
          onError
        }
      })

      const input = wrapper.find('input')
      const fileList = [new File(['index'], 'file.txt')]

      await triggerUploadFiles(input, fileList)
    } catch (e) {
      expect(e).toBe('Error: fail to post //jsonplaceholder.typicode.com/posts/ 199')
    }
  })
})

describe('Interrupted Requests', () => {
  beforeEach(() => {
    vi.stubGlobal('XMLHttpRequest', getXhr('abort'))
  })

  it('should work with `on-abort` event', async () => {
    const done = vi.fn()
    const wrapper = mount(Upload, {
      props: {
        url: '//jsonplaceholder.typicode.com/posts/',
        onChange(files: any) {
          if (files[0].status === 'pending') {
            done()
          }
        }
      }
    })

    const input = wrapper.find('input')
    const fileList = [new File(['index'], 'file.txt')]

    await triggerUploadFiles(input, fileList)
    expect(done).toHaveBeenCalled()
  })
})
