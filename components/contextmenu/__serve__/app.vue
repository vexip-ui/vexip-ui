<template>
  <div
    style="width: 500px; height: 300px; border: 1px solid #ccc;"
    @contextmenu.prevent="contextmenu"
  ></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  methods: {
    async contextmenu(this: any, event: MouseEvent) {
      const selectedKey = await this.$contextmenu.open({
        clientX: event.clientX,
        clientY: event.clientY,
        appear: true,
        configs: [
          {
            key: '选项一'
          },
          {
            key: '选项二'
          },
          {
            key: '选项三'
          }
        ]
      })

      console.log(selectedKey)
    }
  }
})
</script>
