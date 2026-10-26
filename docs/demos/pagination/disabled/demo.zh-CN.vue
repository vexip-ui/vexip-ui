<template>
  <p>
    Disabled:
    <Switch v-model:value="disabled"></Switch>
  </p>
  <Space vertical>
    <Pagination
      :active="2"
      :total="100"
      :page-size="10"
      :disabled="disabled"
    ></Pagination>
    <Pagination
      :active="2"
      :total="100"
      :page-size="10"
      background
      :disabled="disabled"
    ></Pagination>
    <Pagination
      :active="2"
      :total="100"
      :page-size="10"
      no-border
      :disabled="disabled"
    ></Pagination>
  </Space>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const disabled = ref(true)
</script>
