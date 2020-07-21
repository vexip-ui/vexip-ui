export default {
  mounted() {
    this.$nextTick(() => {
      const hiddenParentNode = this.queryOutsideHiddenElement()

      if (hiddenParentNode) {
        this.mutationObserver = new MutationObserver(() => {
          if (hiddenParentNode.style.display !== 'none') {
            if (typeof this.displayInit === 'function') {
              this.displayInit()
              this.$nextTick(() => {
                this.$emit('on-mount')
              })
            }

            this.mutationObserver.disconnect()
          }
        })

        this.mutationObserver.observe(hiddenParentNode, {
          attributes: true,
          childList: true,
          characterData: true,
          attributeFilter: ['style']
        })
      } else {
        if (typeof this.displayInit === 'function') {
          this.displayInit()
          this.$nextTick(() => {
            this.$emit('on-mount')
          })
        }
      }
    })
  },
  beforeDestroy() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect()
    }
  },
  methods: {
    queryOutsideHiddenElement() {
      let parentNode = this.$el.parentNode

      while (parentNode && parentNode !== document.body) {
        if (parentNode.style.display === 'none') {
          return parentNode
        }

        parentNode = parentNode.parentNode
      }

      return null
    }
  }
}
