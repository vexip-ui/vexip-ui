<template>
  <FullScreen ref="fullScreen" v-slot="{ toggle }">
    <div
      style="
        width: 100%;
        height: 100%;
        padding: 5px;
        background-color: var(--vxp-bg-color-base);
        border: var(--vxp-border-base);
"
    >
      <p>I am FullScreen Content</p>
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
