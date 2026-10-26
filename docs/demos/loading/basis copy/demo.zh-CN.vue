<template>
  <Button type="primary" :loading="loading" @click="doLoading()">
    上方加载
  </Button>
  <Button type="primary" :loading="loading" @click="doLoading('bottom')">
    下方加载
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
    doLoading(position: 'top' | 'bottom' = 'top') {
      clearTimeout(this.timer)
      this.loading = true
      Loading.open({ percent: 0, position })

      this.timer = setTimeout(() => {
        Loading.open(100)
        this.loading = false
      }, 5000)
    },
  },
})
</script>
