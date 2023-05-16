/**
 * @vitest-environment node
 */

import { describe, expect, it } from 'vitest'
import { createSSRApp } from 'vue'

import { renderToString } from 'vue/server-renderer'
import { Ellipsis } from '..'

describe('SSR for Ellipsis', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Ellipsis></Ellipsis>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
