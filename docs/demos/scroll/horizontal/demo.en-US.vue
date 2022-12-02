<template>
  <div style="display: inline-flex; border: var(--vxp-border-base);">
    <Scroll :mode="`horizontal${exact ? '-exact' : ''}`" use-x-bar width="25em">
      <p>Scroll mouse wheel here</p>
      <p>
        This is a long long long long long long long long long long long long long long long long
        long long long long long text
      </p>
    </Scroll>
  </div>
  <p>
    Exact mode:
    <Switch v-model:value="exact"></Switch>
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const exact = ref(false)
</script>

<style scoped>
.vxp-scroll p {
  padding: 5px 10px;
  white-space: nowrap;
}
</style>
