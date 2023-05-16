<template>
  <Button type="warning" @click="$toast.warning({ content: 'Custom Icon', icon: CircleQuestion })">
    Custom Icon
  </Button>
  <Button type="success" @click="showCustomizedIconToast">
    Render Method
  </Button>
</template>

<script setup lang="ts">
import { h } from 'vue'

import { Icon, Toast } from 'vexip-ui'
import { CircleQuestion, Share } from '@vexip-ui/icons'

function showCustomizedIconToast() {
  Toast.success({
    content: 'Render Method',
    icon: () =>
      h(Icon, {
        icon: Share
      })
  })
}
</script>
