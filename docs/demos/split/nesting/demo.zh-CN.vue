<template>
  <Split style="max-width: 500px; height: 320px; box-shadow: 0 0 1px">
    <template #left>
      <Split vertical can-full style="padding: 10px">
        <template #left>
          <div style="padding: 10px">
            左上侧面板
          </div>
        </template>
        <template #right>
          <div style="padding: 10px">
            左下侧面板
          </div>
        </template>
      </Split>
    </template>
    <template #right>
      <div style="padding: 10px">
        右侧面板
      </div>
    </template>
  </Split>
</template>
