<template>
  <Breadcrumb border style="max-width: 500px">
    <BreadcrumbItem v-for="[name, record] in recordMap" :key="name">
      {{ name }}
      <template #separator>
        <Dropdown v-model:visible="record.visible">
          <div
            :class="{
              separator: true,
              'is-active': record.visible
            }"
          >
            <Icon><CaretRight></CaretRight></Icon>
          </div>
          <template #drop>
            <DropdownList>
              <DropdownItem v-for="child in record.children" :key="child">
                {{ child }}
              </DropdownItem>
            </DropdownList>
          </template>
        </Dropdown>
      </template>
    </BreadcrumbItem>
  </Breadcrumb>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

import { CaretRight } from '@vexip-ui/icons'

interface Record {
  visible: boolean,
  children: string[]
}

const recordMap = ref(new Map<string, Record>())

recordMap.value
  .set(
    'This Computer',
    reactive({ visible: false, children: ['System (C:)', 'Document (D:)', 'Software (E:)'] })
  )
  .set('Document (D:)', reactive({ visible: false, children: ['vexip-ui', 'font-awesome', 'vue'] }))
  .set('vexip-ui', reactive({ visible: false, children: [] }))
</script>

<style scoped>
.separator {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  transition: var(--vxp-transition-transform);
}

.separator.is-active {
  transform: rotate(90deg);
}
</style>
