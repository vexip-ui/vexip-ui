<script setup lang="ts" name="FullScreen">
import { useFullScreen } from '@/common/hooks/src'
import { useNameHelper } from '@/common/config/src'
import { ref, computed } from 'vue'
import { fullScreenProps } from './props'

const props = defineProps(fullScreenProps)

const rootRef = ref(null)

const nh = useNameHelper('full-screen')
const defaultCls = nh.b()

const className = ref('')

const windowEnter = () => {
  className.value = defaultCls
}
const windowExit = () => {
  className.value = ''
}

const { enter: browserEnter, exit: browserExit } = useFullScreen(rootRef)

const enter = computed(() => (props.type === 'browser' ? browserEnter : windowEnter))
const exit = computed(() => (props.type === 'browser' ? browserExit : windowExit))

defineExpose({
  enter,
  exit
})
</script>

<template>
  <div ref="rootRef" :class="className">
    <slot :enter="enter" :exit="exit"></slot>
  </div>
</template>
