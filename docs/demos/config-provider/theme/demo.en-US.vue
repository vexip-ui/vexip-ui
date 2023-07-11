<template>
  <div style="padding: 20px; background-color: #fff">
    <ConfigProvider theme="base">
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
  </div>
  <br />
  <div style="padding: 20px; background-color: #333">
    <ConfigProvider theme="dark">
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
  </div>
</template>
