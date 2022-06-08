<template>
  <Dropdown>
    <Button type="primary">
      自定义内容
    </Button>
    <template #drop>
      <div style="padding: 15px; background-color: var(--bg-color); box-shadow: var(--vxp-shadow-base);">
        <p>Some content to fill</p>
        <p>Some content to fill</p>
        <p>Some content to fill</p>
        <Button>按钮</Button>
      </div>
    </template>
  </Dropdown>
</template>
