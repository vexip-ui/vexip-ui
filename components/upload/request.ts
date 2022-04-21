import { has, isDefined } from '@/common/utils/common'

import type { HttpError, UploadOptions } from './symbol'

function getError(url: string, xhr: XMLHttpRequest) {
  const message = `fail to post ${url} ${xhr.status}'`
  const error = new Error(message) as HttpError

  error.response = getBody(xhr)
  error.url = url
  error.status = xhr.status
  error.method = 'POST'

  return error
}

function getBody(xhr: XMLHttpRequest) {
  const text = xhr.responseText || xhr.response

  if (!text) {
    return text
  }

  try {
    return JSON.parse(text)
  } catch (e) {
    return text
  }
}

export function upload(options: UploadOptions) {
  if (typeof XMLHttpRequest === 'undefined') {
    return null
  }

  const xhr = new XMLHttpRequest()
  const url = options.url

  if (xhr.upload && options.onProgress) {
    xhr.upload.onprogress = event => {
      let percent = 0

      if (event.total > 0) {
        percent = (event.loaded / event.total) * 100
      }

      options.onProgress!(percent)
    }
  }

  const formData = new FormData()

  if (options.data) {
    const data = options.data

    Object.keys(data).forEach(key => {
      formData.append(key, data[key])
    })
  }

  formData.append(options.field || 'file', options.file)
  options.file.path && formData.append(options.pathField || 'path', options.file.path)

  if (options.onError) {
    xhr.onerror = () => {
      options.onError!(getError(url, xhr))
    }
  }

  xhr.onload = () => {
    if (xhr.status < 200 || xhr.status >= 300) {
      if (options.onError) {
        options.onError(getError(url, xhr))
      }

      return
    }

    const body = getBody(xhr)

    options.onSuccess?.(body)
  }

  if (options.onAbort) {
    xhr.onabort = () => {
      options.onAbort!()
    }
  }

  xhr.open('POST', url, true)

  if (options.withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true
  }

  const headers = options.headers ?? {}

  Object.keys(headers).forEach(header => {
    if (has(headers, header) && isDefined(headers[header])) {
      xhr.setRequestHeader(header, headers[header])
    }
  })

  xhr.send(formData)

  return xhr
}
