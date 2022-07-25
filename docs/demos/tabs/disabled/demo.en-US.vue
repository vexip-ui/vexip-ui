<template>
  <Tabs>
    <TabPanel label="Tab 1">
      <p>Some content for Tab 1.</p>
    </TabPanel>
    <TabPanel label="Tab 2" disabled>
      <p>Some content for Tab 2.</p>
    </TabPanel>
    <TabPanel label="Tab 3">
      <p>Some content for Tab 3.</p>
    </TabPanel>
  </Tabs>
  <br />
  <br />
  <Tabs card>
    <TabPanel label="Tab 1">
      <p>Some content for Tab 1.</p>
    </TabPanel>
    <TabPanel label="Tab 2" disabled>
      <p>Some content for Tab 2.</p>
    </TabPanel>
    <TabPanel label="Tab 3">
      <p>Some content for Tab 3.</p>
    </TabPanel>
  </Tabs>
</template>

<style scoped>
.vxp-tabs {
  max-width: 500px;
}
</style>
