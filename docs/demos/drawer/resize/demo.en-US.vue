<template>
  <ButtonGroup type="primary">
    <Button @click="handleOpen('top')">
      Adjust Height (Top)
    </Button>
    <Button @click="handleOpen('bottom')">
      Adjust Height (Bottom)
    </Button>
    <Button @click="handleOpen('left')">
      Adjust Width (Left)
    </Button>
    <Button @click="handleOpen('right')">
      Adjust Width (Right)
    </Button>
  </ButtonGroup>
  <Drawer
    v-model:active="active"
    transfer
    resizable
    title="Adjust Size"
    :placement="placement"
  >
    <p>Some content</p>
    <p>Some content</p>
    <p>Some content</p>
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
