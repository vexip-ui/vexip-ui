<template>
  <TabNav v-model:active="active">
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
  <p>
    Current Tab:
    <br />
    {{ active }}
  </p>
  <TabNav card>
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
import { defineComponent } from 'vue'
import TabNav from '../tab-nav.vue'
import TabNavItem from '../tab-nav-item.vue'

export default defineComponent({
  name: 'App',
  components: {
    TabNav,
    TabNavItem
  },
  data() {
    return {
      active: '标签页1'
    }
  }
})
</script>

<style lang="scss"></style>
