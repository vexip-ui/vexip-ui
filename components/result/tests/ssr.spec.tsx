/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { Result } from '..'

describe('SSR for Result', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Result></Result>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
