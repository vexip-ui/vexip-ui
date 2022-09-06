<template>
  <Button type="error" @click="$toast.error({ content: 'Top Tip', position: 'top' })">
    Top
  </Button>
  <Button type="success" @click="$toast.success({ content: 'Center Tip' })">
    Center
  </Button>
  <Button type="warning" @click="$toast.warning({ content: 'Bottom Tip', position: 'bottom' })">
    Bottom
  </Button>
</template>
