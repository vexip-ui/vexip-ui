<template>
  <span style="margin-right: 10px">Small:</span>
  <Space size="small" inline style="max-width: 160px">
    <Button>Button</Button>
    <Button>Button</Button>
    <Button>Button</Button>
    <Button>Button</Button>
  </Space>
  <br />
  <br />
  <span style="margin-right: 10px">Default:</span>
  <Space inline style="max-width: 170px">
    <Button>Button</Button>
    <Button>Button</Button>
    <Button>Button</Button>
    <Button>Button</Button>
  </Space>
  <br />
  <br />
  <span style="margin-right: 10px">Large:</span>
  <Space size="large" inline style="max-width: 180px">
    <Button>Button</Button>
    <Button>Button</Button>
    <Button>Button</Button>
    <Button>Button</Button>
  </Space>
  <br />
  <br />
  <span style="margin-right: 10px">Custom:</span>
  <Space :size="[20, 16]" inline style="max-width: 180px">
    <Button>Button</Button>
    <Button>Button</Button>
    <Button>Button</Button>
    <Button>Button</Button>
  </Space>
</template>
