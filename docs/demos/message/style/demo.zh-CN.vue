<template>
  <div>
    <Button
      type="primary"
      @on-click="$message.info({ content: '一条字体有颜色的消息', color: true })"
    >
      字体颜色
    </Button>
    <Button
      type="success"
      @on-click="$message.success({ content: '一条背景有颜色的消息', background: true })"
    >
      背景颜色
    </Button>
    <Button
      type="warning"
      @on-click="
        $message.warning({ content: '一条字体和背景有颜色的消息', color: true, background: true })
      "
    >
      字体和背景颜色
    </Button>
    <Button
      type="error"
      @on-click="$message.error({ content: '一条自定义颜色的消息', color: '#e88d1c' })"
    >
      自定义颜色
    </Button>
  </div>
</template>
