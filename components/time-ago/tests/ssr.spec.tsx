/**
 * @vitest-environment node
 */

import { describe, expect, it } from 'vitest'
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
