<template>
  <Split style="width: 500px; height: 320px; box-shadow: 0 0 1px;">
    <template #left>
      <Split vertical style="padding: 10px;">
        <template #left>
          <div style="padding: 10px;">
            左Top pane
          </div>
        </template>
        <template #right>
          <div style="padding: 10px;">
            左Bottom pane
          </div>
        </template>
      </Split>
    </template>
    <template #right>
      <div style="padding: 10px;">
        Right pane
      </div>
    </template>
  </Split>
</template>
