/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import Loading from '../loading.vue'

describe('SSR for Loading', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Loading></Loading>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
