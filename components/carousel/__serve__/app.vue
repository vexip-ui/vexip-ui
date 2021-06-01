<template>
  <div style="width: 500px;">
    <Carousel
      loop
      arrow="inside"
      pointer="inside"
      :view-size="1"
    >
      <CarouselItem>
        <div class="demo-pane">
          内容一
        </div>
      </CarouselItem>
      <CarouselItem>
        <div class="demo-pane">
          内容二
        </div>
      </CarouselItem>
      <CarouselItem>
        <div class="demo-pane">
          内容三
        </div>
      </CarouselItem>
      <CarouselItem>
        <div class="demo-pane">
          内容四
        </div>
      </CarouselItem>
      <CarouselItem>
        <div class="demo-pane">
          内容五
        </div>
      </CarouselItem>
    </Carousel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Carousel from '../carousel.vue'
import CarouselItem from '../carousel-item.vue'

export default defineComponent({
  name: 'App',
  components: {
    Carousel,
    CarouselItem
  },
  data() {
    return {
      active: '标签页1'
    }
  }
})
</script>

<style lang="scss">
.demo-pane {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 240px;
  font-size: 30px;
  color: #fff;
  background-color: #4dabf7;
}
</style>
