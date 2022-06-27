<template>
  <div style="max-width: 360px; border: var(--vxp-border-base);">
    <Scroll
      use-y-bar
      use-bar-track
      :bar-fade="0"
      :height="120"
    >
      <p v-for="n in 9" :key="n">
        {{ n }}. Click the track on the right
      </p>
    </Scroll>
  </div>
</template>

<style scoped>
.vxp-scroll p {
  padding: 5px 10px;
}
</style>
