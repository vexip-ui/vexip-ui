<template>
  <Dropdown>
    <div ref="anchor"></div>
    <template #drop>
      <DropdownList>
        <DropdownItem></DropdownItem>
      </DropdownList>
    </template>
  </Dropdown>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Dropdown } from '@/components/dropdown'
import { DropdownList } from '@/components/dropdown-list'
import { DropdownItem } from '@/components/dropdown-item'

export default defineComponent({
  name: 'Contextmenu',
  components: {
    Dropdown,
    DropdownList,
    DropdownItem
  },
  setup() {
    const visible = ref(false)

    const anchor = ref<HTMLElement | null>(null)

    return {
      visible,
      anchor
    }
  }
})
</script>
