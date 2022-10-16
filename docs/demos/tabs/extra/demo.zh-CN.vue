<template>
  <Tabs>
    <template #prefix>
      <Button size="small">
        前置操作
      </Button>
    </template>
    <TabPanel label="标签页1">
      <p>标签页一的内容。</p>
    </TabPanel>
    <TabPanel label="标签页2">
      <p>标签页二的内容。</p>
    </TabPanel>
    <TabPanel label="标签页3">
      <p>标签页三的内容。</p>
    </TabPanel>
    <template #suffix>
      <Button size="small">
        后置操作
      </Button>
    </template>
  </Tabs>
</template>

<style scoped>
.vxp-tabs {
  max-width: 500px;
}
</style>
