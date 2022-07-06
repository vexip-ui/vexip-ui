<template>
  <Input
    placeholder="Prefix Icon"
    style="max-width: 300px;"
    :prefix="User"
  ></Input>
  <br />
  <br />
  <Input
    placeholder="Suffix Icon"
    style="max-width: 300px;"
    :suffix="MagnifyingGlass"
  ></Input>
</template>

<script setup lang="ts">
import { User, MagnifyingGlass } from '@vexip-ui/icons'
</script>
