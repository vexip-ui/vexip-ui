<template>
  <Button type="primary" @click="active = !active">
    Open
  </Button>
  <Masker
    v-model:active="active"
    transfer
    closable
    @close="active = false"
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
