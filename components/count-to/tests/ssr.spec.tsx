/**
 * @vitest-environment node
 */

import { describe, expect, it } from 'vitest'
import { createSSRApp } from 'vue'

import { renderToString } from 'vue/server-renderer'
import { CountTo } from '..'

describe('SSR for CountTo', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <CountTo></CountTo>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
