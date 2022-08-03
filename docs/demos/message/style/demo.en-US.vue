<template>
  <div>
    <Button
      type="primary"
      @click="$message.info({ content: 'A colorful text message', color: true })"
    >
      Colorful Text
    </Button>
    <Button
      type="success"
      @click="$message.success({ content: 'A message with background color', background: true })"
    >
      Background Color
    </Button>
    <Button
      type="warning"
      @click="
        $message.warning({
          content: 'A message with background color and colorful text',
          color: true,
          background: true
        })
      "
    >
      Both
    </Button>
    <Button
      type="error"
      @click="$message.error({ content: 'A message with custom color', color: '#e88d1c' })"
    >
      Custom Color
    </Button>
  </div>
</template>
