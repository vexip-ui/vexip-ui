/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { TabNav } from '..'
import { TabNavItem } from '@/components/tab-nav-item'

describe('SSR for TabNav', () => {
  it('render', async () => {
    try {
      await renderToString(
        createSSRApp(() => (
          <TabNav>
            <TabNavItem>{'tab'}</TabNavItem>
          </TabNav>
        ))
      )
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
