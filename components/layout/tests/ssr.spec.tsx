/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { Layout } from '..'

describe('SSR for Layout', () => {
  it('render', async () => {
    const menus = [
      {
        label: '1',
        name: '菜单 1',
        children: [
          { label: '1-1', name: '子菜单 1' },
          { label: '1-2', name: '子菜单 2' },
          { label: '1-3', name: '子菜单 3' }
        ]
      },
      {
        label: '2',
        name: '菜单 2',
        disabled: true
      }
    ]

    try {
      await renderToString(
        createSSRApp(() => (
          <Layout
            logo={'logo.png'}
            sign-name={'Vexip UI'}
            user={{
              name: 'VexipUI',
              email: 'email@vexip-ui.com'
            }}
            menus={menus}
          >
            {{
              main: () => <div class={'main'}></div>
            }}
          </Layout>
        ))
      )
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
