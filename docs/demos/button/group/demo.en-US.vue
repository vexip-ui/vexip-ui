<template>
  <Space vertical>
    <ButtonGroup>
      <Button> Button 1 </Button>
      <Button> Button 2 </Button>
      <Button> Button 3 </Button>
    </ButtonGroup>
    <ButtonGroup size="small">
      <Button :icon="Plus"></Button>
      <Button :icon="Minus"></Button>
    </ButtonGroup>
    <ButtonGroup circle type="primary">
      <Tooltip transfer reverse>
        <template #trigger>
          <Button> Button 1 </Button>
        </template>
        Button 1
      </Tooltip>
      <Tooltip transfer reverse>
        <template #trigger>
          <Button> Button 2 </Button>
        </template>
        Button 2
      </Tooltip>
      <Tooltip transfer reverse>
        <template #trigger>
          <Button type="warning">
            Button 3
          </Button>
        </template>
        Button 3
      </Tooltip>
    </ButtonGroup>
  </Space>
</template>

<script setup lang="ts">
import { Minus, Plus } from '@vexip-ui/icons'
</script>
