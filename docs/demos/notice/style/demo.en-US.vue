<template>
  <div>
    <Button type="primary" @click="$notice.info({ title: 'Notice Title', content: 'A colorful text notice', color: true })">
      Colorful Text
    </Button>
    <Button type="success" @click="$notice.success({ title: 'Notice Title', content: 'A notice with background color', background: true })">
      Background Color
    </Button>
    <Button type="warning" @click="$notice.warning({ title: 'Notice Title', content: 'A notice with background color and colorful text', color: true, background: true })">
      Both
    </Button>
    <Button type="error" @click="$notice.error({ title: 'Notice Title', content: 'A notice with custom color', color: '#e88d1c' })">
      Custom Color
    </Button>
  </div>
</template>
