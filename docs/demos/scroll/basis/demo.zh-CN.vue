<template>
  <Scroll :height="120">
    <p v-for="n in 9" :key="n">
      {{ n }}、在此处滚动鼠标滚轮
    </p>
  </Scroll>
</template>

<style scoped>
.vxp-scroll p {
  padding: 5px 10px;
}
</style>
