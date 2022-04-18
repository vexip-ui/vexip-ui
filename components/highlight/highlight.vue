<template>
  <div :class="prefix">
    <template v-for="(item, index) in renderTexts" :key="index">
      <span v-if="item.isKey" :class="`${prefix}__key-word`">
        <slot name="light" :text="item.text">
          {{ item.text }}
        </slot>
      </span>
      <span v-else>
        <slot :text="item.text">
          {{ item.text }}
        </slot>
      </span>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useConfiguredProps } from '@/common/config/install'

import type { PropType } from 'vue'

const props = useConfiguredProps('highlight', {
  content: {
    type: String,
    default: ''
  },
  keyWords: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  ignoreCase: {
    type: Boolean,
    default: false
  }
})

export default defineComponent({
  name: 'Highlight',
  props,
  setup(props) {
    const prefix = 'vxp-highlight'

    const splitRE = computed(() => {
      const keyWords = props.keyWords?.filter(Boolean)

      if (!keyWords?.length) {
        return null
      }

      return new RegExp(
        `(${keyWords.sort((p, n) => n.length - p.length).join('|')})`,
        `${props.ignoreCase ? 'i' : ''}g`
      )
    })
    const renderTexts = computed(() => {
      if (!splitRE.value || !props.content) {
        return [{ isKey: false, text: props.content }]
      }

      return props.content.split(splitRE.value).map(text => {
        return { isKey: splitRE.value!.test(text), text }
      })
    })

    return {
      prefix,

      renderTexts
    }
  }
})
</script>
