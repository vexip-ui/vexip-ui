<template>
  <ButtonGroup type="primary">
    <Button @click="handleOpen('top')">
      上下调整（上）
    </Button>
    <Button @click="handleOpen('bottom')">
      上下调整（下）
    </Button>
    <Button @click="handleOpen('left')">
      左右调整（左）
    </Button>
    <Button @click="handleOpen('right')">
      左右调整（右）
    </Button>
  </ButtonGroup>
  <Drawer
    v-model:active="active"
    transfer
    resizable
    title="调整大小"
    :placement="placement"
  >
    <p>一些内容</p>
    <p>一些内容</p>
    <p>一些内容</p>
  </Drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type Placement = 'right' | 'top' | 'bottom' | 'left'

const active = ref(false)
const placement = ref<Placement>('right')

function handleOpen(targetPlacement: Placement) {
  placement.value = targetPlacement
  active.value = true
}
</script>
