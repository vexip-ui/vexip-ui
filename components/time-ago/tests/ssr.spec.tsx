/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { TimeAgo } from '..'

describe('SSR for TimeAgo', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <TimeAgo></TimeAgo>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
