<template>
  <Split style="max-width: 500px; height: 320px; box-shadow: 0 0 1px">
    <template #left>
      <Split vertical can-full style="padding: 10px">
        <template #left>
          <div style="padding: 10px">
            Left-Top pane
          </div>
        </template>
        <template #right>
          <div style="padding: 10px">
            Left-Bottom pane
          </div>
        </template>
      </Split>
    </template>
    <template #right>
      <div style="padding: 10px">
        Right pane
      </div>
    </template>
  </Split>
</template>
