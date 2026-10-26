<template>
  <Space vertical>
    <CheckboxGroup color="orange" :value="['上海']" :options="options"></CheckboxGroup>
    <CheckboxGroup
      color="orange"
      state-color
      :value="['上海']"
      :options="options"
    ></CheckboxGroup>
  </Space>
</template>

<script setup lang="ts">
const options = ['北京', '上海', '广州', '深圳']
</script>
