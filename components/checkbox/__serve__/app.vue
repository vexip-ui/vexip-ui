<template>
  <Checkbox v-model:checked="checked">
    Checkbox
  </Checkbox>
  <br />
  <p style="margin-top: 10px;">
    checked: {{ checked }}
  </p>
  <CheckboxGroup v-model:values="values">
    <Checkbox control>
      全选
    </Checkbox>
    <Checkbox v-for="item in items" :key="item" :label="item"></Checkbox>
  </CheckboxGroup>
  <p>
    Checkbox Value:
    <br />
    {{ values }}
  </p>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Checkbox } from '..'
import { CheckboxGroup } from '@/components/checkbox-group'

export default defineComponent({
  name: 'App',
  components: {
    Checkbox,
    CheckboxGroup
  },
  setup() {
    const checked = ref(false)
    const values = ref<string[]>(['广州'])

    return {
      checked,
      values,
      items: ['北京', '上海', '广州', '深圳']
    }
  }
})
</script>
