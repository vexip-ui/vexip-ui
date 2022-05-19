<template>
  <TabNav v-model:active="active" card>
    <TabNavItem label="标签页1">
      标签页1
    </TabNavItem>
    <TabNavItem label="标签页2">
      标签页2
    </TabNavItem>
    <TabNavItem label="标签页3">
      标签页3
    </TabNavItem>
  </TabNav>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const active = ref('标签页1')

    return { active }
  }
})
</script>
