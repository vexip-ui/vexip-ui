<template>
  <Input placeholder="前置图标" style="max-width: 300px;" :prefix="User"></Input>
  <br />
  <br />
  <Input
    placeholder="后置图标"
    clearable
    style="max-width: 300px;"
    :suffix="MagnifyingGlass"
  ></Input>
</template>

<script setup lang="ts">
import { User, MagnifyingGlass } from '@vexip-ui/icons'
</script>
