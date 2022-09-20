<template>
  <Alert type="warning" :icon="Bullhorn">
    <Carousel
      class="alert-carousel"
      vertical
      :view-size="1"
      loop
      autoplay
      arrow="none"
      ignore-hover
      :height="30"
    >
      <CarouselItem> 警告提示的内容 1 </CarouselItem>
      <CarouselItem> 警告提示的内容 2 </CarouselItem>
      <CarouselItem> 警告提示的内容 3 </CarouselItem>
    </Carousel>
  </Alert>
</template>

<script setup lang="ts">
import { Bullhorn } from '@vexip-ui/icons'
</script>

<style scoped>
.alert-carousel:deep(.vxp-carousel__item) {
  display: flex;
  align-items: center;
  padding: 0 0 1px;
}
</style>
