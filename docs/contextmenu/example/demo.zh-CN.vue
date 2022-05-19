<template>
  <div
    style="width: 400px; height: 100px; border: 1px solid #ccc;"
    @contextmenu.prevent="contextmenu"
  >
    在此处右键
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    async contextmenu(event: MouseEvent) {
      // 未选择是则返回 null
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
            icon: {
              name: 'burn',
              style: {
                color: 'orange'
              }
            },
            color: 'blue',
            iconColor: 'green'
          }
        ]
      })

      console.info(selectedKey)
    }
  }
})
</script>
