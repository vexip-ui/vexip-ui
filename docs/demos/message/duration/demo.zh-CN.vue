<template>
  <div>
    <Button type="primary" @click="$message.info('一条消息')">
      正常时长
    </Button>
    <Button
      type="primary"
      @click="$message.info({ content: '一条持续 10 秒的消息', duration: 10000 })"
    >
      持续10秒
    </Button>
    <Button
      type="primary"
      @click="$message.info({ content: '一条不自动关闭的消息', duration: 0, closable: true })"
    >
      一直持续
    </Button>
  </div>
</template>
