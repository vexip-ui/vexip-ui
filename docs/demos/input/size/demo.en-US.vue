<template>
  <Input
    size="small"
    placeholder="Small size"
    style="width: 220px;"
    :prefix="User"
  ></Input>
  <Input
    placeholder="Default size"
    style="width: 220px; margin-left: 10px;"
    :prefix="User"
  ></Input>
  <Input
    size="large"
    placeholder="Large size"
    style="width: 220px; margin-left: 10px;"
    :prefix="User"
  ></Input>
</template>

<script setup lang="ts">
import { User } from '@vexip-ui/icons'
</script>
