/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { Pagination } from '..'

describe('SSR for Pagination', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Pagination></Pagination>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
