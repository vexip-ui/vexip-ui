<template>
  <FullScreen ref="fullScreen" v-slot="{ toggle }">
    <div class="container">
      <span>我是全屏展示的元素</span>
      <br />
      <br />
      <div>
        <Button type="primary" @click="toggle('window')">
          网页全屏
        </Button>
        <Button type="primary" @click="toggle('browser')">
          浏览器全屏
        </Button>
      </div>
    </div>
  </FullScreen>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  padding: 16px;
  background-color: var(--vxp-bg-color-base);
  border: var(--vxp-border-light-1);
  border-radius: var(--vxp-radius-base);
}
</style>
