/**
 * @vitest-environment node
 */

import { describe, expect, it } from 'vitest'
import { createSSRApp } from 'vue'

import { renderToString } from 'vue/server-renderer'
import { NumberInput } from '..'

describe('SSR for NumberInput', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <NumberInput></NumberInput>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
