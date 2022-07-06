<template>
  <RadioGroup button>
    <Radio
      v-for="item in items"
      :key="item"
      :label="item"
    >
      {{ item }}
    </Radio>
  </RadioGroup>
  <br />
  <br />
  <RadioGroup button>
    <Radio
      v-for="item in items"
      :key="item"
      :label="item"
      :disabled="item === '上海'"
    >
      {{ item }}
    </Radio>
  </RadioGroup>
  <br />
  <br />
  <RadioGroup button disabled>
    <Radio
      v-for="item in items"
      :key="item"
      :label="item"
    >
      {{ item }}
    </Radio>
  </RadioGroup>
</template>

<script setup lang="ts">
const items = ['北京', '上海', '广州', '深圳']
</script>
