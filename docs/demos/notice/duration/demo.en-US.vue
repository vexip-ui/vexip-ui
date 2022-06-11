<template>
  <div>
    <Button type="primary" @click="$notice.info('一条提示消息')">
      正常时长
    </Button>
    <Button type="primary" @click="$notice.info({ content: '一条持续 10 秒的提示消息', duration: 10000 })">
      持续10秒
    </Button>
    <Button
      type="primary"
      @click="$notice.info({ title: '永久消息', duration: 0, closable: true })"
    >
      一直持续
    </Button>
    <Button
      type="primary"
      @click="$notice.info({ title: '永久消息', content: '一条不自动关闭的提示消息', duration: 0, closable: true })"
    >
      一直持续
    </Button>
  </div>
</template>
