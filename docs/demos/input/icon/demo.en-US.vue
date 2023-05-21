<template>
  <Input placeholder="Prefix Icon" style="max-width: 300px" :prefix="User"></Input>
  <br />
  <br />
  <Input
    placeholder="Suffix Icon"
    clearable
    style="max-width: 300px"
    :suffix="MagnifyingGlass"
  ></Input>
</template>

<script setup lang="ts">
import { MagnifyingGlass, User } from '@vexip-ui/icons'
</script>
