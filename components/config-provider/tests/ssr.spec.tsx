/**
 * @vitest-environment node
 */

import { describe, expect, it } from 'vitest'
import { createSSRApp } from 'vue'

import { renderToString } from 'vue/server-renderer'
import { ConfigProvider } from '..'

describe('SSR for ConfigProvider', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <ConfigProvider></ConfigProvider>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
