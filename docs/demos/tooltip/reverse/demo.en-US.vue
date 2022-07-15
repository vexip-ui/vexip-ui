<template>
  <Space>
    <Tooltip>
      <template #trigger>
        <Button> Normal Theme </Button>
      </template>
      Some tip content
    </Tooltip>
    <Tooltip reverse>
      <template #trigger>
        <Button> Reverse Theme </Button>
      </template>
      Some tip content
    </Tooltip>
  </Space>
</template>
