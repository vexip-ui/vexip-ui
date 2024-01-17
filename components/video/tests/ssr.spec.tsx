/**
 * @vitest-environment node
 */

import { describe, expect, it } from 'vitest'
import { createSSRApp } from 'vue'

import { renderToString } from 'vue/server-renderer'
import { Video } from '..'

describe('SSR for Video', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Video></Video>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
