<template>
  <div
    style="width: 400px; height: 100px; border: var(--vxp-border-base);"
    @contextmenu.prevent="contextmenu"
  >
    Right click here
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Contextmenu } from 'vexip-ui'

export default defineComponent({
  setup() {
    async function contextmenu(event: MouseEvent) {
      // 未选择是则返回 null
      const selectedKey = await Contextmenu.open({
        clientX: event.clientX,
        clientY: event.clientY,
        appear: true,
        configs: [
          { key: 'Option 1' },
          { key: 'Option 2' },
          {
            key: 'Option 3',
            children: [{ key: 'Option 3-1' }, { key: 'Option 3-2' }, { key: 'Option 3-3' }]
          },
          { key: 'Option 4' }
        ]
      })

      console.info(selectedKey)
    }

    return { contextmenu }
  }
})
</script>
