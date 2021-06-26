<template>
  <Input v-model:value="value" clearable @on-clear="clear"></Input>
  <p>Input Value: {{ value }}</p>
  <br />
  <Input>
    <template #before>
      http://
    </template>
    <template #after>
      .com
    </template>
  </Input>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Input from '../input'

export default defineComponent({
  name: 'App',
  components: {
    Input
  },
  data() {
    return {
      value: ''
    }
  },
  methods: {
    clear() {
      console.log('clear')
    }
  }
})
</script>

<style lang="scss">
.vxp-input-wrapper {
  width: 300px;
  margin: 10px;
}
</style>
