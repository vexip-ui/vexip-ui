/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { Progress } from '..'

describe('SSR for Progress', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Progress></Progress>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
