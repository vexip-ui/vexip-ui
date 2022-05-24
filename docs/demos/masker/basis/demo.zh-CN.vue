<template>
  <Button type="primary" @on-click="active = !active">
    打开
  </Button>
  <Masker
    v-model:active="active"
    transfer
    closable
    @on-close="active = false"
  ></Masker>
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
