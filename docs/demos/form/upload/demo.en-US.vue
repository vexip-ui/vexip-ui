<template>
  <Form
    ref="form"
    style="width: 500px;"
    :model="formModel"
    :label-width="100"
  >
    <FormItem required label="Upload" prop="files">
      <Upload
        ref="upload"
      ></Upload>
    </FormItem>
    <FormItem action>
      <Button type="primary" @click="handleSubmit()">
        Submit
      </Button>
      <Button @click="handleReset()">
        Reset
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
