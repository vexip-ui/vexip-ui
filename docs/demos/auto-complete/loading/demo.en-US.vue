<template>
  <AutoComplete
    :loading="loading"
    placeholder="loading and editable"
    :options="options"
  ></AutoComplete>
  <br />
  <br />
  <AutoComplete
    :loading="loading"
    loading-lock
    placeholder="loading and readonly"
    :options="options"
  ></AutoComplete>
  <p>
    Loaidng:
    <Switch v-model:value="loading"></Switch>
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)
const options = ['Option 1', 'Option 2', 'Option 3']
</script>

<style scoped>
.vxp-auto-complete {
  max-width: 400px;
}
</style>
