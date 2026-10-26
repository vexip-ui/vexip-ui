<template>
  加载状态：<Switch v-model:value="loading"></Switch>
  <br />
  <br />
  激活状态：<Switch v-model:value="activated"></Switch>
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
    <div style="margin-bottom: 14px">
      标题
    </div>
    <br />
    <Avatar src="https://www.vexipui.com/qmhc.jpg" size="large" circle></Avatar>
    <div>一些内容</div>
    <div>一些内容</div>
    <div>一些内容</div>
    <div>一些内容</div>
    <br />
    <img src="https://www.vexipui.com/qmhc.jpg" width="64" height="64" />
  </template>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)
const activated = ref(true)
</script>
