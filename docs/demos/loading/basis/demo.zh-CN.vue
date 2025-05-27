<template>
  <Button type="primary" :loading="loading" @click="doLoading">
    加载
  </Button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Loading } from 'vexip-ui'

export default defineComponent({
  data() {
    return {
      loading: false,
      timer: undefined! as ReturnType<typeof setTimeout>,
    }
  },
  methods: {
    doLoading() {
      clearTimeout(this.timer)
      this.loading = true
      Loading.open(10)

      this.timer = setTimeout(() => {
        Loading.open(100)
        this.loading = false
      }, 5000)
    },
  },
})
</script>
