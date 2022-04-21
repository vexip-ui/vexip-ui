<template>
  <Upload
    multiple
    manual
    select-to-add
    allow-drag
    directory
    list-type="card"
    @on-success="handleSuccess"
  ></Upload>
  <Upload
    multiple
    manual
    select-to-add
    directory
    list-type="card"
  ></Upload>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Upload from '../upload.vue'

export default defineComponent({
  name: 'App',
  components: {
    Upload
  },
  data() {
    return {
      fileIds: [] as string[]
    }
  },
  methods: {
    handleSuccess(res: { id: string }) {
      if (res.id && !this.fileIds.includes(res.id)) {
        this.fileIds.push(res.id)
      }
    }
  }
})
</script>

<style lang="scss"></style>
