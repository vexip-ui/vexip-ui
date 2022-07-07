<template>
  <div>
    <Button type="primary" @click="$notice.info('Top Right', 'A top right notice')">
      Top Right
    </Button>
    <Button type="success" @click="brNotice.success('Bottom Right', 'A bottom right notice')">
      Bottom Right
    </Button>
    <Button type="warning" @click="blNotice.warning('Bottom Left', 'A bottom left notice')">
      Bottom Left
    </Button>
    <Button type="error" @click="tlNotice.error('Top Left', 'A top left notice')">
      Top Left
    </Button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Notice } from 'vexip-ui'

export default defineComponent({
  setup() {
    const brNotice = Notice.clone()
    const tlNotice = Notice.clone()
    const blNotice = Notice.clone()

    brNotice.config({ placement: 'bottom-right' })
    tlNotice.config({ placement: 'top-left' })
    blNotice.config({ placement: 'bottom-left' })

    return {
      brNotice,
      tlNotice,
      blNotice
    }
  }
})
</script>
