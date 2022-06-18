<template>
  <Row style="width: 840px;">
    <Column :span="20" style="padding-right: 10px;">
      <transition name="vxp-fade" mode="out-in">
        <img :key="active" style="width: 100%; height: 400px;" :src="images[active]" />
      </transition>
    </Column>
    <Column :span="4">
      <Carousel
        v-model:active="active"
        loop
        vertical
        :view-size="4"
        :autoplay="5000"
        :height="400"
      >
        <CarouselItem v-for="(img, index) in images" :key="index">
          <img :src="img" style="width: 120px; height: 100%;" />
        </CarouselItem>
      </Carousel>
    </Column>
  </Row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import img1 from '@docs/assets/carousel/1.jpg'
import img2 from '@docs/assets/carousel/2.jpg'
import img3 from '@docs/assets/carousel/3.jpg'
import img4 from '@docs/assets/carousel/4.jpg'
import img5 from '@docs/assets/carousel/5.jpg'

export default defineComponent({
  setup() {
    const active = ref(0)

    return {
      active,
      images: [img1, img2, img3, img4, img5]
    }
  }
})
</script>

<style scoped>
.demo-pane {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 240px;
  font-size: 30px;
  color: #fff;
  background-color: var(--vxp-color-primary-base);
  transition: transform 250ms;
}

.demo-pane--vertical {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 100%;
  font-size: 30px;
  color: #fff;
  background-color: var(--vxp-color-primary-base);
}
</style>
