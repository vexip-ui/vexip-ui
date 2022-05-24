<template>
  <div>
    <Button type="primary" @on-click="active = !active">
      打开
    </Button>
    <Drawer
      v-model:active="active"
      transfer
      title="标题"
    >
      <p>一些内容</p>
      <p>一些内容</p>
      <p>一些内容</p>
    </Drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const active = ref(false)

    return { active }
  }
})
</script>
