<template>
  <ComponentDoc>
    <template #desc>
      <Desc></Desc>
    </template>
  </ComponentDoc>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import ComponentDoc from '@docs/common/component-doc.vue'

const Desc = defineAsyncComponent(() => import(`./desc.${__LANGUAGE__}.md`))
</script>
