<template>
  <FullScreen ref="fullScreen" v-slot="{ toggle }" style="background-color: white;">
    <div style="padding: 5px; border: var(--vxp-border-base);">
      <p>我是全屏展示的元素</p>
      <div>
        <Button type="primary" @click="toggle('window')">
          Window
        </Button>
        <Button type="primary" @click="toggle('browser')">
          Browser
        </Button>
      </div>
    </div>
  </FullScreen>
</template>
