<template>
  <Dropdown v-model:visible="visible" transfer trigger="click">
    <Button type="primary">
      下拉菜单
    </Button>
    <template #drop>
      <DropdownList>
        <DropdownItem label="选项一">
          选项一
        </DropdownItem>
        <DropdownItem label="选项二">
          选项二
        </DropdownItem>
        <Dropdown label="选项三">
          <DropdownItem divided>
            选项三
          </DropdownItem>
          <template #drop>
            <DropdownList>
              <DropdownItem>子选项一</DropdownItem>
              <DropdownItem divided>
                子选项二
              </DropdownItem>
              <DropdownItem>子选项三</DropdownItem>
            </DropdownList>
          </template>
        </Dropdown>
        <DropdownItem label="选项四">
          选项四
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
