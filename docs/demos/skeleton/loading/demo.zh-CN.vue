<template>
  加载状态：<Switch v-model:value="loading"></Switch>
  <br />
  <br />
  <Skeleton
    :loading="loading"
    activated
    width="33%"
    :spread="21"
  >
    <div style="margin-bottom: 14px;">
      标题
    </div>
  </Skeleton>
  <Skeleton :loading="loading" activated :repeat="2">
    <div>一些内容</div>
  </Skeleton>
  <Skeleton :loading="loading" activated width="67%">
    <div>一些内容</div>
  </Skeleton>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)
</script>
