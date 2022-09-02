<template>
  <div>
    <Button type="primary" @click="$notice.open('Notice Title', 'Some content to notice')">
      Open
    </Button>
    <Button type="primary" @click="$notice.open('A Tiltle Only Notice')">
      Title Only
    </Button>
    <Button type="primary" @click="$notice.open({ content: 'A content only notice' })">
      Content Only
    </Button>
  </div>
</template>
