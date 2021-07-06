<template>
  <div
    style="width: 500px; height: 300px; border: 1px solid #ccc;"
    @contextmenu.prevent="contextmenu"
  ></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import '@/common/icons/ad'
import '@/common/icons/user'

import type { ContextmenuManager } from '..'

interface Context {
  $contextmenu: ContextmenuManager
}

export default defineComponent({
  name: 'App',
  methods: {
    async contextmenu(this: Context, event: MouseEvent) {
      const selectedKey = await this.$contextmenu.open({
        clientX: event.clientX,
        clientY: event.clientY,
        appear: true,
        configs: [
          {
            key: '选项1'
          },
          {
            key: '选项2',
            icon: 'user',
            shortcut: 'Ctrl+A'
          },
          {
            key: '选项3',
            icon: 'ad',
            divided: true,
            children: [
              {
                key: '选项3-1',
                disabled: true
              },
              {
                key: '选项3-2',
                divided: true
              },
              {
                key: '选项3-3',
                children: [
                  {
                    key: '选项3-3-1',
                    shortcut: 'Ctrl+L'
                  },
                  {
                    key: '选项3-3-2'
                  }
                ]
              }
            ]
          },
          {
            key: '选项4',
            shortcut: 'Alt+I'
          },
          {
            key: '选项5',
            shortcut: 'Ctrl+Alt+I'
          }
        ]
      })

      console.log(selectedKey)
    }
  }
})
</script>
