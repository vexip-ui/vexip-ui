<template>
  <div style="display: inline-flex; border: var(--vxp-border-base);">
    <NativeScroll mode="horizontal" use-x-bar width="25em">
      <p>Scroll mouse wheel here</p>
      <p>
        This is a long long long long long long long long long long long long long long long long
        long long long long long text
      </p>
    </NativeScroll>
  </div>
</template>

<style scoped>
.vxp-scroll p {
  padding: 5px 10px;
  white-space: nowrap;
}
</style>
