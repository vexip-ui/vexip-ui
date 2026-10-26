/**
 * @vitest-environment node
 */

import { describe, expect, it } from 'vitest'
import { createSSRApp } from 'vue'

import { renderToString } from 'vue/server-renderer'
import { Masker } from '..'

describe('SSR for Masker', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Masker></Masker>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
