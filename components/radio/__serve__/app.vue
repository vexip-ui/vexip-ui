<template>
  <RadioGroup v-model:value="value">
    <Radio v-for="item in items" :key="item" :label="item">
      {{ item }}
    </Radio>
  </RadioGroup>
  <p style="margin-top: 10px;">
    value: {{ value }}
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Radio from '../radio.vue'
import RadioGroup from '../radio-group.vue'

export default defineComponent({
  name: 'App',
  components: {
    Radio,
    RadioGroup
  },
  data() {
    return {
      value: '上海',
      items: ['北京', '上海', '广州', '深圳']
    }
  }
})
</script>

<style lang="scss"></style>
