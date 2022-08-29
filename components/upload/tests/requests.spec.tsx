import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { Upload } from '..'
import { FormData, getXhr, triggerUploadFiles } from './mock'

vi.useFakeTimers()

beforeEach(() => {
  vi.stubGlobal('FormData', FormData)
})

afterEach(() => {
  vi.stubGlobal('XMLHttpRequest', undefined)
  vi.stubGlobal('FormData', undefined)
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

  it('should work with `withCredentials` prop', async () => {
    const onChange = vi.fn()
    const wrapper = mount(Upload, {
      props: {
        url: '//jsonplaceholder.typicode.com/posts/',
        onChange,
        withCredentials: true
      }
    })

    const input = wrapper.find('input')
    const fileList = [new File(['index'], 'file.txt')]

    await triggerUploadFiles(input, fileList)
    expect(onChange).toHaveBeenCalled()
  })

  it('should work with `headers` prop', async () => {
    const onChange = vi.fn()
    const wrapper = mount(Upload, {
      props: {
        url: '//jsonplaceholder.typicode.com/posts/',
        onChange,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    })

    const input = wrapper.find('input')
    const fileList = [new File(['index'], 'file.txt')]

    await triggerUploadFiles(input, fileList)
    expect(onChange).toHaveBeenCalled()
  })

  it('should work with `data` prop', async () => {
    const onChange = vi.fn()
    const wrapper = mount(Upload, {
      props: {
        url: '//jsonplaceholder.typicode.com/posts/',
        onChange,
        data: {
          name: 'test'
        }
      }
    })

    const input = wrapper.find('input')
    const fileList = [new File(['index'], 'file.txt')]

    await triggerUploadFiles(input, fileList)
    expect(onChange).toHaveBeenCalled()
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
