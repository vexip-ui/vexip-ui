<template>
  <div>
    <Button type="primary" @click="$message.info('一条一般消息')">
      一般消息
    </Button>
    <Button type="success" @click="$message.success('一条成功消息')">
      成功消息
    </Button>
    <Button type="warning" @click="$message.warning('一条警告消息')">
      警告消息
    </Button>
    <Button type="error" @click="$message.error('一条错误消息')">
      错误消息
    </Button>
  </div>
</template>
