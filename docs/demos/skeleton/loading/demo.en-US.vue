<template>
  Loading: <Switch v-model:value="loading"></Switch>
  <br />
  <br />
  <Skeleton
    :loading="loading"
    activated
    width="33%"
    :spread="21"
  >
    <div style="margin-bottom: 14px">
      Title
    </div>
  </Skeleton>
  <Skeleton :loading="loading" activated :repeat="2">
    <div>Some content</div>
    <div>Some content</div>
  </Skeleton>
  <Skeleton :loading="loading" activated width="67%">
    <div>Some content</div>
  </Skeleton>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)
</script>
