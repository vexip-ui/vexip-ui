<template>
  <Space>
    <Tooltip>
      <Button>
        亮色主题
      </Button>
      <template #tip>
        一些提示的内容
      </template>
    </Tooltip>
    <Tooltip theme="dark">
      <Button>
        暗色主题
      </Button>
      <template #tip>
        一些提示的内容
      </template>
    </Tooltip>
  </Space>
</template>
