<template>
  <TabNav v-model:active="active">
    <TabNavItem label="Tab 1">
      Tab 1
    </TabNavItem>
    <TabNavItem label="Tab 2">
      Tab 2
    </TabNavItem>
    <TabNavItem label="Tab 3">
      Tab 3
    </TabNavItem>
  </TabNav>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const active = ref('Tab 1')

    return { active }
  }
})
</script>
