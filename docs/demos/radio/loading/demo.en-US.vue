<template>
  <p>Loading and editable:</p>
  <RadioGroup :loading="loading" :options="options"></RadioGroup>
  <br />
  <br />
  <RadioGroup :loading="loading" button :options="options"></RadioGroup>
  <p>Loading and readonly:</p>
  <RadioGroup :loading="loading" loading-lock :options="options"></RadioGroup>
  <br />
  <br />
  <RadioGroup
    :loading="loading"
    loading-lock
    border
    :options="options"
  ></RadioGroup>
  <p>
    Loading:
    <Switch v-model:value="loading"></Switch>
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)
const options = ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen']
</script>
