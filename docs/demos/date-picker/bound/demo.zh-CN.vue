<template>
  <DatePicker
    value="2022"
    type="year"
    no-filler
    min="2021"
    max="2024"
  ></DatePicker>
  <br />
  <br />
  <DatePicker
    value="2022-05"
    type="month"
    no-filler
    min="2021-05"
    max="2023-08"
  ></DatePicker>
  <br />
  <br />
  <DatePicker
    value="2020-05-15"
    no-filler
    min="2020-05-10"
    max="2020-05-20"
  ></DatePicker>
  <br />
  <br />
  <DatePicker
    is-range
    :value="['2020-05-13 09:27:15', '2020-05-16 12:34:56']"
    type="datetime"
    no-filler
    min="2020-05-10 11:20:30"
    max="2020-05-20 13:20:10"
  ></DatePicker>
</template>

<style scoped>
.vxp-date-picker {
  max-width: 400px;
}
</style>
