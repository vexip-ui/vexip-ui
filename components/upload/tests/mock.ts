import type { DOMWrapper } from '@vue/test-utils'
import { vi } from 'vitest'
import { nextTick } from 'vue'
import type { SourceFile } from '..'

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

export const sleep = async (ms: number): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}
export const getXhr = (type: 'success' | 'error' | 'abort') => {
  return class xhr {
    status = 0
    withCredentials = false
    responseText = '{"success": true}'
    response = 'success'

    upload = {
      onprogress(event: { loaded: number, total: number }) {
        return event
      }
    }

    open() {
      // start mock xhr
    }

    setRequestHeader() {
      // set mock xhr header
    }

    send() {
      if (type === 'success') {
        // send mock xhr
        this.status = 200
      } else if (type === 'abort') {
        this.onabort()
        this.abort()
      } else if (type === 'error') {
        this.status = 199
        this.onerror()
      }

      this.onload()
      this.upload.onprogress({
        loaded: 50,
        total: 100
      })
    }

    onload() {
      // mock xhr onload
    }

    onabort() {
      // mock xhr onabort
    }

    abort() {
      // mock xhr abort
    }

    onerror() {
      // mock xhr onerror
    }
  }
}

export const triggerUploadFiles = async (
  input: DOMWrapper<HTMLInputElement>,
  fileList: any[],
  sleepCount = 0
): Promise<void> => {
  getMockFile(input.element, fileList)
  await input.trigger('change')
  await sleep(sleepCount)
}

export function formData(this: any) {
  this.append = vi.fn()
}

export class fileReader {
  result = ''

  readAsDataURL(source: SourceFile) {
    this.result = `data:image/svg+xml;base64,${source.name}`
    nextTick(() => {
      this.onload()
    })
  }

  onload() {
    // mock fileReader onload
  }
}
