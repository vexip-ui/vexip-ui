<template>
  <div>
    <CollapsePane title="独立面板一" arrow-type="left">
      <p>一些内容一些内容一些内容</p>
      <p>一些内容一些内容一些内容</p>
    </CollapsePane>
    <br />
    <CollapsePane card>
      <template #title>
        <Icon name="chart-line"></Icon>
        独立面板二
      </template>
      <p>一些内容一些内容一些内容</p>
      <p>一些内容一些内容一些内容</p>
    </CollapsePane>
  </div>
</template>
