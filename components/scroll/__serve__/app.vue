<template>
  <Scroll
    ref="scroll"
    mode="both"
    pointer
    no-buffer
    use-x-bar
    use-y-bar
    :width="200"
    :height="200"
    style="box-shadow: 0 0 4px #ccc;"
  >
    <div style="width: 500px; height: 400px;">
      <p>内容</p>
      <p>内容</p>
      <p>内容</p>
      <p>内容</p>
      <p id="p4">
        内容4
      </p>
      <p>内容</p>
      <p>内容</p>
      <p>内容</p>
      <p>内容</p>
      <p>内容</p>
      <p id="target">
        内容
      </p>
      <p>内容</p>
    </div>
  </Scroll>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import Scroll from '../scroll.vue'

export default defineComponent({
  name: 'App',
  components: {
    Scroll
  },
  setup() {
    const scroll = ref<InstanceType<typeof Scroll> | null>(null)

    onMounted(() => {
      window.setTimeout(() => {
        if (!scroll.value?.content) return

        const target = scroll.value.content.querySelector('#target')

        target && scroll.value.scrollToElement(target)
      }, 20)
    })

    return {
      scroll
    }
  }
})
</script>

<style lang="scss"></style>
