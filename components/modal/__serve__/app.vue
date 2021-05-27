<template>
  <Button type="primary" @on-click="active = !active">
    打开
  </Button>
  <Modal
    v-model:active="active"
    transfer
    draggable
    resizable
    title="标题"
  >
    <p>一些内容</p>
    <p>一些内容</p>
    <p>一些内容</p>
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Button } from '@/components/button'
import Modal from '../modal.vue'

export default defineComponent({
  name: 'App',
  components: {
    Button,
    Modal
  },
  data() {
    return {
      active: false
    }
  }
})
</script>

<style lang="scss"></style>
