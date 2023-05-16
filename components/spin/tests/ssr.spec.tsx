/**
 * @vitest-environment node
 */

import { describe, expect, it } from 'vitest'
import { createSSRApp } from 'vue'

import { renderToString } from 'vue/server-renderer'
import { Spin } from '..'

describe('SSR for Spin', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Spin></Spin>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
