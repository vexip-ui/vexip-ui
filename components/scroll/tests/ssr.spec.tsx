/**
 * @vitest-environment node
 */

import { describe, expect, it } from 'vitest'
import { createSSRApp } from 'vue'

import { renderToString } from 'vue/server-renderer'
import { Scroll } from '..'

describe('SSR for Scroll', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Scroll></Scroll>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
