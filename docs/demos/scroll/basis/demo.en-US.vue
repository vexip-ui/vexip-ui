<template>
  <Scroll :height="120">
    <p v-for="n in 9" :key="n">
      {{ n }}. Scroll mouse wheel here
    </p>
  </Scroll>
</template>

<style scoped>
.vxp-scroll p {
  padding: 5px 10px;
}
</style>
