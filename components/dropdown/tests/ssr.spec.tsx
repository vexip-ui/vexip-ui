/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { Dropdown } from '..'
import { DropdownList } from '@/components/dropdown-list'
import { DropdownItem } from '@/components/dropdown-item'

describe('SSR for Dropdown', () => {
  it('render', async () => {
    try {
      await renderToString(
        createSSRApp(() => (
          <Dropdown>
            {{
              default: () => 'Dropdown',
              drop: () => (
                <DropdownList>
                  <DropdownItem>{'1'}</DropdownItem>
                  <DropdownItem>{'2'}</DropdownItem>
                  <DropdownItem>{'3'}</DropdownItem>
                </DropdownList>
              )
            }}
          </Dropdown>
        ))
      )
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
