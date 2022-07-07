<template>
  <div>
    <Button type="warning" @click="$notice.warning({ content: 'A notice with custom icon', icon: CircleQuestion })">
      Custom Icon
    </Button>
    <Button type="error" @click="$notice.error({ content: 'A notice with custom icon color', iconColor: 'green' })">
      Custom Icon Color
    </Button>
    <Button type="success" @click="sendCustomizedIconNotice">
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
    sendCustomizedIconNotice() {
      this.$notice.success({
        content: 'A notice that using icon render method',
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
