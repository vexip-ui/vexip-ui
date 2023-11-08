<template>
  <Button type="primary" @click="$message.info('A normal message')">
    Normal
  </Button>
  <Button type="success" @click="$message.success('A success message')">
    Success
  </Button>
  <Button type="warning" @click="$message.warning('A warning message')">
    Warning
  </Button>
  <Button type="error" @click="$message.error('A error message')">
    Error
  </Button>
</template>
