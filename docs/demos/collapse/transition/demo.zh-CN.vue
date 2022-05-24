<template>
  <div>
    <Button type="primary" @on-click="expanded = !expanded">
      {{ expanded ? '收起' : '展开' }}
    </Button>
    <br />
    <CollapseTransition>
      <p v-show="expanded">
        自定义折叠内容自定义折叠内容
      </p>
    </CollapseTransition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const expanded = ref(true)

    return { expanded }
  }
})
</script>
