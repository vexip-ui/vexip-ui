<template>
  <div
    style="max-width: 400px; height: 100px; border: var(--vxp-border-base)"
    @contextmenu.prevent="contextmenu"
  >
    Right click here
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
    configs: [{ key: 'Option 1' }, { key: 'Option 2' }, { key: 'Option 3' }, { key: 'Option 4' }],
  })

  console.info(selectedKeys)
}
</script>
