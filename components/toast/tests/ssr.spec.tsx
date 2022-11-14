/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import Toast from '../toast.vue'

describe('SSR for Toast', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Toast></Toast>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
