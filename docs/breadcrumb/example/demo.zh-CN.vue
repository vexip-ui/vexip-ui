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
            <Icon name="caret-right"></Icon>
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

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'

interface Record {
  visible: boolean,
  children: string[]
}

export default defineComponent({
  setup() {
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

    return { recordMap }
  }
})
</script>

<style>
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
