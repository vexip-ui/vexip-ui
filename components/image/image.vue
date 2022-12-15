<template>
  <div :class="className" role="none">
    <img
      :class="nh.be('img')"
      :width="props.width || undefined"
      :height="props.height || undefined"
      :style="imagestyle"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'
import { useNameHelper, useProps, emitEvent } from '@vexip-ui/config'
// import { useIntersection } from '@vexip-ui/hooks'
import { imageProps } from './props'

const objectFitValues = Object.freeze(['fill', 'contain', 'cover', 'none', 'scale-down'])

export default defineComponent({
  name: 'Image',
  props: imageProps,
  emits: [],
  setup(_props) {
    const props = useProps('image', _props, {
      src: {
        default: '',
        static: true
      },
      fallbackSrc: '',
      alt: '',
      fit: {
        default: 'cover',
        validator: value => objectFitValues.includes(value)
      },
      width: '',
      height: '',
      imgAttrs: () => ({}),
      lazy: false,
      root: {
        default: null,
        static: true
      },
      rootMargin: '',
      preview: false
    })

    const nh = useNameHelper('image')

    const loadFail = ref(false)
    const fallbackFail = ref(false)

    const className = computed(() => {
      return [nh.b(), nh.bs('vars')]
    })
    const imagestyle = computed(() => {
      return {
        [nh.cv('fit')]: props.fit
      }
    })

    watch(
      () => props.src,
      () => {
        loadFail.value = false
        fallbackFail.value = false
      }
    )
    watch(
      () => props.fallbackSrc,
      () => {
        fallbackFail.value = false
      }
    )

    function handleError(event: Event) {
      loadFail.value = true
      emitEvent(props.onError, event)
    }

    return {
      props,
      nh,

      className,
      imagestyle,

      handleError
    }
  }
})
</script>
