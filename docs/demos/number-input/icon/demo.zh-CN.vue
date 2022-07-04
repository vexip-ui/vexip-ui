<template>
  <NumberInput
    placeholder="前置图标"
    style="width: 220px;"
    :prefix="User"
  ></NumberInput>
  <br />
  <br />
  <NumberInput
    placeholder="后置图标"
    style="width: 220px;"
    :suffix="User"
  ></NumberInput>
</template>

<script setup lang="ts">
import { User } from '@vexip-ui/icons'
</script>
