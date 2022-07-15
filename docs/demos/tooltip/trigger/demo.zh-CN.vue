<template>
  <Space>
    <Tooltip trigger="hover" placement="top">
      <template #trigger>
        <Button> 悬停触发 </Button>
      </template>
      一些提示的内容
    </Tooltip>
    <Tooltip trigger="click" placement="right">
      <template #trigger>
        <Button> 点击触发 </Button>
      </template>
      一些提示的内容
    </Tooltip>
    <Tooltip trigger="focus" placement="right">
      <template #trigger>
        <Button> 聚焦触发 </Button>
      </template>
      一些提示的内容
    </Tooltip>
  </Space>
</template>
