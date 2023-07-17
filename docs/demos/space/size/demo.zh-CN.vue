<template>
  <span style="margin-right: 10px">Small:</span>
  <Space size="small" inline style="max-width: 150px">
    <Button>按钮</Button>
    <Button>按钮</Button>
    <Button>按钮</Button>
    <Button>按钮</Button>
  </Space>
  <br />
  <br />
  <span style="margin-right: 10px">Default:</span>
  <Space inline style="max-width: 160px">
    <Button>按钮</Button>
    <Button>按钮</Button>
    <Button>按钮</Button>
    <Button>按钮</Button>
  </Space>
  <br />
  <br />
  <span style="margin-right: 10px">Large:</span>
  <Space size="large" inline style="max-width: 180px">
    <Button>按钮</Button>
    <Button>按钮</Button>
    <Button>按钮</Button>
    <Button>按钮</Button>
  </Space>
  <br />
  <br />
  <span style="margin-right: 10px">Custom:</span>
  <Space :size="[20, 16]" inline style="max-width: 180px">
    <Button>按钮</Button>
    <Button>按钮</Button>
    <Button>按钮</Button>
    <Button>按钮</Button>
  </Space>
</template>
