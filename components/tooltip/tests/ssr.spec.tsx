/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { Tooltip } from '..'

describe('SSR for Tooltip', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Tooltip></Tooltip>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
