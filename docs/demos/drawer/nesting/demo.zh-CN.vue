<template>
  <div>
    <Button type="primary" @on-click="active = !active">
      打开
    </Button>
    <Drawer
      v-model:active="active"
      transfer
      title="一级抽屉"
      :width="480"
    >
      <Button type="primary" @on-click="nestingActive = !nestingActive">
        打开二级抽屉
      </Button>
      <Drawer v-model:active="nestingActive" title="二级抽屉">
        <p>一些内容</p>
        <p>一些内容</p>
        <p>一些内容</p>
      </Drawer>
    </Drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const active = ref(false)
    const nestingActive = ref(false)

    return { active, nestingActive }
  }
})
</script>
