<template>
  <div>
    <p style="margin-bottom: 10px;">
      <Checkbox v-model:checked="checked" :disabled="disabled">
        {{ checked ? 'checked' : 'unchecked' }}
        -
        {{ disabled ? 'disabled' : 'enabled' }}
      </Checkbox>
    </p>
    <Button
      type="primary"
      size="small"
      @on-click="checked = !checked"
    >
      {{ checked ? 'Uncheck' : 'Check' }}
    </Button>
    <Button
      type="primary"
      size="small"
      @on-click="disabled = !disabled"
    >
      {{ disabled ? 'Enable' : 'Disable' }}
    </Button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const checked = ref(false)
    const disabled = ref(false)

    return { checked, disabled }
  }
})
</script>
