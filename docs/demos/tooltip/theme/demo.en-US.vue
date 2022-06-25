<template>
  <Space>
    <Tooltip>
      <Button>
        Light Theme
      </Button>
      <template #tip>
        Some tip content
      </template>
    </Tooltip>
    <Tooltip theme="dark">
      <Button>
        Dark Theme
      </Button>
      <template #tip>
        Some tip content
      </template>
    </Tooltip>
  </Space>
</template>
