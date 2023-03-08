<template>
  <div style="max-width: 360px; border: var(--vxp-border-base)">
    <NativeScroll use-y-bar :height="180">
      <p v-for="n in 9" :key="n">
        {{ n }}、在此处滚动鼠标滚轮
      </p>
      <template #extra="{ scrollTo }">
        <Button style="position: absolute; right: 12px; bottom: 12px" @click="scrollTo(0, 0)">
          返回顶部
        </Button>
      </template>
    </NativeScroll>
  </div>
</template>

<style scoped>
.vxp-native-scroll p {
  padding: 5px 10px;
}
</style>
