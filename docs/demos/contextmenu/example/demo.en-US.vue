<template>
  <div
    style="max-width: 400px; height: 100px; border: var(--vxp-border-base)"
    @contextmenu.prevent="contextmenu"
  >
    Right click here
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
            key: 'Option 1',
          },
          {
            key: 'Option 2',
            icon: User,
            shortcut: 'Ctrl+A',
          },
          {
            key: 'Option 3',
            icon: Hammer,
            divided: true,
            iconColor: 'cyan',
            children: [
              {
                key: 'Option 3-1',
                disabled: true,
              },
              {
                key: 'Option 3-2',
                divided: true,
              },
              {
                key: 'Option 3-3',
                children: [
                  {
                    key: 'Option 3-3-1',
                    shortcut: 'Ctrl+L',
                  },
                  {
                    key: 'Option 3-3-2',
                  },
                ],
              },
            ],
          },
          {
            key: 'Option 4',
            shortcut: 'Alt+I',
            color: 'red',
          },
          {
            key: 'Option 5',
            shortcut: 'Ctrl+Alt+I',
            icon: Fire,
            color: 'blue',
            iconColor: 'green',
          },
        ],
      })

      console.info(selectedKeys)
    },
  },
})
</script>
