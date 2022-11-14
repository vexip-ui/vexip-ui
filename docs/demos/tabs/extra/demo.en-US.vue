<template>
  <Tabs>
    <template #prefix>
      <Button size="small">
        Prefix Extra Action
      </Button>
    </template>
    <TabPanel label="Tab 1">
      <p>Some content for Tab 1.</p>
    </TabPanel>
    <TabPanel label="Tab 2">
      <p>Some content for Tab 2.</p>
    </TabPanel>
    <TabPanel label="Tab 3">
      <p>Some content for Tab 3.</p>
    </TabPanel>
    <template #suffix>
      <Button size="small">
        Suffix Extra Action
      </Button>
    </template>
  </Tabs>
</template>

<style scoped>
.vxp-tabs {
  max-width: 500px;
}
</style>
