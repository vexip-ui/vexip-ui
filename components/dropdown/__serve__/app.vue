<template>
  <Dropdown v-model:visible="visible" transfer>
    <Button type="primary">
      下拉菜单
    </Button>
    <template #drop>
      <DropdownList>
        <DropdownItem name="选项一">
          选项一
        </DropdownItem>
        <DropdownItem name="选项二">
          选项二
        </DropdownItem>
        <DropdownItem name="选项三">
          选项三
        </DropdownItem>
      </DropdownList>
    </template>
  </Dropdown>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Button } from '@/components/button'
import Dropdown from '../dropdown.vue'
import DropdownList from '../dropdown-list.vue'
import DropdownItem from '../dropdown-item.vue'

export default defineComponent({
  name: 'App',
  components: {
    Button,
    Dropdown,
    DropdownList,
    DropdownItem
  },
  data() {
    return {
      visible: false
    }
  }
})
</script>
