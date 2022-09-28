<template>
  <Dropdown>
    <Button type="primary">
      Custom content
    </Button>
    <template #drop>
      <div
        style="padding: 15px; background-color: var(--bg-color); box-shadow: var(--vxp-shadow-base);"
      >
        <p>Some content to fill</p>
        <p>Some content to fill</p>
        <p>Some content to fill</p>
        <Button>Button</Button>
      </div>
    </template>
  </Dropdown>
</template>
