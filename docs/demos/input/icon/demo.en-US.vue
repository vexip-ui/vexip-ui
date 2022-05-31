<template>
  <div>
    <Input
      placeholder="前置图标"
      style="width: 220px;"
      :prefix="User"
    ></Input>
    <br />
    <br />
    <Input
      placeholder="后置图标"
      style="width: 220px;"
      :suffix="Search"
    ></Input>
  </div>
</template>

<script setup lang="ts">
import { User, Search } from '@vexip-ui/icons'
</script>
