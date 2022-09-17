/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { Button } from '..'
import { ButtonGroup } from '@/components/button-group'

describe('SSR for Button', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Button></Button>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })

  it('render group', async () => {
    try {
      await renderToString(
        createSSRApp(() => (
          <ButtonGroup>
            <Button></Button>
            <Button></Button>
          </ButtonGroup>
        ))
      )
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
