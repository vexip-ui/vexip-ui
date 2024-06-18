/**
 * @vitest-environment node
 */

import { describe, expect, it } from 'vitest'
import { createSSRApp } from 'vue'

import { renderToString } from 'vue/server-renderer'
import { FrameArea } from '..'

describe('SSR for FrameArea', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <FrameArea></FrameArea>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
