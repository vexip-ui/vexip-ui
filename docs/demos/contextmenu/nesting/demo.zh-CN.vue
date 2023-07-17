<template>
  <div
    style="max-width: 400px; height: 100px; border: var(--vxp-border-base)"
    @contextmenu.prevent="contextmenu"
  >
    在此处右键
  </div>
</template>

<script setup lang="ts">
import { Contextmenu } from 'vexip-ui'

async function contextmenu(event: MouseEvent) {
  // 未选择是则返回 null
  const selectedKeys = await Contextmenu.open({
    clientX: event.clientX,
    clientY: event.clientY,
    appear: true,
    configs: [
      { key: '选项1' },
      { key: '选项2' },
      {
        key: '选项3',
        children: [{ key: '选项3-1' }, { key: '选项3-2' }, { key: '选项3-3' }]
      },
      { key: '选项4' }
    ]
  })

  console.info(selectedKeys)
}
</script>
