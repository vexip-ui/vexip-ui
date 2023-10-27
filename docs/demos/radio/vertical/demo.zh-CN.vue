<template>
  <Space>
    <RadioGroup vertical>
      <Radio v-for="item in items" :key="item" :label="item">
        {{ item }}
      </Radio>
    </RadioGroup>
    <RadioGroup vertical shape="border">
      <Radio v-for="item in items" :key="item" :label="item">
        {{ item }}
      </Radio>
    </RadioGroup>
    <RadioGroup vertical shape="button">
      <Radio v-for="item in items" :key="item" :label="item">
        {{ item }}
      </Radio>
    </RadioGroup>
    <RadioGroup vertical shape="button-group">
      <Radio v-for="item in items" :key="item" :label="item">
        {{ item }}
      </Radio>
    </RadioGroup>
  </Space>
</template>

<script setup lang="ts">
const items = ['北京', '上海', '广州', '深圳']
</script>
