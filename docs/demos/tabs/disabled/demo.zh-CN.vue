<template>
  <Tabs>
    <TabPanel label="标签页1">
      <p>标签页 1 的内容。</p>
    </TabPanel>
    <TabPanel label="标签页2" disabled>
      <p>标签页 2 的内容。</p>
    </TabPanel>
    <TabPanel label="标签页3">
      <p>标签页 3 的内容。</p>
    </TabPanel>
  </Tabs>
  <br />
  <br />
  <Tabs card>
    <TabPanel label="标签页1">
      <p>标签页 1 的内容。</p>
    </TabPanel>
    <TabPanel label="标签页2" disabled>
      <p>标签页 2 的内容。</p>
    </TabPanel>
    <TabPanel label="标签页3">
      <p>标签页 3 的内容。</p>
    </TabPanel>
  </Tabs>
</template>

<style scoped>
.vxp-tabs {
  max-width: 500px;
}
</style>
