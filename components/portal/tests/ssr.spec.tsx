/**
 * @vitest-environment node
 */

import { describe, expect, it } from 'vitest'
import { createSSRApp } from 'vue'

import { renderToString } from 'vue/server-renderer'
import { Portal } from '..'

describe('SSR for Portal', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Portal></Portal>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
