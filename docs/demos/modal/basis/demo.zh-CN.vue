<template>
  <div>
    <Button type="primary" @click="active = !active">
      打开
    </Button>
    <Modal
      v-model:active="active"
      transfer
      title="标题"
    >
      <p>一些内容</p>
      <p>一些内容</p>
      <p>一些内容</p>
    </Modal>
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
