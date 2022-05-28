<template>
  <ComponentDoc :desc="desc" :examples="examples" :api="api"></ComponentDoc>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, markRaw } from 'vue'
import ComponentDoc from '@docs/common/component-doc.vue'

const desc = defineAsyncComponent(() => import(`./desc.${__LANGUAGE__}.md`))

const demos = [
  'basis',
  'simple',
  'ghost',
  'text',
  'dashed',
  'disabled',
  'icon',
  'loading',
  'custom',
  'group'
]

const examples = ref(demos.map(name => {
  return {
    demo: markRaw(defineAsyncComponent(() => import(`./${name}/demo.${__LANGUAGE__}.vue`))),
    desc: markRaw(defineAsyncComponent(() => import(`./${name}/desc.${__LANGUAGE__}.md`))),
    code: ''
  }
}))

const api = defineAsyncComponent(() => import(`./api.${__LANGUAGE__}.md`))

demos.forEach((name, index) => {
  import(`./${name}/demo.${__LANGUAGE__}.vue?raw`).then(code => examples.value[index].code = code.default)
})
</script>
