<template>
  <Button type="primary" :loading="loading" @click="doLoading">
    Loading
  </Button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      loading: false,
      timer: undefined! as ReturnType<typeof setTimeout>
    }
  },
  methods: {
    doLoading() {
      clearTimeout(this.timer)
      this.loading = true
      this.$loading.open({ percent: 20, strokeWidth: 5 })

      this.timer = setTimeout(() => {
        this.$loading.open({ percent: 100, strokeWidth: 5 })
        this.loading = false
      }, 5000)
    }
  }
})
</script>
