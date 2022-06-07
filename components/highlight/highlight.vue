<template>
  <div :class="[prefix, `${prefix}-vars`]">
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
import { useProps, booleanProp } from '@vexip-ui/config'

import type { PropType } from 'vue'

export default defineComponent({
  name: 'Highlight',
  props: {
    content: String,
    keyWords: Array as PropType<string[]>,
    ignoreCase: booleanProp
  },
  setup(_props) {
    const props = useProps('highlight', _props, {
      content: {
        default: '',
        static: true
      },
      keyWords: {
        default: () => [],
        static: true
      },
      ignoreCase: false
    })

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
