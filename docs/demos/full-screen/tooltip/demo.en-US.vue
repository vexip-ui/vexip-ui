<template>
  <FullScreen ref="fullScreen" v-slot="{ toggle }">
    <div class="container">
      <Button type="primary" @click="toggle('window')">
        Window
      </Button>
      <Button type="primary" @click="toggle('browser')">
        Browser
      </Button>
      <Tooltip transfer="#full-screen-tooltips">
        <template #trigger>
          <Button> Visible after full screen </Button>
        </template>
        Visible after full screen
      </Tooltip>
      <Tooltip transfer>
        <template #trigger>
          <Button> Invisible after full screen </Button>
        </template>
        Invisible after full screen
      </Tooltip>
    </div>
    <div id="full-screen-tooltips"></div>
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
