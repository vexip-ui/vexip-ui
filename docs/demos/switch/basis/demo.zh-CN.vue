<template>
  <Switch v-model:value="checked"></Switch>
  <Switch disabled></Switch>
  <br />
  <p style="margin-top: 10px">
    checked: {{ checked }}
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(false)
</script>
