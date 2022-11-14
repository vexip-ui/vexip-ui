/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { FormItem } from '@/components/form-item'
import { Input } from '@/components/input'
import { renderToString } from 'vue/server-renderer'
import { Form } from '..'

describe('SSR for Form', () => {
  it('render', async () => {
    try {
      await renderToString(
        createSSRApp(() => (
          <Form>
            <FormItem label={'input'}>
              <Input></Input>
            </FormItem>
          </Form>
        ))
      )
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
