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
  <div>
    Checkbox Value:
    <br />
    {{ values }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Checkbox from '../checkbox.vue'
import CheckboxGroup from '../checkbox-group.vue'

export default defineComponent({
  name: 'App',
  components: {
    Checkbox,
    CheckboxGroup
  },
  data() {
    return {
      checked: false,
      values: ['广州'],
      items: ['北京', '上海', '广州', '深圳']
    }
  }
})
</script>

<style lang="scss"></style>
