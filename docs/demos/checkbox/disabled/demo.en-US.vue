<template>
  <Checkbox v-model:checked="checked">
    Checkbox
  </Checkbox>
  <divider vertical></divider>
  <Checkbox v-model:checked="checked" disabled>
    Disabled
  </Checkbox>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(false)
</script>
