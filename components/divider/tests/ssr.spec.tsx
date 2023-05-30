/**
 * @vitest-environment node
 */

import { describe, expect, it } from 'vitest'
import { createSSRApp } from 'vue'

import { renderToString } from 'vue/server-renderer'
import { Divider } from '..'

describe('SSR for Divider', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Divider></Divider>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
