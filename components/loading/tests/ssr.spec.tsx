/**
 * @vitest-environment node
 */

import { describe, expect, it } from 'vitest'
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
