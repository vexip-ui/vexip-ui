/**
 * @vitest-environment node
 */

import { describe, expect, it } from 'vitest'
import { createSSRApp } from 'vue'

import { renderToString } from 'vue/server-renderer'
import { Tag } from '..'

describe('SSR for Tag', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Tag></Tag>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
