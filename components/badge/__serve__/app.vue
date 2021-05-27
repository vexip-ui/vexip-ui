<template>
  <Badge :content="11" @on-badge-click="handleClick">
    <Button>消息</Button>
  </Badge>
  <div style="margin-bottom: 8px;">
    <Badge is-dot :content="4"></Badge>
    Error
  </div>
  <div style="margin-bottom: 8px;">
    <Badge is-dot type="primary"></Badge>
    Primary
  </div>
  <div style="margin-bottom: 8px;">
    <Badge is-dot type="success"></Badge>
    Success
  </div>
  <div style="margin-bottom: 8px;">
    <Badge is-dot type="warning"></Badge>
    Warning
  </div>
  <div style="margin-bottom: 8px;">
    <Badge is-dot type="info"></Badge>
    Info
  </div>
  <div style="margin-bottom: 8px;">
    <Badge is-dot type="disabled"></Badge>
    Disabled
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Button } from '@/components/button'
import Badge from '../badge.vue'

export default defineComponent({
  name: 'App',
  components: {
    Badge,
    Button
  },
  methods: {
    handleClick() {
      console.log('click')
    }
  }
})
</script>

<style lang="scss"></style>
