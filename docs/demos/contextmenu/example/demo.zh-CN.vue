<template>
  <div
    style="max-width: 400px; height: 100px; border: var(--vxp-border-base)"
    @contextmenu.prevent="contextmenu"
  >
    在此处右键
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { Fire, Hammer, User } from '@vexip-ui/icons'

export default defineComponent({
  methods: {
    async contextmenu(event: MouseEvent) {
      // 未选择是则返回 null
      const selectedKeys = await this.$contextmenu.open({
        clientX: event.clientX,
        clientY: event.clientY,
        appear: true,
        configs: [
          {
            key: '选项1'
          },
          {
            key: '选项2',
            icon: User,
            shortcut: 'Ctrl+A'
          },
          {
            key: '选项3',
            icon: Hammer,
            divided: true,
            iconColor: 'cyan',
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
            shortcut: 'Alt+I',
            color: 'red'
          },
          {
            key: '选项5',
            shortcut: 'Ctrl+Alt+I',
            icon: Fire,
            color: 'blue',
            iconColor: 'green'
          }
        ]
      })

      console.info(selectedKeys)
    }
  }
})
</script>
