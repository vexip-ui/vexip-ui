<template>
  <Split v-model:value="value" can-full style="width: 500px; height: 320px; box-shadow: 0 0 1px;">
    <template #left>
      <Split vertical lazy style="padding: 10px;">
        <template #top>
          <div style="padding: 10px;">
            左上侧面板
          </div>
        </template>
        <template #bottom>
          <div style="padding: 10px;">
            左下侧面板
          </div>
        </template>
      </Split>
    </template>
    <template #right>
      <div style="padding: 10px;">
        右侧面板
      </div>
    </template>
  </Split>
  <p>
    Split Value:
    <br />
    {{ value }}
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Split from '../split.vue'

export default defineComponent({
  name: 'App',
  components: {
    Split
  },
  data() {
    return {
      value: 0.5
    }
  }
})
</script>

<style lang="scss"></style>
