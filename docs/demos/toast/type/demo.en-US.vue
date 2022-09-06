<template>
  <Button @click="$toast.open('Normal Tip')">
    Normal
  </Button>
  <Button type="success" @click="$toast.success('Success Tip')">
    Success
  </Button>
  <Button type="warning" @click="$toast.warning('Warning Tip')">
    Warning
  </Button>
  <Button type="error" @click="$toast.error('Error Tip')">
    Error
  </Button>
  <Button type="primary" @click="$toast.loading('Loading...')">
    Loading
  </Button>
</template>
