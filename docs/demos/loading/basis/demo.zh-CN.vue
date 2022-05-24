<template>
  <Button type="primary" :loading="loading" @on-click="doLoading">
    加载
  </Button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      loading: false,
      timer: -1
    }
  },
  methods: {
    doLoading() {
      window.clearTimeout(this.timer)
      this.loading = true
      this.$loading.open(10)

      this.timer = window.setTimeout(() => {
        this.$loading.open(100)
        this.loading = false
      }, 5000)
    }
  }
})
</script>
