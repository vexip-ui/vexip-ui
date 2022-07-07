<template>
  <div>
    <Button type="primary" @click="$notice.info('A normal notice')">
      Normal
    </Button>
    <Button type="primary" @click="$notice.info({ content: '10 seconds duration notice', duration: 10000 })">
      10s Duration
    </Button>
    <Button
      type="primary"
      @click="$notice.info({ title: 'A Permanent Notice', duration: 0, closable: true })"
    >
      Permanent Title Only
    </Button>
    <Button
      type="primary"
      @click="$notice.info({ title: 'A Permanent Notice', content: 'A notice not disapper until you close it', duration: 0, closable: true })"
    >
      Permanent
    </Button>
  </div>
</template>
