<template>
  <Divider>Horizontal gap</Divider>
  <Row :gap="16">
    <Column :span="6">
      <div class="content">
        span-6
      </div>
    </Column>
    <Column :span="6">
      <div class="content">
        span-6
      </div>
    </Column>
    <Column :span="6">
      <div class="content">
        span-6
      </div>
    </Column>
    <Column :span="6">
      <div class="content">
        span-6
      </div>
    </Column>
  </Row>
  <Divider>Both horizontal and vertical gap</Divider>
  <Row :gap="[16, 24]">
    <Column :span="6">
      <div class="content">
        span-6
      </div>
    </Column>
    <Column :span="6">
      <div class="content">
        span-6
      </div>
    </Column>
    <Column :span="6">
      <div class="content">
        span-6
      </div>
    </Column>
    <Column :span="6">
      <div class="content">
        span-6
      </div>
    </Column>
    <Column :span="6">
      <div class="content">
        span-6
      </div>
    </Column>
    <Column :span="6">
      <div class="content">
        span-6
      </div>
    </Column>
    <Column :span="6">
      <div class="content">
        span-6
      </div>
    </Column>
    <Column :span="6">
      <div class="content">
        span-6
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
