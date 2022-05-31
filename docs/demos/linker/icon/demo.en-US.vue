<template>
  <Linker :icon="Upload">
    链接
  </Linker>
  <Linker :icon="Upload" type="primary">
    链接
  </Linker>
  <Linker :icon="Upload" type="success">
    链接
  </Linker>
  <Linker type="error">
    <template #icon>
      <Icon><Upload></Upload></Icon>
    </template>
    链接
  </Linker>
  <Linker :icon="Upload" type="warning">
    链接
  </Linker>
  <Linker :icon="Upload" type="info">
    链接
  </Linker>
</template>

<script setup lang="ts">
import { Upload } from '@vexip-ui/icons'
</script>
