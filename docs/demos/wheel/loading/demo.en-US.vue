<template>
  <Space>
    <span>
      <p>Loading and editable:</p>
      <Wheel value="Option 2" :loading="loading" :options="options"></Wheel>
    </span>
    <span>
      <p>Loading and readonly:</p>
      <Wheel
        value="Option 4"
        :loading="loading"
        loading-lock
        :options="options"
      ></Wheel>
    </span>
  </Space>
  <p>
    Loading:
    <Switch v-model:value="loading"></Switch>
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)
const options = Array.from({ length: 20 }, (_, index) => `Option ${index + 1}`)
</script>
