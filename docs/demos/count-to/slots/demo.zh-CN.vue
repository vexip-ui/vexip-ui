<template>
  <div class="container">
    <CountTo
      class="count-to"
      :start="0"
      :end="20.23"
      suffix="%"
      :decimals="2"
      :appear="true"
    >
      <template #prefix>
        <ArrowUp></ArrowUp>
      </template>
    </CountTo>
    <CountTo
      class="count-to down"
      :start="20.23"
      :end="18.84"
      suffix="%"
      :decimals="2"
      :appear="true"
    >
      <template #suffix>
        <ArrowDown style="fill: red;"></ArrowDown>
      </template>
    </CountTo>
  </div>
</template>

<script setup lang="ts">
import { CountTo } from 'vexip-ui'
import { ArrowUp, ArrowDown } from '@vexip-ui/icons'
</script>

<style scoped>
.container {
  display: flex;
  gap: 20px;
}

.count-to {
  font-size: 2.5rem;
  color: rgb(63, 134, 0);
}

.count-to svg {
  width: 30px;
  height: 30px;
  fill: rgb(63, 134, 0);
}

.down {
  color: red !important;
}
</style>
