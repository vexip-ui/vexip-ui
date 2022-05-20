<template>
  <div>
    <Button type="primary" :icon="Search">
      搜索
    </Button>
    <Button type="primary" :icon="Search"></Button>
    <Button
      circle
      type="primary"
      :icon="Search"
    >
      搜索
    </Button>
    <Button
      circle
      type="primary"
      :icon="Search"
    ></Button>
  </div>
</template>

<script setup lang="ts">
import { Search } from '@vexip-ui/icons'
</script>
