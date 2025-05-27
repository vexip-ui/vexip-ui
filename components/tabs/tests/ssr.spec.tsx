/**
 * @vitest-environment node
 */

import { TabPanel } from '@/components/tab-panel'

import { describe, expect, it } from 'vitest'
import { createSSRApp } from 'vue'

import { renderToString } from 'vue/server-renderer'
import { Tabs } from '..'

describe('SSR for Tabs', () => {
  it('render', async () => {
    try {
      await renderToString(
        createSSRApp(() => (
          <Tabs>
            <TabPanel>{'content'}</TabPanel>
          </Tabs>
        )),
      )
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
