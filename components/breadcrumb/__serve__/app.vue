<template>
  <Breadcrumb>
    <template #separator="{ label }">
      {{ label }}
      <Icon name="caret-right"></Icon>
    </template>
    <BreadcrumbItem v-for="item in items" :key="item">
      {{ item }}
    </BreadcrumbItem>
  </Breadcrumb>
  <br />
  <Breadcrumb border>
    <template #separator="{ label }">
      {{ label }}
      <Icon name="caret-right"></Icon>
    </template>
    <BreadcrumbItem v-for="item in items" :key="item">
      {{ item }}
    </BreadcrumbItem>
  </Breadcrumb>
</template>

<script setup lang="ts">
import { Icon } from '@/components/icon'
import { Breadcrumb } from '..'
import { BreadcrumbItem } from '@/components/breadcrumb-item'

import '@/common/icons/caret-right'

const items = ['此电脑', '文档 (D:)', 'ui-library', 'vexip-ui']
</script>
