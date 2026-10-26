<template>
  <Space vertical>
    <ColorPicker :value="'rgba(51, 154, 240, 0.6)'" show-label label-format="hex"></ColorPicker>
    <ColorPicker :value="'rgba(51, 154, 240, 0.6)'" alpha show-label></ColorPicker>
    <ColorPicker :value="'rgba(51, 154, 240, 0.6)'" show-label label-format="hex">
      <template #label="{ label }">
        已选：{{ label }}
      </template>
    </ColorPicker>
  </Space>
</template>
