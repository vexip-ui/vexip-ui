<template>
  <Button type="primary" @click="toast">
    打开
  </Button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    toast() {
      this.$toast.open('一些提示', 0)
    }
  }
})
</script>
