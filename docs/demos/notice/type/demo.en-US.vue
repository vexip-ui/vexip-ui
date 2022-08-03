<template>
  <div>
    <Button type="primary" @click="$notice.info('Notice Title', 'A normal notice')">
      Normal
    </Button>
    <Button type="success" @click="$notice.success('Notice Title', 'A success notice')">
      Success
    </Button>
    <Button type="warning" @click="$notice.warning('Notice Title', 'A warning notice')">
      Warning
    </Button>
    <Button type="error" @click="$notice.error('Notice Title', 'A error notice')">
      Error
    </Button>
  </div>
</template>
