<template>
  <Dropdown>
    <Button type="primary">
      自定义内容
    </Button>
    <template #drop>
      <div style="padding: 15px; background-color: var(--bg-color); box-shadow: var(--vxp-shadow-base);">
        <p>一些内容一些内容一些内容</p>
        <p>一些内容一些内容一些内容</p>
        <p>一些内容一些内容一些内容</p>
        <Button>按钮</Button>
      </div>
    </template>
  </Dropdown>
</template>
