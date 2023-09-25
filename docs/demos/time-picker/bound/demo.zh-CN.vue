<template>
  <TimePicker value="12:34:56" min="11:20:30"></TimePicker>
  <br />
  <br />
  <TimePicker
    range
    :value="['12:34:56', '13:11:43']"
    min="11:20:30"
    max="13:20:10"
  ></TimePicker>
</template>

<style scoped>
.vxp-time-picker {
  max-width: 300px;
}
</style>
