<template>
  <NativeScroll
    ref="scroll"
    mode="both"
    appear
    pointer
    use-x-bar
    use-y-bar
    use-bar-track
    :scroll-y="400"
    :width="200"
    :height="200"
    style="box-shadow: 0 0 4px #ccc;"
  >
    <p
      v-for="i in 20"
      :key="i"
      class="content"
      style="width: 500px;"
    >
      {{ i }}
    </p>
  </NativeScroll>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { NativeScroll } from '..'

export default defineComponent({
  name: 'App',
  components: {
    NativeScroll
  },
  setup() {
    const scroll = ref<InstanceType<typeof NativeScroll> | null>(null)

    return {
      scroll
    }
  }
})
</script>

<style lang="scss">
.content {
  $color: #fab005;

  padding: 10px;
  margin: 4px;
  color: $color;
  background-image:
    linear-gradient(
      to right,
      rgba($color, 0.2),
      rgba($color, 0.7)
    );
}
</style>
