import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import { Upload } from '..'

function FormDataMock(this: any) {
  this.append = vi.fn()
}

vi.stubGlobal('FormData', FormDataMock)

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

const sleep = async (ms: number): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

describe('Requests', () => {
  it('requests result with `responseText`', async () => {
    class xhr {
      status = 0
      withCredentials = false
      responseText = '{"success": true}'
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
        this.onabort()
      }

      onload() {
        // mock xhr onload
      }

      onabort() {
        // mock xhr onabort
      }
    }
    vi.stubGlobal('XMLHttpRequest', xhr)

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
    vi.stubGlobal('XMLHttpRequest', undefined)
  })
  it('requests result with `response`', async () => {
    class xhr {
      status = 0
      withCredentials = false
      response = 'success'
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
        this.onabort()
      }

      onload() {
        // mock xhr onload
      }

      onabort() {
        // mock xhr onabort
      }
    }
    vi.stubGlobal('XMLHttpRequest', xhr)

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
    vi.stubGlobal('XMLHttpRequest', undefined)
  })
  it('should work with `on-error` event', async () => {
    class xhr {
      status = 0

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
        this.onerror()
      }

      onload() {
        // mock xhr onload
      }

      onerror() {
        // mock xhr onerror
      }
    }
    vi.stubGlobal('XMLHttpRequest', xhr)

    const onError = vi.fn(async () => true)
    const wrapper = mount(Upload, {
      props: {
        url: '//jsonplaceholder.typicode.com/posts/',
        onError
      }
    })

    const input = wrapper.find('input')
    const fileList = [new File(['index'], 'file.txt')]

    getMockFile(input.element, fileList)
    await input.trigger('change')
    await sleep(0)

    expect(onError).toHaveBeenCalled()
    vi.stubGlobal('XMLHttpRequest', undefined)
  })
  it('should work with upload failed event', async () => {
    try {
      class xhr {
        status = 0

        open() {
          // start mock xhr
        }

        setRequestHeader() {
          // set mock xhr header
        }

        send() {
          // send mock xhr
          this.status = 199
          this.onload()
          this.onerror()
        }

        onload() {
          // mock xhr onload
        }

        onerror() {
          // mock xhr onerror
        }
      }
      vi.stubGlobal('XMLHttpRequest', xhr)
      const onError = vi.fn()
      const wrapper = mount(Upload, {
        props: {
          url: '//jsonplaceholder.typicode.com/posts/',
          onError
        }
      })

      const input = wrapper.find('input')
      const fileList = [new File(['index'], 'file.txt')]

      getMockFile(input.element, fileList)
      await input.trigger('change')
    } catch (e) {
      expect(e).toBe('Error: fail to post //jsonplaceholder.typicode.com/posts/ 199')
    }
  })
  it('should work with `on-abort` event', async () => {
    class xhr {
      status = 0

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
        this.onabort()
      }

      onload() {
        // mock xhr onload
      }

      onabort() {
        // mock xhr onabort
      }
    }
    vi.stubGlobal('XMLHttpRequest', xhr)

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

    getMockFile(input.element, fileList)
    await input.trigger('change')
    await sleep(0)

    expect(done).toHaveBeenCalled()
    vi.stubGlobal('XMLHttpRequest', undefined)
  })
  it('should work with `withCredentials` prop', async () => {
    class xhr {
      status = 0
      withCredentials = false
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
        this.onabort()
      }

      onload() {
        // mock xhr onload
      }

      onabort() {
        // mock xhr onabort
      }
    }
    vi.stubGlobal('XMLHttpRequest', xhr)

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

    getMockFile(input.element, fileList)
    await input.trigger('change')
    await sleep(0)

    expect(done).toHaveBeenCalled()
    vi.stubGlobal('XMLHttpRequest', undefined)
  })
  it('should work with `headers` prop', async () => {
    class xhr {
      status = 0
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
        this.onabort()
      }

      onload() {
        // mock xhr onload
      }

      onabort() {
        // mock xhr onabort
      }
    }
    vi.stubGlobal('XMLHttpRequest', xhr)

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

    getMockFile(input.element, fileList)
    await input.trigger('change')
    await sleep(0)

    expect(done).toHaveBeenCalled()
    vi.stubGlobal('XMLHttpRequest', undefined)
  })
  it('should work with `data` prop', async () => {
    class xhr {
      status = 0
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
        this.onabort()
      }

      onload() {
        // mock xhr onload
      }

      onabort() {
        // mock xhr onabort
      }
    }
    vi.stubGlobal('XMLHttpRequest', xhr)

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

    getMockFile(input.element, fileList)
    await input.trigger('change')
    await sleep(0)

    expect(done).toHaveBeenCalled()
    vi.stubGlobal('XMLHttpRequest', undefined)
  })
})
