<template>
  <Breadcrumb>
    <template #separator="{ label }">
      {{ label }}
      <Icon name="caret-right"></Icon>
    </template>
    <BreadcrumbItem>此电脑</BreadcrumbItem>
    <BreadcrumbItem>文档 (D:)</BreadcrumbItem>
    <BreadcrumbItem>vexip-ui</BreadcrumbItem>
  </Breadcrumb>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Icon } from '@/components/icon'
import Breadcrumb from '../breadcrumb.vue'
import BreadcrumbItem from '../breadcrumb-item.vue'

import '@/common/icons/caret-right'

export default defineComponent({
  name: 'App',
  components: {
    Breadcrumb,
    BreadcrumbItem,
    Icon
  },
  data() {
    return {}
  }
})
</script>

<style lang="scss"></style>
