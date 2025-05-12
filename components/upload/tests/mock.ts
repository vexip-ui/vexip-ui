import { nextTick } from 'vue'
import { vi } from 'vitest'

import type { DOMWrapper } from '@vue/test-utils'
import type { UploadSourceFile } from '../symbol'

const getMockFile = (element: HTMLInputElement, files: File[]) => {
  vi.spyOn(element, 'files', 'get').mockReturnValue(files as unknown as FileList)
}

export const getXhr = (type: 'success' | 'error' | 'abort') => {
  return class XMLHttpRequest {
    status = 0
    withCredentials = false
    responseText = '{"success": true}'
    response = 'success'

    upload = {
      onprogress(event: { loaded: number, total: number }) {
        return event
      },
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
        total: 100,
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

export const triggerUploadFiles = async (input: DOMWrapper<HTMLInputElement>, fileList: any[]) => {
  getMockFile(input.element, fileList)
  await input.trigger('change')
  await nextTick()
}

export class FormData {
  append() {
    // mock FormData append
  }
}

export class FileReader {
  result = ''

  readAsDataURL(source: UploadSourceFile) {
    this.result = `data:image/svg+xml;base64,${source.name}`
    nextTick(() => {
      this.onload()
    })
  }

  onload() {
    // mock FileReader onload
  }
}
