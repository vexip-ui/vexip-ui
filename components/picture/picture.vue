<template>
  <div :class="className" :style="style">
    <slot v-if="loading" name="load">
      <div :class="`${prefix}__load`">
        {{ loadingText }}
      </div>
    </slot>
    <slot v-else-if="error" name="error">
      <div :class="`${prefix}__error`">
        {{ errorText }}
      </div>
    </slot>
    <img
      v-else
      v-bind="$attrs"
      :class="`${prefix}__image`"
      :src="src"
      :style="imageStyle"
      v-on="$listeners"
    />
  </div>
</template>

<script>
import { config, useConfigurableProps } from '../../src/config/properties'

const prefix = config.defaults.prefixCls

const isSupportObjectFit =
  document.documentElement.style.objectFit !== undefined

const objectFit = {
  fill: 'fill',
  contain: 'contain',
  cover: 'cover',
  none: 'none',
  scaleDown: 'scale-down'
}

const props = useConfigurableProps({
  fit: {
    default: 'fill',
    validator(value) {
      return Object.values(objectFit).includes(value)
    }
  },
  src: {
    type: String,
    default: null
  },
  width: {
    type: [Number, String],
    default: 'auto'
  },
  height: {
    type: [Number, String],
    default: 'auto'
  }
})

export default {
  name: 'Picture',
  inheritAttrs: false,
  props,
  data() {
    return {
      prefix: `${prefix}-picture`,
      loading: true,
      error: false,
      imageWidth: null,
      imageHeight: null,
      loadingText: '加载中...',
      errorText: '加载失败'
    }
  },
  computed: {
    className() {
      const { prefix, fit } = this

      return [prefix, `${prefix}--${fit}`]
    },
    style() {
      const { width, height } = this

      let widthValue = +width
      let heightValue = +height

      if (Number.isNaN(widthValue)) {
        widthValue = width
      } else {
        widthValue = `${widthValue}px`
      }

      if (Number.isNaN(heightValue)) {
        heightValue = height
      } else {
        heightValue = `${heightValue}px`
      }

      return {
        width: widthValue,
        height: heightValue
      }
    },
    imageStyle() {
      const fit = this.fit

      if (this.$isServer || isSupportObjectFit) {
        return { objectFit: fit }
      }

      return this.manuallySupportObjectFit(fit)
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.loadImage()
    })
  },
  methods: {
    loadImage() {
      if (this.$isServer) {
        return
      }

      this.loading = true
      this.error = false

      const image = new Image()

      image.addEventListener('load', this.handleLoad)
      image.addEventListener('error', this.handleError)
      image.addEventListener('abort', this.handleAbort)

      Object.keys(this.$attrs).forEach(key => {
        image.setAttribute(key, this.$attrs[key])
      })

      image.src = this.src
      this.image = image
    },
    handleLoad() {
      this.imageWidth = this.image.width
      this.imageHeight = this.image.height
      this.loading = false
      this.$emit('on-load')
    },
    handleError() {
      this.loading = false
      this.error = true
      this.$emit('on-error')
    },
    handleAbort() {
      this.loading = false
      this.error = true
      this.$emit('on-abort')
    },
    manuallySupportObjectFit(type) {
      // TODO: 添加 object fit 兼容
      return {
        objectFit: type
      }
    }
  }
}
</script>
