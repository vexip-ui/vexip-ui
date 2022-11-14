<template>
  <NumberInput placeholder="前置图标" style="max-width: 300px;" :prefix="User"></NumberInput>
  <br />
  <br />
  <NumberInput
    clearable
    placeholder="后置图标"
    style="max-width: 300px;"
    :suffix="User"
  ></NumberInput>
</template>

<script setup lang="ts">
import { User } from '@vexip-ui/icons'
</script>
