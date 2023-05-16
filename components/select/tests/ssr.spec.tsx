/**
 * @vitest-environment node
 */

import { describe, expect, it } from 'vitest'
import { createSSRApp } from 'vue'

import { renderToString } from 'vue/server-renderer'
import { Select } from '..'

describe('SSR for Select', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Select></Select>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
