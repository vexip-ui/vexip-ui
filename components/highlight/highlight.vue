<template>
  <div :class="[nh.b(), nh.bs('vars')]">
    <template v-for="(item, index) in renderTexts" :key="index">
      <span v-if="item.isKey" :class="nh.be('key-word')">
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
import { useNameHelper, useProps } from '@vexip-ui/config'
import { highlightProps } from './props'

export default defineComponent({
  name: 'Highlight',
  props: highlightProps,
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

    const nh = useNameHelper('highlight')

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
      nh,

      renderTexts
    }
  }
})
</script>
