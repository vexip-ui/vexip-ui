<template>
  <RadioGroup size="small">
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
  <RadioGroup>
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
  <RadioGroup size="large">
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
  <RadioGroup button size="small">
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
    >
      {{ item }}
    </Radio>
  </RadioGroup>
  <br />
  <br />
  <RadioGroup button size="large">
    <Radio
      v-for="item in items"
      :key="item"
      :label="item"
    >
      {{ item }}
    </Radio>
  </RadioGroup>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {
      items: ['北京', '上海', '广州', '深圳']
    }
  }
})
</script>
