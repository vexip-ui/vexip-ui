<template>
  <Row :gap="[8, 16]">
    <Column :span="24">
      <div class="content">
        span-24
      </div>
    </Column>
    <Column :span="12">
      <div class="content">
        span-12
      </div>
    </Column>
    <Column :span="12">
      <div class="content">
        span-12
      </div>
    </Column>
  </Row>
</template>

<style scoped>
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 48px;
  color: #fff;
  background-color: var(--vxp-color-primary-base);
  border-radius: var(--vxp-radius-base);
}
</style>
