<template>
  <Upload
    multiple
    manual
    select-to-add
    allow-drag
    directory
    list-type="thumbnail"
    @on-success="handleSuccess"
  ></Upload>
  <br />
  <br />
  <Upload
    multiple
    manual
    select-to-add
    directory
    list-type="card"
  ></Upload>
  <br />
  <br />
  <Upload
    multiple
    manual
    select-to-add
    directory
    list-type="name"
  ></Upload>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Upload } from '..'

const fileIds = ref<string[]>([])

function handleSuccess(res: { id: string }) {
  if (res.id && !fileIds.value.includes(res.id)) {
    fileIds.value.push(res.id)
  }
}
</script>
