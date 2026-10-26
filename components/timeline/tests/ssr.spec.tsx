/**
 * @vitest-environment node
 */

import { TimelineItem } from '@/components/timeline-item'

import { describe, expect, it } from 'vitest'
import { createSSRApp } from 'vue'

import { renderToString } from 'vue/server-renderer'
import { Timeline } from '..'

describe('SSR for Timeline', () => {
  it('render', async () => {
    try {
      await renderToString(
        createSSRApp(() => (
          <Timeline>
            <TimelineItem>{'item1'}</TimelineItem>
            <TimelineItem>{'item2'}</TimelineItem>
          </Timeline>
        )),
      )
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
