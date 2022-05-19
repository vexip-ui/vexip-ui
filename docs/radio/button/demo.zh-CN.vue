<template>
  <RadioGroup v-model:value="value1" button>
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
  <RadioGroup v-model:value="value2" button>
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
  <RadioGroup
    v-model:value="value3"
    button
    disabled
  >
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
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const value1 = ref('')
    const value2 = ref('')
    const value3 = ref('广州')

    return {
      value1,
      value2,
      value3,
      items: ['北京', '上海', '广州', '深圳']
    }
  }
})
</script>
