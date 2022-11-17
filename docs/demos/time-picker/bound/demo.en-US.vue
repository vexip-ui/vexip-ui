<template>
  <TimePicker value="12:34:56" no-filler min="11:20:30"></TimePicker>
  <br />
  <br />
  <TimePicker
    value="12:34:56"
    no-filler
    min="11:20:30"
    max="13:20:10"
  ></TimePicker>
  <br />
  <br />
  <TimePicker
    value="12:34:56"
    no-filler
    min="15:10:50"
    max="13:20:20"
  ></TimePicker>
</template>

<style scoped>
.vxp-time-picker {
  max-width: 300px;
}
</style>
