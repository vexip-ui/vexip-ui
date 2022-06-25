<template>
  <Space>
    <Tooltip trigger="click" placement="right">
      <Button>
        Hover Trigger
      </Button>
      <template #tip>
        Some tip content
      </template>
    </Tooltip>
    <Tooltip trigger="click" placement="right">
      <Button>
        Click Trigger
      </Button>
      <template #tip>
        Some tip content
      </template>
    </Tooltip>
  </Space>
</template>
