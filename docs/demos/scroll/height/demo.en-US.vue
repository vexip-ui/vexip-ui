<template>
  <div style="max-width: 360px; height: 120px; border: var(--vxp-border-base)">
    <Scroll use-y-bar height="100%">
      <p v-for="n in 9" :key="n">
        {{ n }}. Scroll mouse wheel here
      </p>
    </Scroll>
  </div>
</template>

<style scoped>
.vxp-scroll p {
  padding: 5px 10px;
}
</style>
