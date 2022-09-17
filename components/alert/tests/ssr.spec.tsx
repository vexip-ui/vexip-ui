/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { Alert } from '..'

describe('SSR for Alert', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Alert></Alert>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
