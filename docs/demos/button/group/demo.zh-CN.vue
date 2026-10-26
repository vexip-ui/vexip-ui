<template>
  <Space vertical>
    <ButtonGroup>
      <Button> 按钮 1 </Button>
      <Button> 按钮 2 </Button>
      <Button> 按钮 3 </Button>
    </ButtonGroup>
    <ButtonGroup size="small">
      <Button :icon="Plus"></Button>
      <Button :icon="Minus"></Button>
    </ButtonGroup>
    <ButtonGroup circle type="primary">
      <Tooltip transfer reverse>
        <template #trigger>
          <Button> 按钮 1 </Button>
        </template>
        按钮 1
      </Tooltip>
      <Tooltip transfer reverse>
        <template #trigger>
          <Button> 按钮 2 </Button>
        </template>
        按钮 2
      </Tooltip>
      <Tooltip transfer reverse>
        <template #trigger>
          <Button type="warning">
            按钮 3
          </Button>
        </template>
        按钮 3
      </Tooltip>
    </ButtonGroup>
  </Space>
</template>

<script setup lang="ts">
import { Minus, Plus } from '@vexip-ui/icons'
</script>
