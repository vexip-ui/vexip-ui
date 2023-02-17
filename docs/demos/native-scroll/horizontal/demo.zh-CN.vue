<template>
  <div style="display: inline-flex; border: var(--vxp-border-base);">
    <NativeScroll mode="horizontal" use-x-bar width="25em">
      <p>在此处滚动鼠标滚轮 (Shift)</p>
      <p style="white-space: nowrap;">
        这是一段很长很长很长很长长很长很长很长长很长很长
        很长长很长很长很长长很长很长很长长很长很长很长长
        很长很长很长长很长很长很长长很长很长很长的文字
      </p>
    </NativeScroll>
  </div>
</template>

<style scoped>
.vxp-native-scroll p {
  padding: 5px 10px;
  white-space: nowrap;
}
</style>
