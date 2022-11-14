/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { AnchorLink } from '@/components/anchor-link'
import { renderToString } from 'vue/server-renderer'
import { Anchor } from '..'

describe('SSR for Anchor', () => {
  it('render', async () => {
    try {
      await renderToString(
        createSSRApp(() => (
          <Anchor>
            <AnchorLink>{'1'}</AnchorLink>
            <AnchorLink>{'2'}</AnchorLink>
          </Anchor>
        ))
      )
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
