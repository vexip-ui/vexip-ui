<template>
  <Button type="primary" @on-click="active = !active">
    打开
  </Button>
  <Masker
    v-model:active="active"
    transfer
    closable
    class="test"
    title="masker"
    @on-close="active = false"
  ></Masker>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Button } from '@/components/button'
import { Masker } from '..'

export default defineComponent({
  name: 'App',
  components: {
    Button,
    Masker
  },
  setup() {
    const active = ref(false)

    return { active }
  }
})
</script>
