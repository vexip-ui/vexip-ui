<template>
  <Space>
    <Tooltip :delay="0">
      <template #trigger>
        <Button> No delay </Button>
      </template>
      Some tip content
    </Tooltip>
    <Tooltip :delay="[0, 1000]">
      <template #trigger>
        <Button> Display immediately, delay disappears </Button>
      </template>
      Some tip content
    </Tooltip>
  </Space>
</template>
