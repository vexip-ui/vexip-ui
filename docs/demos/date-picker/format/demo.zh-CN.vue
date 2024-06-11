<template>
  <Space vertical>
    <DatePicker :value="new Date()" format="dMy"></DatePicker>
    <DatePicker :value="new Date()" type="month" format="My"></DatePicker>
    <DatePicker :value="new Date()" type="datetime" format="dMy Hm"></DatePicker>
  </Space>
</template>

<style>
.vxp-date-picker {
  max-width: 300px;
}
</style>
