/**
 * @vitest-environment node
 */

import { describe, expect, it } from 'vitest'
import { createSSRApp } from 'vue'

import { renderToString } from 'vue/server-renderer'
import { Popup } from '..'

describe('SSR for Popup', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Popup></Popup>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
