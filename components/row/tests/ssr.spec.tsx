/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { Row } from '..'
import { Column } from '@/components/column'

describe('SSR for Row', () => {
  it('render', async () => {
    try {
      await renderToString(
        createSSRApp(() => (
          <Row>
            <Column></Column>
            <Column span={8}></Column>
            <Column span={16}></Column>
          </Row>
        ))
      )
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
