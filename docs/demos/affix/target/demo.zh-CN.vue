<template>
  <div class="affix-container">
    <Affix target=".affix-container" :offset="80">
      <Button type="primary">
        指定容器
      </Button>
    </Affix>
  </div>
</template>

<style lang="scss" scoped>
.affix-container {
  height: 400px;
  text-align: center;
  background: var(--vxp-color-primary-light-9);
  border-radius: 4px;
}

.dark {
  .affix-container {
    --vxp-color-primary-light-9: var(--vxp-color-primary-opacity-9);
  }
}
</style>
