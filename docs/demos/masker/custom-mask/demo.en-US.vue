<template>
  <Button type="primary" @click="active = !active">
    Open
  </Button>
  <Masker
    v-model:active="active"
    transfer
    closable
    @close="active = false"
  >
    <template #mask>
      <svg style="width: 100%; height: 100%">
        <defs>
          <mask id="custom-mask-en">
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="white"
            />
            <rect
              x="0"
              y="0"
              width="300"
              height="65"
              fill="black"
            />
          </mask>
        </defs>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="rgba(0, 0, 0, 45%)"
          mask="url(#custom-mask-en)"
        />
      </svg>
    </template>
  </Masker>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(false)
</script>
