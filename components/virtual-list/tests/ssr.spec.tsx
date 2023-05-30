/**
 * @vitest-environment node
 */

import { describe, expect, it } from 'vitest'
import { createSSRApp } from 'vue'

import { renderToString } from 'vue/server-renderer'
import { VirtualList } from '..'

describe('SSR for VirtualList', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <VirtualList></VirtualList>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
