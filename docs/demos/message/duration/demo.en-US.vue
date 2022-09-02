<template>
  <div>
    <Button type="primary" @click="$message.info('A message')">
      Normal
    </Button>
    <Button
      type="primary"
      @click="$message.info({ content: '10 seconds duration message', duration: 10000 })"
    >
      10s Duration
    </Button>
    <Button
      type="primary"
      @click="$message.info({ content: 'A permanent message', duration: 0, closable: true })"
    >
      Permanent
    </Button>
  </div>
</template>
