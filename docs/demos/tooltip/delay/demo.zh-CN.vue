<template>
  <Space>
    <Tooltip :delay="0">
      <template #trigger>
        <Button> 无延迟 </Button>
      </template>
      一些提示的内容
    </Tooltip>
    <Tooltip :delay="[0, 1000]">
      <template #trigger>
        <Button> 立刻显示，延迟消失 </Button>
      </template>
      一些提示的内容
    </Tooltip>
  </Space>
</template>
