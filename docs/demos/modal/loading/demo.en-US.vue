<template>
  <div>
    <Button type="primary" @click="active = !active">
      Open
    </Button>
    <Modal
      v-model:active="active"
      transfer
      :width="500"
      :title="title"
      :loading="loading"
      :on-before-close="beforeClose"
    >
      <p style="margin-bottom: 3px;">
        Click the
        <Tag style="vertical-align: baseline;">
          Confrim
        </Tag>
        then
      </p>
      <p>It will be closed after 5 seconds</p>
      <p>Other ways to close are blocked</p>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(false)
const title = ref('Loading Status')
const loading = ref(false)

async function beforeClose(isConfirm: boolean) {
  if (isConfirm && !loading.value) {
    title.value = 'Auto close after 5 seconds'
    loading.value = true

    return new Promise(resolve => {
      setTimeout(() => {
        loading.value = false
        title.value = 'Loading Status'
        resolve(true)
      }, 5000)
    })
  }

  return false
}
</script>
