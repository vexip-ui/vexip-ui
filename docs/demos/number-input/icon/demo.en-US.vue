<template>
  <NumberInput
    placeholder="Prefix Icon"
    style="max-width: 300px;"
    :prefix="User"
  ></NumberInput>
  <br />
  <br />
  <NumberInput
    placeholder="Suffix Icon"
    style="max-width: 300px;"
    :suffix="User"
  ></NumberInput>
</template>

<script setup lang="ts">
import { User } from '@vexip-ui/icons'
</script>
