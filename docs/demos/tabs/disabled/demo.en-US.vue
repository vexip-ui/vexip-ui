<template>
  <Tabs>
    <TabPane label="Tab 1">
      <p>Some content for Tab 1.</p>
    </TabPane>
    <TabPane label="Tab 2" disabled>
      <p>Some content for Tab 2.</p>
    </TabPane>
    <TabPane label="Tab 3">
      <p>Some content for Tab 3.</p>
    </TabPane>
  </Tabs>
  <br />
  <br />
  <Tabs card>
    <TabPane label="Tab 1">
      <p>Some content for Tab 1.</p>
    </TabPane>
    <TabPane label="Tab 2" disabled>
      <p>Some content for Tab 2.</p>
    </TabPane>
    <TabPane label="Tab 3">
      <p>Some content for Tab 3.</p>
    </TabPane>
  </Tabs>
</template>

<style scoped>
.vxp-tabs {
  max-width: 500px;
}
</style>
