/**
 * @vitest-environment node
 */

import { describe, expect, it } from 'vitest'
import { createSSRApp } from 'vue'

import { renderToString } from 'vue/server-renderer'
import { Overflow } from '..'

describe('SSR for Overflow', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Overflow></Overflow>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
