<template>
  <Row align="middle">
    <RadioGroup v-model:value="placement">
      <Radio label="top"></Radio>
      <Radio label="right"></Radio>
      <Radio label="bottom"></Radio>
      <Radio label="left"></Radio>
    </RadioGroup>
    <Button type="primary" @click="active = !active">
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
import { defineComponent, ref } from 'vue'

type Placement = 'right' | 'top' | 'bottom' | 'left'

export default defineComponent({
  setup() {
    const active = ref(false)
    const placement = ref<Placement>('right')

    return { active, placement }
  }
})
</script>
