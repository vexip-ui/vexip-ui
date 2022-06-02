<template>
  <Linker :icon="Upload">
    Address
  </Linker>
  <Linker :icon="Upload" type="primary">
    Address
  </Linker>
  <Linker :icon="Upload" type="success">
    Address
  </Linker>
  <Linker type="error">
    <template #icon>
      <Icon><Upload></Upload></Icon>
    </template>
    Address
  </Linker>
  <Linker :icon="Upload" type="warning">
    Address
  </Linker>
  <Linker :icon="Upload" type="info">
    Address
  </Linker>
</template>

<script setup lang="ts">
import { Upload } from '@vexip-ui/icons'
</script>
