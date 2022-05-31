<template>
  <div>
    <Checkbox v-model:checked="checked">
      Checkbox
    </Checkbox>
    <br />
    <p style="margin-top: 10px;">
      checked: {{ checked }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const checked = ref(false)

    return { checked }
  }
})
</script>
