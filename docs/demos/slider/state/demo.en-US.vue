<template>
  <Space vertical style="max-width: 400px">
    <Slider :value="50"></Slider>
    <Slider :value="30" state="success"></Slider>
    <Slider :value="70" state="warning"></Slider>
    <Slider :value="40" state="error"></Slider>
  </Space>
</template>
