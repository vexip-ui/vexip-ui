import { isNull } from '../../src/utils/common'

function getError(url, xhr) {
  const message = `fail to post ${url} ${xhr.status}'`
  const error = new Error(message)

  error.response = getBody(xhr)
  error.url = url
  error.status = xhr.status
  error.method = 'POST'

  return error
}

function getBody(xhr) {
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

export function upload(options = {}) {
  if (typeof XMLHttpRequest === 'undefined') {
    return Promise.resolve(null)
  }

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    const url = options.url

    if (xhr.upload) {
      xhr.upload.onprogress = event => {
        let percent = 0

        if (event.total > 0) {
          percent = (event.loaded / event.total) * 100
        }

        options.onProgress(percent)
      }
    }

    const formData = new FormData()

    if (options.data) {
      Object.keys(options.data).forEach(key => {
        formData.append(key, options.data[key])
      })
    }

    formData.append(options.field, options.file)

    xhr.onerror = event => {
      options.onError(event)
      reject(event)
    }

    xhr.onload = () => {
      if (xhr.status < 200 || xhr.status >= 300) {
        const error = getError(url, xhr)

        options.onError(error)
        reject(error)

        return
      }

      const body = getBody(xhr)

      options.onSuccess(body)
      resolve(body)
    }

    xhr.open('POST', url, true)

    if (options.withCredentials && 'withCredentials' in xhr) {
      xhr.withCredentials = true
    }

    const headers = options.headers || {}

    for (const item in headers) {
      if (
        Object.prototype.hasOwnProperty.call(headers, item) &&
        !isNull(headers[item])
      ) {
        xhr.setRequestHeader(item, headers[item])
      }
    }

    xhr.send(formData)
  })
}
