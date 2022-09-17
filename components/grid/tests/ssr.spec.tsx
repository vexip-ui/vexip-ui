/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { Grid } from '..'
import { Cell } from '@/components/cell'

describe('SSR for Grid', () => {
  it('render', async () => {
    try {
      await renderToString(
        createSSRApp(() => (
          <Grid>
            <Cell width={16}></Cell>
            <Cell width={8}></Cell>
          </Grid>
        ))
      )
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
