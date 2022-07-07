<template>
  <div>
    <Button type="warning" @click="$message.warning({ content: 'A message with custom icon', icon: CircleQuestion })">
      Custom Icon
    </Button>
    <Button type="error" @click="$message.error({ content: 'A message with custom icon color', iconColor: 'green' })">
      Custom Icon Color
    </Button>
    <Button type="success" @click="sendCustomizedIconMessage">
      Render Method
    </Button>
  </div>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'
import { Icon } from 'vexip-ui'
import { CircleQuestion, Share } from '@vexip-ui/icons'

export default defineComponent({
  setup() {
    return { CircleQuestion }
  },
  methods: {
    sendCustomizedIconMessage() {
      this.$message.success({
        content: 'A message that using icon render method',
        icon: () => {
          return h(Icon, {
            icon: Share,
            flip: 'horizontal'
          })
        }
      })
    }
  }
})
</script>
