<template>
  <div style="max-width: 360px; border: var(--vxp-border-base)">
    <Scroll use-y-bar :height="120">
      <p v-for="n in 9" :key="n">
        {{ n }}、在此处滚动鼠标滚轮
      </p>
    </Scroll>
  </div>
</template>

<style scoped>
.vxp-scroll p {
  padding: 5px 10px;
}
</style>
