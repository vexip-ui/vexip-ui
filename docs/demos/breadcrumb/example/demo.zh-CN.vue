<template>
  <Breadcrumb border style="max-width: 500px;">
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
import { ref, reactive } from 'vue'
import { CaretRight } from '@vexip-ui/icons'

interface Record {
  visible: boolean,
  children: string[]
}

const recordMap = ref(new Map<string, Record>())

recordMap.value
  .set(
    '此电脑',
    reactive({ visible: false, children: ['系统 (C:)', '文档 (D:)', '软件 (E:)'] })
  )
  .set(
    '文档 (D:)',
    reactive({ visible: false, children: ['vexip-ui', 'element-plus', 'antd-vue'] })
  )
  .set('vexip-ui', reactive({ visible: false, children: [] }))
</script>

<style scoped>
.separator {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  transition: transform 250ms;
}

.separator.is-active {
  transform: rotate(90deg);
}
</style>
