<template>
  <Form
    ref="form"
    :model="formModel"
    :label-width="100"
    label-position="top"
    style="width: 500px;"
  >
    <FormItem required label="Upload" prop="files">
      <Upload ref="upload" allow-drag></Upload>
    </FormItem>
    <FormItem action>
      <Button type="primary" @click="handleSubmit()">
        提交
      </Button>
      <Button @click="handleReset()">
        重置
      </Button>
    </FormItem>
  </Form>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted, nextTick } from 'vue'

import type { Form, Upload } from 'vexip-ui'

const formModel = reactive({
  files: [] as File[]
})

const form = ref<InstanceType<typeof Form> | null>(null)
const upload = ref<InstanceType<typeof Upload> | null>(null)

const selectedFiles = computed(() => upload.value?.renderFiles || [])

onMounted(() => {
  watch(selectedFiles, value => {
    formModel.files = value.map(state => state.source)

    nextTick(() => {
      form.value?.validateFields('files')
    })
  })
})

function handleSubmit() {
  form.value?.validate()
}

function handleReset() {
  form.value?.reset()
}
</script>
