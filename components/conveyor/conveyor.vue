<template>
  <div :class="prefix">
    <Button style="margin-bottom: 20px;" @on-click="add">
      Add
    </Button>
    <Button style="margin-bottom: 20px;" @on-click="remove">
      Remove
    </Button>
    <transition-group
      ref="list"
      tag="ul"
      :name="transitionName"
      :class="`${prefix}__list`"
      @before-leave="setItemTransform"
    >
      <li
        v-for="item in items"
        :key="item"
        :class="`${prefix}__item`"
      >
        {{ item }}
      </li>
    </transition-group>
  </div>
</template>

<script>
import Button from '../button'

const { prefix } = require('@/style/basis/variable')

export default {
  name: 'Conveyor',
  components: {
    Button
  },
  props: {},
  data() {
    return {
      prefix: `${prefix}-conveyor`,
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      nextItem: 10,
      transitionName: `${prefix}-fade`
    }
  },
  computed: {},
  methods: {
    randomIndex: function () {
      return Math.floor(Math.random() * this.items.length)
    },
    add: function () {
      this.items.splice(this.randomIndex(), 0, this.nextItem++)
    },
    remove: function () {
      this.items.splice(this.randomIndex(), 1)
    },
    setItemTransform(el) {
      const listTop = this.$refs.list.$el.getBoundingClientRect().top
      const itemTop = el.getBoundingClientRect().top

      this.$nextTick(() => {
        el.style.transform = `translateY(${itemTop - listTop}px)`
      })
    }
  }
}
</script>
