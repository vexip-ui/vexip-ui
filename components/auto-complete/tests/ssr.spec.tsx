/**
 * @vitest-environment node
 */

import { describe, expect, it } from 'vitest'
import { createSSRApp } from 'vue'

import { renderToString } from 'vue/server-renderer'
import { AutoComplete } from '..'

describe('SSR for AutoComplete', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <AutoComplete></AutoComplete>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
