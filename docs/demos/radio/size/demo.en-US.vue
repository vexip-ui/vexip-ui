<template>
  <Space vertical :size="12">
    <template v-for="size in sizes" :key="size">
      <RadioGroup :size="size">
        <Radio v-for="item in items" :key="item" :label="item">
          {{ item }}
        </Radio>
      </RadioGroup>
    </template>
    <template v-for="size in sizes" :key="size">
      <RadioGroup :size="size" button>
        <Radio v-for="item in items" :key="item" :label="item">
          {{ item }}
        </Radio>
      </RadioGroup>
    </template>
    <template v-for="size in sizes" :key="size">
      <RadioGroup :size="size" border>
        <Radio v-for="item in items" :key="item" :label="item">
          {{ item }}
        </Radio>
      </RadioGroup>
    </template>
  </Space>
</template>

<script setup lang="ts">
const sizes = ['small', 'default', 'large'] as const
const items = ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen']
</script>
