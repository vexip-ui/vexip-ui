<template>
  <div>
    <Input
      v-model:value="value1"
      placeholder="vexip-ui"
      style="width: 420px;"
    >
      <template #before>
        http://
      </template>
      <template #after>
        .com
      </template>
    </Input>
    <br />
    <Input
      v-model:value="value2"
      placeholder="vexip-ui"
      style="width: 420px;"
    >
      <template #before>
        <Select v-model:value="protocol">
          <Option>http://</Option>
          <Option>https://</Option>
        </Select>
      </template>
      <template #after>
        <Select v-model:value="service">
          <Option>.com</Option>
          <Option>.cn</Option>
          <Option>.net</Option>
          <Option>.org</Option>
        </Select>
      </template>
    </Input>
    <br />
    <Input
      v-model:value="value3"
      placeholder="vexip-ui"
      style="width: 420px;"
    >
      <template #after>
        <Icon name="cog"></Icon>
      </template>
    </Input>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const value1 = ref('')
    const value2 = ref('')
    const value3 = ref('')

    return {
      value1,
      value2,
      value3,
      protocol: 'http://',
      service: '.com'
    }
  }
})
</script>
