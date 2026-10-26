/**
 * @vitest-environment node
 */

import { describe, expect, it } from 'vitest'
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
