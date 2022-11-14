<template>
  <TabNav closable @close="handleClose">
    <TabNavItem label="Tab 1">
      Tab 1
    </TabNavItem>
    <TabNavItem label="Tab 2" :closable="false">
      Tab 2
    </TabNavItem>
    <TabNavItem label="Tab 3">
      Tab 3
    </TabNavItem>
  </TabNav>
  <br />
  <br />
  <TabNav closable @close="handleClose">
    <TabNavItem label="Tab 1">
      Tab 1
    </TabNavItem>
    <TabNavItem label="Tab 2" :closable="false">
      Tab 2
    </TabNavItem>
    <TabNavItem label="Tab 3">
      Tab 3
    </TabNavItem>
  </TabNav>
</template>

<script setup lang="ts">
function handleClose(label: string | number) {
  console.info(label)
}
</script>
