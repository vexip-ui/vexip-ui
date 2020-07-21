export default {
  inject: {
    form: { default: null },
    formItem: { default: null }
  },
  props: {
    disableValidate: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    formControlProp() {
      const model = this.$options.model

      return (model && model.prop) || 'value'
    }
  },
  watch: {
    disableValidate: {
      handler(value) {
        if (this.$parent.isFormControl) {
          return
        }

        if (!value) {
          const prop = this.formControlProp

          let timer = null

          this.cancelPropWatch = this.$watch(prop, value => {
            if (this.groupInstance && this.groupInstance.isFormControl) {
              return
            }

            clearTimeout(timer)

            timer = setTimeout(() => {
              if (this.form) {
                this.form.$emit('on-control-change', value)
              }

              if (this.formItem) {
                this.formItem.$emit('on-control-change', value)
              }
            }, 0)
          })

          this.$on('on-blur', this.handleFormControlBlur)
          this.$on('on-clear', this.handleFormControlClear)
        } else {
          if (typeof this.cancelPropWatch === 'function') {
            this.cancelPropWatch()
          }

          this.$off('on-blur', this.handleFormControlBlur)
          this.$off('on-clear', this.handleFormControlClear)
        }
      },
      immediate: true
    }
  },
  beforeCreate() {
    this.isFormControl = true
  },
  methods: {
    handleFormControlBlur() {
      setTimeout(() => {
        const prop = this.formControlProp

        if (this.form) {
          this.form.$emit('on-control-blur', this[prop])
        }

        if (this.formItem) {
          this.formItem.$emit('on-control-blur', this[prop])
        }
      }, 0)
    },
    handleFormControlClear() {
      setTimeout(() => {
        const prop = this.formControlProp

        if (this.form) {
          this.form.$emit('on-control-clear', this[prop])
        }

        if (this.formItem) {
          this.formItem.$emit('on-control-clear', this[prop])
        }
      }, 0)
    }
  }
}
