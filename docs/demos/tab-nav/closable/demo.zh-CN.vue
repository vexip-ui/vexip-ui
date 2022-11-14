<template>
  <TabNav closable @close="handleClose">
    <TabNavItem label="标签页1">
      标签页1
    </TabNavItem>
    <TabNavItem label="标签页2" :closable="false">
      标签页2
    </TabNavItem>
    <TabNavItem label="标签页3">
      标签页3
    </TabNavItem>
  </TabNav>
  <br />
  <br />
  <TabNav card closable @close="handleClose">
    <TabNavItem label="标签页1">
      标签页1
    </TabNavItem>
    <TabNavItem label="标签页2" :closable="false">
      标签页2
    </TabNavItem>
    <TabNavItem label="标签页3">
      标签页3
    </TabNavItem>
  </TabNav>
</template>

<script setup lang="ts">
function handleClose(label: string | number) {
  console.info(label)
}
</script>
