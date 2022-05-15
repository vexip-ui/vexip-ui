<template>
  <Card title="标题" style="width: 320px;">
    <p>卡片的内容</p>
    <p>卡片的内容</p>
    <p>卡片的内容</p>
    <template #extra>
      <Button>
        按钮
      </Button>
    </template>
  </Card>
  <br />
  <div style="width: 320px;">
    <Card title="Never" shadow="never">
      <p>卡片的内容</p>
      <p>卡片的内容</p>
      <p>卡片的内容</p>
    </Card>
    <br />
    <Card title="Hover" shadow="hover">
      <p>卡片的内容</p>
      <p>卡片的内容</p>
      <p>卡片的内容</p>
    </Card>
    <br />
    <Card title="Always">
      <p>卡片的内容</p>
      <p>卡片的内容</p>
      <p>卡片的内容</p>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/button'
import { Card } from '..'
</script>
