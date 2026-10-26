<template>
  <Space vertical style="max-width: 400px">
    <Slider :value="30" trigger-fade></Slider>
    <Slider :value="[20, 50]" range trigger-fade></Slider>
  </Space>
</template>
