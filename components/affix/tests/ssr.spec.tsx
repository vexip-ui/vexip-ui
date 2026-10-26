/**
 * @vitest-environment node
 */

import { describe, expect, it } from 'vitest'
import { createSSRApp } from 'vue'

import { renderToString } from 'vue/server-renderer'
import { Affix } from '..'

describe('SSR for Affix', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Affix></Affix>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
