<template>
  <Button type="primary" :icon="MagnifyingGlass">
    搜索
  </Button>
  <Button type="primary" :icon="MagnifyingGlass"></Button>
  <Button circle type="primary" :icon="MagnifyingGlass">
    搜索
  </Button>
  <Button circle type="primary" :icon="MagnifyingGlass"></Button>
  <Button circle type="primary">
    <template #icon>
      <Icon><MagnifyingGlass></MagnifyingGlass></Icon>
    </template>
  </Button>
</template>

<script setup lang="ts">
import { MagnifyingGlass } from '@vexip-ui/icons'
</script>
