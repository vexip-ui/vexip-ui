<template>
  <div>
    <Button type="primary" @on-click="$notice.info({ content: '一条字体有颜色的提示消息', color: true })">
      字体颜色
    </Button>
    <Button type="success" @on-click="$notice.success({ content: '一条背景有颜色的提示消息', background: true })">
      背景颜色
    </Button>
    <Button type="warning" @on-click="$notice.warning({ content: '一条字体和背景有颜色的提示消息', color: true, background: true })">
      字体和背景颜色
    </Button>
    <Button type="error" @on-click="$notice.error({ content: '一条自定义颜色的提示消息', color: '#e88d1c' })">
      自定义颜色
    </Button>
  </div>
</template>
