<template>
  <ConfigProvider theme="base" style="padding: 20px; background-color: var(--vxp-bg-color-base)">
    <Tag type="primary">
      Tag
    </Tag>
    <br />
    <br />
    <Input style="max-width: 400px"></Input>
    <br />
    <br />
    <Skeleton :width="120" :height="80" image></Skeleton>
  </ConfigProvider>
  <br />
  <ConfigProvider theme="dark" style="padding: 20px; background-color: var(--vxp-bg-color-base)">
    <Tag type="primary">
      Tag
    </Tag>
    <br />
    <br />
    <Input style="max-width: 400px"></Input>
    <br />
    <br />
    <Skeleton :width="120" :height="80" image></Skeleton>
  </ConfigProvider>
</template>
