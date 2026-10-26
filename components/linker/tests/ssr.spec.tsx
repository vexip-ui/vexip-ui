/**
 * @vitest-environment node
 */

import { describe, expect, it } from 'vitest'
import { createSSRApp } from 'vue'

import { renderToString } from 'vue/server-renderer'
import { Linker } from '..'

describe('SSR for Linker', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Linker></Linker>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
