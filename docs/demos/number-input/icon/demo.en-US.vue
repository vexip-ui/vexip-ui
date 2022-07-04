<template>
  <NumberInput
    placeholder="Prefix Icon"
    style="width: 220px;"
    :prefix="User"
  ></NumberInput>
  <br />
  <br />
  <NumberInput
    placeholder="Suffix Icon"
    style="width: 220px;"
    :suffix="User"
  ></NumberInput>
</template>

<script setup lang="ts">
import { User } from '@vexip-ui/icons'
</script>
