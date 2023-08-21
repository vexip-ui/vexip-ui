<template>
  <div class="affix-container">
    <div style="height: 500px">
      <Affix target=".affix-container" :offset="80">
        <Button type="primary">
          指定元素
        </Button>
      </Affix>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.affix-container {
  height: 400px;
  overflow-y: auto;
  text-align: center;
  background-color: var(--vxp-color-primary-opacity-9);
}
</style>
