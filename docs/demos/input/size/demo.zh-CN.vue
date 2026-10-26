<template>
  <Input
    size="small"
    placeholder="Small size"
    style="max-width: 300px"
    :prefix="User"
  ></Input>
  <br />
  <br />
  <Input placeholder="Default size" style="max-width: 300px" :prefix="User"></Input>
  <br />
  <br />
  <Input
    size="large"
    placeholder="Large size"
    style="max-width: 300px"
    :prefix="User"
  ></Input>
</template>

<script setup lang="ts">
import { User } from '@vexip-ui/icons'
</script>
