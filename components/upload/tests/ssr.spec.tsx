/**
 * @vitest-environment node
 */

import { describe, expect, it } from 'vitest'
import { createSSRApp } from 'vue'

import { renderToString } from 'vue/server-renderer'
import { Upload } from '..'

describe('SSR for Upload', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Upload></Upload>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
