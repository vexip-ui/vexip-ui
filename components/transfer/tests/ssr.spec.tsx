/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { Transfer } from '..'

describe('SSR for Transfer', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Transfer></Transfer>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
