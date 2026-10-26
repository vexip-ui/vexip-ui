/**
 * @vitest-environment node
 */

import { describe, expect, it } from 'vitest'
import { createSSRApp } from 'vue'

import { renderToString } from 'vue/server-renderer'
import { Skeleton } from '..'

describe('SSR for Skeleton', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Skeleton></Skeleton>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
