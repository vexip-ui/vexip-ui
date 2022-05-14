<template>
  <p>一段文字一段文字一段文字一段文字一段文字</p>
  <Divider></Divider>
  <p>一段文字一段文字一段文字一段文字一段文字</p>
  <Divider primary>
    我是分割线
  </Divider>
  <p>一段文字一段文字一段文字一段文字一段文字</p>
  <Divider text-position="left">
    我在左侧
  </Divider>
  <p>一段文字一段文字一段文字一段文字一段文字</p>
  <Divider text-position="right">
    我在右侧
  </Divider>
  <p>一段文字一段文字一段文字一段文字一段文字</p>
  <p>
    一段文字
    <Divider vertical></Divider>
    一段文字
    <Divider vertical></Divider>
    一段文字
  </p>
</template>

<script setup lang="ts">
import { Divider } from '..'
</script>
