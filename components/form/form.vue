<template>
  <form :class="className">
    <slot></slot>
  </form>
</template>

<script>
import { config, useConfigurableProps } from '../../src/config/properties'

const prefix = config.defaults.prefixCls

const props = useConfigurableProps({
  model: {
    type: Object,
    default() {
      return {}
    }
  },
  rules: {
    type: Object,
    default() {
      return {}
    }
  },
  labelWidth: {
    type: Number,
    default: 80
  },
  labelPosition: {
    default: 'right',
    validator(value) {
      return ['right', 'left', 'top'].includes(value)
    }
  },
  allRequired: {
    type: Boolean,
    default: false
  },
  labelSuffix: {
    type: String,
    default: ''
  },
  hideAsterisk: {
    type: Boolean,
    default: false
  },
  validateAll: {
    type: Boolean,
    default: false
  }
})

export default {
  name: 'Form',
  provide() {
    return { form: this }
  },
  props,
  data() {
    return {
      prefix: `${prefix}-form`,
      items: []
    }
  },
  computed: {
    className() {
      const { prefix, labelPosition } = this

      return [prefix, `${prefix}--label-${labelPosition}`]
    }
  },
  methods: {
    validate(callback) {
      return this.validateItems(this.items, callback)
    },
    validateFields(props, callback) {
      if (!Array.isArray(props)) {
        props = [props]
      }

      const propMaps = this.getPropMaps()
      const items = []

      props.forEach(prop => {
        if (propMaps[prop]) {
          items.push(propMaps[prop])
        }
      })

      return this.validateItems(items, callback)
    },
    validateItems(items, callback) {
      const validations = []

      items.forEach(item => {
        validations.push(item.validate())
      })

      return new Promise(resolve => {
        Promise.all(validations).then(errors => {
          errors = errors.flat()
          errors = errors.filter(item => item)

          resolve(errors)

          if (typeof callback === 'function') {
            callback(errors)
          }
        })
      })
    },
    reset() {
      this.items.forEach(item => {
        item.reset()
      })
    },
    resetFields(props) {
      if (!Array.isArray(props)) {
        props = [props]
      }

      const propMaps = this.getPropMaps()

      props.forEach(prop => {
        if (propMaps[prop]) {
          propMaps[prop].reset()
        }
      })
    },
    clearError() {
      this.items.forEach(item => {
        item.clearError()
      })
    },
    clearFieldsError(props) {
      if (!Array.isArray(props)) {
        props = [props]
      }

      const propMaps = this.getPropMaps()

      props.forEach(prop => {
        if (propMaps[prop]) {
          propMaps[prop].clearError()
        }
      })
    },
    getPropMaps() {
      const items = this.items
      const propMaps = {}

      for (const item of items) {
        if (item.prop) {
          propMaps[item.prop] = item
        }
      }

      return propMaps
    }
  }
}
</script>
