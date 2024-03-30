/**
 * @vitest-environment node
 */

import { describe, expect, it } from 'vitest'
import { createSSRApp } from 'vue'

import { renderToString } from 'vue/server-renderer'
import { Fence } from '..'

describe('SSR for Fence', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Fence></Fence>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
