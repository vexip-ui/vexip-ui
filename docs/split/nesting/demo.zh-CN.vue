<template>
  <Split style="width: 500px; height: 320px; box-shadow: 0 0 1px;">
    <template #left>
      <Split vertical style="padding: 10px;">
        <template #top>
          <div style="padding: 10px;">
            左上侧面板
          </div>
        </template>
        <template #bottom>
          <div style="padding: 10px;">
            左下侧面板
          </div>
        </template>
      </Split>
    </template>
    <template #right>
      <div style="padding: 10px;">
        右侧面板
      </div>
    </template>
  </Split>
</template>
