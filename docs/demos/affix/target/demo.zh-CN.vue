<template>
  <div class="affix-container">
    <div class="background">
      <Affix target=".affix-container" :offset="80" style="margin-top: 300px">
        <Button type="primary">
          指定容器
        </Button>
      </Affix>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.affix-container {
  height: 400px;
  overflow: auto;
  text-align: center;
  background: var(--vxp-color-primary-light-9);
  border-radius: 4px;

  .background {
    height: 500px;
  }
}

.dark {
  .affix-container {
    --vxp-color-primary-light-9: var(--vxp-color-primary-opacity-9);
  }
}
</style>
