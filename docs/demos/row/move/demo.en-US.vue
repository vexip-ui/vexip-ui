<template>
  <Row :gap="16">
    <Column :span="16" :push="8">
      <div class="content">
        span-16 push-8
      </div>
    </Column>
    <Column :span="8" :pull="16">
      <div class="content">
        span-8 pull-16
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
