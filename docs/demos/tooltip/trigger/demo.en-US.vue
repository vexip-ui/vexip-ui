<template>
  <Space>
    <Tooltip trigger="click" placement="right">
      <template #trigger>
        <Button> Hover Trigger </Button>
      </template>
      Some tip content
    </Tooltip>
    <Tooltip trigger="click" placement="right">
      <template #trigger>
        <Button> Click Trigger </Button>
      </template>
      Some tip content
    </Tooltip>
    <Tooltip trigger="focus" placement="bottom">
      <template #trigger>
        <Button> Focus Trigger </Button>
      </template>
      Some tip content
    </Tooltip>
  </Space>
</template>
