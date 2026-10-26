<template>
  <div style="max-width: 360px; border: var(--vxp-border-base)">
    <Scroll use-y-bar :height="120">
      <p v-for="n in 9" :key="n">
        {{ n }}. {{ renderText('Scroll mouse wheel here') }}
      </p>
    </Scroll>
  </div>
</template>

<script setup lang="ts">
function renderText(text: string) {
  console.info(text)
  return text
}
</script>

<style scoped>
.vxp-scroll p {
  padding: 5px 10px;
}
</style>
