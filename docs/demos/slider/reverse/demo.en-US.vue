<template>
  <Space vertical style="max-width: 400px">
    <Slider :value="30" reverse></Slider>
    <Slider :value="[20, 50]" reverse range></Slider>
  </Space>
  <Space style="height: 200px">
    <Slider :value="30" vertical reverse></Slider>
    <Slider
      :value="[20, 50]"
      vertical
      reverse
      range
    ></Slider>
  </Space>
</template>
