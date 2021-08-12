<template>
  <div style="padding: 30px;">
    <Ellipsis style="width: 100px;">
      过长会省略的内容
    </Ellipsis>
    <Ellipsis style="width: 200px;">
      过长会省略的内容
    </Ellipsis>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Ellipsis } from '..'

export default defineComponent({
  name: 'App',
  components: {
    Ellipsis
  },
  setup() {
    return {}
  }
})
</script>
