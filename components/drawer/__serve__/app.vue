<template>
  <Row align="middle">
    <RadioGroup v-model:value="placement">
      <Radio label="top"></Radio>
      <Radio label="right"></Radio>
      <Radio label="bottom"></Radio>
      <Radio label="left"></Radio>
    </RadioGroup>
    <Button type="primary" @on-click="active = !active">
      打开
    </Button>
    <Drawer
      v-model:active="active"
      transfer
      :title="`${placement} 抽屉`"
      :placement="placement"
    >
      <p>一些内容</p>
      <p>一些内容</p>
      <p>一些内容</p>
    </Drawer>
  </Row>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Button } from '@/components/button'
import { Radio } from '@/components/radio'
import { RadioGroup } from '@/components/radio-group'
import { Row } from '@/components/row'
import Drawer from '../drawer.vue'

export default defineComponent({
  name: 'App',
  components: {
    Button,
    Drawer,
    Radio,
    RadioGroup,
    Row
  },
  data() {
    return {
      active: false,
      placement: 'right'
    }
  }
})
</script>

<style lang="scss">
.vxp-select {
  width: 300px;
}
</style>
