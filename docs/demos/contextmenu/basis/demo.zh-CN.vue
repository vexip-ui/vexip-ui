<template>
  <div
    style="width: 400px; height: 100px; border: var(--vxp-border-base);"
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
        configs: [{ key: '选项1' }, { key: '选项2' }, { key: '选项3' }, { key: '选项4' }]
      })

      console.info(selectedKey)
    }
  }
})
</script>
