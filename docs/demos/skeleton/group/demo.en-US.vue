<template>
  Loading: <Switch v-model:value="loading"></Switch>
  <br />
  <br />
  Activated: <Switch v-model:value="activated"></Switch>
  <br />
  <br />
  <SkeletonGroup v-if="loading" :activated="activated">
    <Skeleton width="33%" :spread="21"></Skeleton>
    <br />
    <br />
    <Skeleton size="large" circle></Skeleton>
    <Skeleton :repeat="4"></Skeleton>
    <br />
    <br />
    <Skeleton
      :width="64"
      :height="64"
      image
      :icon-scale="2"
    ></Skeleton>
  </SkeletonGroup>
  <template v-else>
    <div style="margin-bottom: 14px;">
      Title
    </div>
    <br />
    <Avatar src="/qmhc.jpg" size="large" circle></Avatar>
    <div>Some content</div>
    <div>Some content</div>
    <div>Some content</div>
    <div>Some content</div>
    <br />
    <img src="/qmhc.jpg" width="64" height="64" />
  </template>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)
const activated = ref(true)
</script>
