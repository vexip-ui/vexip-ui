<template>
  <Divider>横向的间隔</Divider>
  <Row :gutter="16">
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
  <Divider>双向的间隔</Divider>
  <Row :gutter="[16, 24]">
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

<style>
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 48px;
  color: #fff;
  background-color: #339af0;
  border-radius: 4px;
}
</style>
