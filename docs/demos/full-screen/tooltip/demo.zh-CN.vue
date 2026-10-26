<template>
  <FullScreen ref="fullScreen" v-slot="{ placeId, toggle }">
    <div class="container">
      <Button type="primary" @click="toggle('window')">
        网页全屏
      </Button>
      <Button type="primary" @click="toggle('browser')">
        浏览器全屏
      </Button>
      <Tooltip :transfer="`#${placeId}`">
        <template #trigger>
          <Button> 全屏后可见 </Button>
        </template>
        全屏后可见
      </Tooltip>
      <Tooltip transfer>
        <template #trigger>
          <Button> 全屏后不可见 </Button>
        </template>
        全屏后不可见
      </Tooltip>
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
