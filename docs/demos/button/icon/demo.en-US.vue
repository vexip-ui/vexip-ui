<template>
  <Button type="primary" :icon="MagnifyingGlass">
    Search
  </Button>
  <Button type="primary" :icon="MagnifyingGlass"></Button>
  <Button circle type="primary" :icon="MagnifyingGlass">
    Search
  </Button>
  <Button circle type="primary" :icon="MagnifyingGlass"></Button>
  <Button circle type="primary" icon-only>
    <MagnifyingGlass></MagnifyingGlass>
  </Button>
</template>

<script setup lang="ts">
import { MagnifyingGlass } from '@vexip-ui/icons'
</script>
